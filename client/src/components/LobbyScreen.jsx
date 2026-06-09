import React from 'react';
import './LobbyScreen.css';
import { SoundManager } from '../utils/SoundManager';

export default function LobbyScreen({ settings, onSettingsChange, onStart, onOpenStore, onOpenFlashcard }) {
  
  const handleStart = () => {
    SoundManager.success();
    onStart();
  };

  return (
    <div className="lobby-container glass-panel">
      <h1>SẢNH CHỜ 🎮</h1>
      <p className="lobby-desc">Tuỳ chỉnh chiến thuật trước khi đối đầu với AI Boss.</p>

      <div className="settings-box">
        <div className="setting-group mode-group">
          <h3>🎮 Chế Độ Chơi</h3>
          <div className="btn-group">
            <button 
              className={`choice-btn ${settings.mode === 'chain' ? 'active' : ''}`}
              onClick={() => { SoundManager.typeKey(); onSettingsChange({ ...settings, mode: 'chain' }); }}
            >
              🔗 Nối Từ
            </button>
            <button 
              className={`choice-btn ${settings.mode === 'scramble' ? 'active' : ''}`}
              onClick={() => { SoundManager.typeKey(); onSettingsChange({ ...settings, mode: 'scramble' }); }}
            >
              🧩 Sắp Xếp Chữ
            </button>
            <button 
              className={`choice-btn ${settings.mode === 'fillblank' ? 'active' : ''}`}
              onClick={() => { SoundManager.typeKey(); onSettingsChange({ ...settings, mode: 'fillblank' }); }}
            >
              🕵️ Điền Chữ
            </button>
          </div>
        </div>

        <div className="settings-grid">
          <div className="setting-group">
            <h3>🧠 Độ Khó</h3>
            <div className="btn-group">
              <button 
                className={`choice-btn ${settings.difficulty === 'easy' ? 'active' : ''}`}
                onClick={() => { SoundManager.typeKey(); onSettingsChange({ ...settings, difficulty: 'easy' }); }}
              >
                🟢 Dễ
              </button>
              <button 
                className={`choice-btn ${settings.difficulty === 'hard' ? 'active' : ''}`}
                onClick={() => { SoundManager.typeKey(); onSettingsChange({ ...settings, difficulty: 'hard' }); }}
              >
                🔥 Khó
              </button>
            </div>
          </div>

          <div className="setting-group">
            <h3>⏳ Thời gian</h3>
            <div className="btn-group">
              <button 
                className={`choice-btn ${settings.timeLimit === 15 ? 'active' : ''}`}
                onClick={() => { SoundManager.typeKey(); onSettingsChange({ ...settings, timeLimit: 15 }); }}
              >
                15s
              </button>
              <button 
                className={`choice-btn ${settings.timeLimit === 10 ? 'active' : ''}`}
                onClick={() => { SoundManager.typeKey(); onSettingsChange({ ...settings, timeLimit: 10 }); }}
              >
                10s
              </button>
              <button 
                className={`choice-btn ${settings.timeLimit === 5 ? 'active' : ''}`}
                onClick={() => { SoundManager.typeKey(); onSettingsChange({ ...settings, timeLimit: 5 }); }}
              >
                5s
              </button>
            </div>
          </div>

          <div className="setting-group">
            <h3>❤️ Sai lầm</h3>
            <div className="btn-group">
              <button 
                className={`choice-btn ${settings.maxAttempts === 1 ? 'active' : ''}`}
                onClick={() => { SoundManager.typeKey(); onSettingsChange({ ...settings, maxAttempts: 1 }); }}
              >
                1 Lần
              </button>
              <button 
                className={`choice-btn ${settings.maxAttempts === 3 ? 'active' : ''}`}
                onClick={() => { SoundManager.typeKey(); onSettingsChange({ ...settings, maxAttempts: 3 }); }}
              >
                3 Lần
              </button>
              <button 
                className={`choice-btn ${settings.maxAttempts === 5 ? 'active' : ''}`}
                onClick={() => { SoundManager.typeKey(); onSettingsChange({ ...settings, maxAttempts: 5 }); }}
              >
                5 Lần
              </button>
              <button 
                className={`choice-btn ${settings.maxAttempts === Infinity ? 'active' : ''}`}
                onClick={() => { SoundManager.typeKey(); onSettingsChange({ ...settings, maxAttempts: Infinity }); }}
              >
                Vô hạn
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="lobby-actions">
        <button className="nav-btn" onClick={() => { SoundManager.typeKey(); onOpenStore(); }}>🛒 Cửa Hàng</button>
        <button className="primary-btn pulse-btn" onClick={handleStart}>VÀO TRẬN BẤT CHẤP 🚀</button>
        <button className="nav-btn" onClick={() => { SoundManager.typeKey(); onOpenFlashcard(); }}>📚 Flashcard</button>
      </div>
    </div>
  );
}
