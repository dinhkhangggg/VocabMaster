import React, { useState, useEffect, useRef } from 'react';
import './GameScreen.css';
import { SoundManager } from '../utils/SoundManager';

export default function GameScreen({ playerName, vCoins, settings, inventory, onUpdateInventory, onAddCoins, onAddFlashcard, onGoLobby, onOpenStore }) {
  const [currentWord, setCurrentWord] = useState('');
  const [botWord, setBotWord] = useState('');
  const [botDef, setBotDef] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(settings.timeLimit);
  const [errorMsg, setErrorMsg] = useState('');
  const [isError, setIsError] = useState(false);
  const [history, setHistory] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [secretWord, setSecretWord] = useState('');
  const [wrongCount, setWrongCount] = useState(0);
  
  const timerRef = useRef(null);

  useEffect(() => {
    if (settings.mode !== 'chain' && !botWord) {
      fetchMiniGameWord();
    }
  }, []);

  useEffect(() => {
    // Chỉ bắt đầu đếm giờ nếu Bot đã phản đòn, HOẶC người chơi đã bắt đầu gõ từ đầu tiên
    if (botWord || hasStarted) {
      startTimer();
    }
    return () => clearInterval(timerRef.current);
  }, [botWord, hasStarted]);

  const fetchMiniGameWord = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/game/minigame?mode=${settings.mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usedWords: history })
      });
      const data = await res.json();
      if (res.ok) {
        setSecretWord(data.word);
        setBotWord(settings.mode === 'scramble' ? data.scrambled : data.blanked);
        setBotDef(data.definition);
        setCurrentWord('');
        setWrongCount(0);
        setHasStarted(true);
        startTimer();
      } else {
        showError(data.error);
      }
    } catch(e) {
      showError("Lỗi kết nối API");
    }
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    setTimeLeft(settings.timeLimit);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const [isGameOver, setIsGameOver] = useState(false);
  const [gameOverMsg, setGameOverMsg] = useState('');

  const handleGameOver = () => {
    SoundManager.gameOver();
    clearInterval(timerRef.current);
    const earned = Math.floor(score / 2);
    let msg = `Hết giờ! Bạn đạt được ${score} điểm. 💰 Nhận ${earned} V-Coins!`;
    if (settings.mode !== 'chain' && secretWord) {
      msg += ` 💡 Đáp án: ${secretWord.toUpperCase()}`;
    }
    setGameOverMsg(msg);
    onAddCoins(earned);
    setIsGameOver(true);
  };

  const handleSurrender = () => {
    SoundManager.gameOver();
    clearInterval(timerRef.current);
    const earned = Math.floor(score / 4);
    let msg = `Bỏ cuộc! Bạn đạt được ${score} điểm. 💰 Nhận ${earned} V-Coins!`;
    if (settings.mode !== 'chain' && secretWord) {
      msg += ` 💡 Đáp án: ${secretWord.toUpperCase()}`;
    }
    setGameOverMsg(msg);
    onAddCoins(earned);
    setIsGameOver(true);
  };

  const resetGame = () => {
    setScore(0);
    setHistory([]);
    setCurrentWord('');
    setWrongCount(0);
    clearInterval(timerRef.current);
    setIsGameOver(false);

    if (settings.mode !== 'chain') {
      fetchMiniGameWord();
    } else {
      setBotWord('');
      setBotDef('');
      setHasStarted(false);
      setTimeLeft(settings.timeLimit);
    }
  };

  const handleUseHint = async () => {
    if (inventory.hint <= 0) return;

    if (settings.mode !== 'chain') {
      if (!secretWord) return;
      setCurrentWord(secretWord.toUpperCase());
      onUpdateInventory({ ...inventory, hint: inventory.hint - 1 });
      return;
    }

    if (!botWord) return;
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/game/hint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lastChar: botWord.slice(-1),
          usedWords: history
        })
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentWord(data.hint.toUpperCase());
        onUpdateInventory({ ...inventory, hint: inventory.hint - 1 });
      } else {
        showError(data.error || 'Lỗi lấy gợi ý');
      }
    } catch (e) {
      showError("Lỗi kết nối Server. Vui lòng tắt và bật lại Backend!");
    }
  };

  const handleUseRevive = () => {
    if (inventory.revive <= 0) return;
    onUpdateInventory({ ...inventory, revive: inventory.revive - 1 });
    setIsGameOver(false);
    setTimeLeft(15);
    setWrongCount(0);
    startTimer();
  };

  const handleSubmit = async () => {
    if (!currentWord.trim()) return;

    // Lô-gic xử lý cho chế độ Minigame
    if (settings.mode !== 'chain') {
      if (currentWord.trim().toLowerCase() === secretWord.toLowerCase()) {
        SoundManager.success();
        setScore(prev => prev + (settings.timeLimit - timeLeft + 10) * 5); // Tính điểm nhanh chậm
        setHistory(prev => [...prev, secretWord]);
        onAddFlashcard(secretWord, botDef);
        setErrorMsg(''); // Xóa dòng chữ đỏ báo lỗi
        fetchMiniGameWord();
      } else {
        const newWrong = wrongCount + 1;
        setWrongCount(newWrong);
        if (newWrong >= settings.maxAttempts) {
          SoundManager.gameOver();
          clearInterval(timerRef.current);
          const earned = Math.floor(score / 2);
          setGameOverMsg(`Sai quá ${settings.maxAttempts} lần! 😢 Đáp án đúng là: ${secretWord.toUpperCase()}. 💰 Bạn nhận ${earned} V-Coins.`);
          onAddCoins(earned);
          setIsGameOver(true);
        } else {
          SoundManager.error();
          showError(`Sai rồi! Bạn còn ${settings.maxAttempts === Infinity ? 'Vô hạn' : settings.maxAttempts - newWrong} lượt.`);
        }
      }
      return;
    }

    try {
      // Gọi API Backend (Giả lập fetch tới /api/game/play) cho nối từ
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/game/play`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: currentWord,
          usedWords: history,
          botLastChar: botWord ? botWord.slice(-1) : '',
          timeTaken: settings.timeLimit - timeLeft,
          difficulty: settings.difficulty
        })
      });

      const data = await response.json();

      if (!response.ok) {
        const newWrong = wrongCount + 1;
        setWrongCount(newWrong);
        if (newWrong >= settings.maxAttempts) {
          SoundManager.gameOver();
          clearInterval(timerRef.current);
          const earned = Math.floor(score / 2);
          setGameOverMsg(`Sai quá số lần! Lỗi: ${data.error}. 💰 Bạn nhận ${earned} V-Coins.`);
          onAddCoins(earned);
          setIsGameOver(true);
        } else {
          SoundManager.error();
          showError(`${data.error} Bạn còn ${settings.maxAttempts === Infinity ? 'Vô hạn' : settings.maxAttempts - newWrong} lượt.`);
        }
        return;
      }

      // Xử lý Hợp lệ
      SoundManager.success();
      setWrongCount(0); // Reset số lần sai khi trả lời đúng
      setScore(prev => prev + data.score);
      setHistory(data.updatedUsedWords);
      
      if (data.botWord) {
        setBotWord(data.botWord);
        setBotDef(data.botDefinition);
        onAddFlashcard(data.botWord, data.botDefinition);
        setCurrentWord('');
        setErrorMsg('');
      } else {
        SoundManager.win();
        clearInterval(timerRef.current);
        const earned = score + 500;
        setGameOverMsg(`🎉 CHIẾN THẮNG! Bot đã bí từ. 💰 Thưởng nóng 500 V-Coins & ${score} Điểm!`);
        onAddCoins(earned);
        setIsGameOver(true);
      }

    } catch (err) {
      showError('Lỗi kết nối Server. Vui lòng bật Backend Node.js.');
    }
  };

  const showError = (msg) => {
    setErrorMsg(msg);
    setIsError(true);
    setTimeout(() => setIsError(false), 500); // Tắt hiệu ứng đỏ
  };

  return (
    <div className="game-wrapper">
      <div className="game-container glass-panel">
        <div className="game-main">
          <div className="game-header">
        <div className="player-info">
          <span className={inventory.vip ? 'vip-avatar' : ''}>👤</span> {playerName} | Điểm: <span>{score}</span> | 💰 {vCoins}
        </div>
        <div className={`timer ${timeLeft <= 5 ? 'danger' : ''}`}>⏳ {timeLeft}s</div>
        <div className="header-actions">
          <button className="nav-btn" onClick={() => { SoundManager.typeKey(); onGoLobby(); }}>⬅ Sảnh Chờ</button>
          <button className="surrender-btn" onClick={handleSurrender}>Bỏ cuộc</button>
        </div>
      </div>

      <div className="battle-arena">
        <div className="bot-box">
          <div className="bot-avatar">🤖 AI Boss</div>
          {botWord ? (
            <>
              <div className="bot-word">{botWord.toUpperCase()}</div>
              <div className="bot-def">
                {typeof botDef === 'string' ? botDef : (
                  <>
                    <div style={{ color: 'var(--muted-text)', fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '8px' }}>{botDef.ipa}</div>
                    <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{botDef.en}</div>
                    <div style={{ color: 'var(--accent-color)' }}>{botDef.vi}</div>
                  </>
                )}
              </div>
              <div className="rule-hint">
                {settings.mode === 'chain' 
                  ? <span>Bạn phải tìm từ bắt đầu bằng chữ: <strong>{botWord.slice(-1).toUpperCase()}</strong></span>
                  : settings.mode === 'scramble'
                  ? <span>Sắp xếp lại các chữ cái trên để tạo thành từ có nghĩa!</span>
                  : <span>Điền các chữ cái bị giấu '_' để hoàn thành từ!</span>
                }
              </div>
            </>
          ) : (
            <div className="rule-hint" style={{ fontSize: '1.3rem', marginTop: '30px', color: 'var(--primary-color)' }}>
              Hãy nhập một từ tiếng Anh bất kỳ để khai chiến! 🚀
            </div>
          )}
        </div>
      </div>

      <div className="input-arena">
        <input 
          type="text" 
          className={`word-input ${isError ? 'input-error' : ''}`}
          placeholder={
            settings.mode === 'chain'
              ? (botWord ? `Nhập từ bắt đầu bằng '${botWord.slice(-1).toUpperCase()}'...` : 'Nhập từ tiếng Anh đầu tiên...')
              : 'Nhập đáp án của bạn...'
          }
          value={currentWord}
          onChange={(e) => {
            if (!hasStarted && !botWord) setHasStarted(true);
            setCurrentWord(e.target.value);
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          autoFocus
        />
        <button className="primary-btn" onClick={handleSubmit}>Bắn 🚀</button>
      </div>

      <div className="items-toolbar" style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
        <button 
          className="choice-btn" 
          onClick={handleUseHint}
          disabled={inventory.hint <= 0 || !botWord}
          style={{ width: 'auto', padding: '8px 20px', fontSize: '0.95rem' }}
        >
          🔍 Dùng Gợi Ý ({inventory.hint})
        </button>
      </div>
      
        {errorMsg && <div className="error-text">{errorMsg}</div>}
        </div>

        {/* CỘT PHẢI: LỊCH SỬ TRẬN ĐẤU (DESKTOP) */}
        <div className="game-sidebar">
          <h3>📜 Nhật ký Trận đấu</h3>
          <div className="history-list">
            {history.length === 0 ? (
              <p className="empty-history">
                {settings.mode === 'chain' ? 'Chưa có từ nào được nối. Hãy gõ từ đầu tiên!' : 'Chưa giải được từ nào. Hãy nhập đáp án!'}
              </p>
            ) : (
              history.map((word, index) => (
                settings.mode === 'chain' ? (
                  <div key={index} className={`history-item ${index % 2 === 0 ? 'player' : 'bot'}`}>
                    <span className="history-actor">{index % 2 === 0 ? '👤 Bạn' : '🤖 AI Boss'}</span>
                    <span className="history-word">{word.toUpperCase()}</span>
                  </div>
                ) : (
                  <div key={index} className="history-item player" style={{ justifyContent: 'center' }}>
                    <span className="history-word" style={{ color: 'var(--accent-color)' }}>✅ {word.toUpperCase()}</span>
                  </div>
                )
              ))
            )}
          </div>
        </div>
      </div>

      {/* CUSTOM OVERLAY MODAL CHỐNG PHÈN */}
      {isGameOver && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel bounce-in">
            <h2>KẾT THÚC TRẬN ĐẤU</h2>
            <p>{gameOverMsg}</p>
            <div className="modal-actions" style={{ flexDirection: 'column', gap: '10px' }}>
              {inventory.revive > 0 && (
                <button className="primary-btn" onClick={handleUseRevive} style={{ background: '#e11d48' }}>
                  ❤️ Dùng Hồi Sinh ({inventory.revive})
                </button>
              )}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="primary-btn" onClick={resetGame}>🔄 Chơi Ván Mới</button>
                <button className="nav-btn" onClick={onOpenStore}>🛒 Cửa Hàng</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
