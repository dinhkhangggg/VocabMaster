import { globalDictionary } from './Trie.js';

export class BotAI {
  /**
   * AI Bot chọn từ dựa trên chữ cái cuối của người chơi.
   * @param {string} lastChar - Chữ cái bắt buộc phải bắt đầu.
   * @param {Array<string>} usedWords - Mảng HashSet chống lặp từ.
   * @param {string} difficulty - 'easy' hoặc 'hard'.
   */
  static chooseWord(lastChar, usedWords, difficulty = 'easy') {
    // 1. Dùng DFS quét nhánh cây Trie, lấy 5000 từ để mở rộng tối đa không gian chọn
    const possibleWords = globalDictionary.findWordsStartingWith(lastChar, 5000, 12);
    
    // 2. Lọc bỏ các từ đã bị sử dụng (HashSet Check)
    const usedSet = new Set(usedWords);
    const validWords = possibleWords.filter(item => !usedSet.has(item.word.toLowerCase()));

    // Nếu không còn từ hợp lệ nào (Bot bị bí hoặc hết từ mới)
    if (validWords.length === 0) {
      return null; // Bó tay chịu trói, không lặp lại từ cũ để tránh ăn gian!
    }

    // Hàm trộn mảng chuẩn xác (Fisher-Yates Shuffle)
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    // 3. Chiến thuật Trọng số (Heuristic)
    if (difficulty === 'hard') {
      // Trộn ngẫu nhiên trước để đảm bảo tính bất ngờ hoàn toàn
      validWords = shuffleArray(validWords);

      // Sau đó đẩy các từ khó (kết thúc bằng x, y, z) lên đầu
      validWords.sort((a, b) => {
        const charA = a.word.slice(-1);
        const charB = b.word.slice(-1);
        const rareChars = ['x', 'y', 'z', 'q', 'k', 'v', 'w'];
        const scoreA = rareChars.includes(charA) ? 100 : 0;
        const scoreB = rareChars.includes(charB) ? 100 : 0;
        return scoreB - scoreA; 
      });
    } else {
      // Bot Dễ: Trộn ngẫu nhiên hoàn toàn
      validWords = shuffleArray(validWords);
    }

    // Trả về từ ưu tiên cao nhất
    return validWords[0];
  }
}
