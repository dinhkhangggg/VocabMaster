import { globalDictionary } from '../ai/Trie.js';
import { BotAI } from '../ai/BotAI.js';
import https from 'https';

// Hàm gọi API Từ điển Quốc tế để kiểm tra từ vựng (Fallback)
const checkWordExternally = (word) => {
  return new Promise((resolve) => {
    https.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, (res) => {
      if (res.statusCode === 200) {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            const def = parsed[0]?.meanings[0]?.definitions[0]?.definition || "Từ tiếng Anh hợp lệ.";
            resolve(def);
          } catch(e) { resolve(null); }
        });
      } else {
        resolve(null);
      }
    }).on('error', () => resolve(null));
  });
};

export const playTurn = async (req, res) => {
  try {
    const { word, usedWords, botLastChar, timeTaken, difficulty = 'easy' } = req.body;

  if (!word) {
    return res.status(400).json({ error: 'Vui lòng nhập từ.' });
  }

  const cleanWord = word.trim().toLowerCase();

  // 1. Kiểm duyệt cơ bản (Chặn số và khoảng trắng thừa)
  if (!/^[a-z]+$/.test(cleanWord)) {
    return res.status(400).json({ error: 'Chỉ được nhập chữ cái tiếng Anh hợp lệ.' });
  }

  // 2. Kiểm tra luật Nối chữ
  if (botLastChar && cleanWord[0] !== botLastChar.toLowerCase()) {
    return res.status(400).json({ error: `Từ phải bắt đầu bằng chữ '${botLastChar.toUpperCase()}'.` });
  }

  // 3. Kiểm tra Từ Điển (Trie Tree)
  let definition = globalDictionary.getDefinition(cleanWord);
  
  if (!definition) {
    // Nếu từ không có trong DB nội bộ -> Gọi API kiểm tra xem có phải từ Tiếng Anh thật không
    const externalDef = await checkWordExternally(cleanWord);
    if (externalDef) {
      definition = externalDef;
      // Lưu ngay vào Cây Trie để lần sau tra siêu tốc, Bot cũng học được từ này luôn!
      globalDictionary.insert(cleanWord, definition);
    } else {
      return res.status(400).json({ error: `Từ '${cleanWord.toUpperCase()}' không có thật trong tiếng Anh!` });
    }
  }

  // 4. Kiểm tra Trùng lặp
  if (usedWords && usedWords.includes(cleanWord)) {
    return res.status(400).json({ error: 'Từ này đã được sử dụng trong ván đấu.' });
  }

  // 5. Tính điểm (Có Combo)
  let score = cleanWord.length * 10;
  let isCombo = false;
  if (timeTaken < 5.0) {
    score *= 2;
    isCombo = true;
  }

  // Cập nhật mảng từ đã dùng
  const currentUsedWords = [...(usedWords || []), cleanWord];

  // 6. Bot đánh trả dựa theo độ khó
  const playerLastChar = cleanWord.slice(-1);
  const botResponse = BotAI.chooseWord(playerLastChar, currentUsedWords, difficulty);

  if (!botResponse) {
    return res.json({
      success: true,
      score,
      isCombo,
      definition,
      botWord: null,
      message: 'Bot đã bí! Bạn là người chiến thắng!'
    });
  }

  // Trả kết quả về Client
  return res.json({
    success: true,
    score,
    isCombo,
    playerDefinition: definition,
    botWord: botResponse.word,
    botDefinition: botResponse.definition,
    updatedUsedWords: [...currentUsedWords, botResponse.word]
  });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getMiniGameWord = async (req, res) => {
  try {
    const mode = req.query.mode || req.body.mode || 'scramble';
    const usedWords = req.body.usedWords || [];

    const data = globalDictionary.getRandomWord(usedWords);
    if (!data) {
      return res.status(500).json({ error: 'Từ điển trống!' });
    }

    const { word, definition } = data;
    
    if (mode === 'scramble') {
      let scrambled = word;
      let chars = word.split('');
      let attempts = 0;
      while (scrambled === word && word.length > 1 && attempts < 10) {
        for (let i = chars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [chars[i], chars[j]] = [chars[j], chars[i]];
        }
        scrambled = chars.join('');
        attempts++;
      }
      return res.json({ word, scrambled, definition });
    } else if (mode === 'fillblank') {
      let chars = word.split('');
      let hiddenCount = Math.max(1, Math.floor(word.length / 2));
      let hiddenIndices = [];
      while (hiddenIndices.length < hiddenCount) {
        let r = Math.floor(Math.random() * word.length);
        if (!hiddenIndices.includes(r)) hiddenIndices.push(r);
      }
      let blanked = chars.map((c, i) => hiddenIndices.includes(i) ? '_' : c).join(' ');
      return res.json({ word, blanked, definition });
    }

    return res.status(400).json({ error: 'Chế độ chơi không hợp lệ' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getHint = async (req, res) => {
  try {
    const { lastChar, usedWords } = req.body;
    
    if (!lastChar) {
      return res.status(400).json({ error: 'Thiếu chữ cái bắt đầu' });
    }

    const possibleWords = globalDictionary.findWordsStartingWith(lastChar.toLowerCase(), 5000, 12);
    const usedSet = new Set((usedWords || []).map(w => w.toLowerCase()));
    const validWords = possibleWords.filter(item => !usedSet.has(item.word.toLowerCase()));

    if (validWords.length === 0) {
      return res.status(400).json({ error: 'Kho từ điển đã cạn kiệt, không tìm thấy gợi ý!' });
    }

    const hintWord = validWords[Math.floor(Math.random() * validWords.length)].word;
    return res.json({ hint: hintWord });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};
