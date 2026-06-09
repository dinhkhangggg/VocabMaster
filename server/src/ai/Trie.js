import fs from 'fs';

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.definition = '';
  }
}

export class TrieTree {
  constructor() {
    this.root = new TrieNode();
    this.wordCount = 0;
    this.wordList = [];
  }

  insert(word, definition) {
    let current = this.root;
    for (let char of word.toLowerCase()) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char);
    }
    if (!current.isEndOfWord) {
      this.wordCount++;
      this.wordList.push({ word, definition });
    }
    current.isEndOfWord = true;
    current.definition = definition;
  }

  getRandomWord(usedWords = []) {
    if (this.wordList.length === 0) return null;
    
    if (usedWords.length === 0) {
      const randomIndex = Math.floor(Math.random() * this.wordList.length);
      return this.wordList[randomIndex];
    }

    const usedSet = new Set(usedWords.map(w => w.toLowerCase()));
    const validWords = this.wordList.filter(item => !usedSet.has(item.word.toLowerCase()));
    
    if (validWords.length === 0) {
      // Hết từ mới -> Lấy đại 1 từ cũ
      const randomIndex = Math.floor(Math.random() * this.wordList.length);
      return this.wordList[randomIndex];
    }
    
    const randomIndex = Math.floor(Math.random() * validWords.length);
    return validWords[randomIndex];
  }

  isValidWord(word) {
    let current = this.root;
    for (let char of word.toLowerCase()) {
      if (!current.children.has(char)) return false;
      current = current.children.get(char);
    }
    return current.isEndOfWord;
  }

  getDefinition(word) {
    let current = this.root;
    for (let char of word.toLowerCase()) {
      if (!current.children.has(char)) return null;
      current = current.children.get(char);
    }
    return current.isEndOfWord ? current.definition : null;
  }

  // Thuật toán DFS gom tối đa 50 từ hợp lệ bắt đầu bằng 'prefix'
  findWordsStartingWith(prefix, maxWords = 50, maxLength = 12) {
    let current = this.root;
    let results = [];
    
    for (let char of prefix.toLowerCase()) {
      if (!current.children.has(char)) return results;
      current = current.children.get(char);
    }

    const dfs = (node, currentWord) => {
      if (results.length >= maxWords) return;
      if (currentWord.length > maxLength) return; // Bảo vệ giao diện UI
      
      if (node.isEndOfWord) {
        results.push({ word: currentWord, definition: node.definition });
      }

      for (let [char, childNode] of node.children.entries()) {
        dfs(childNode, currentWord + char);
      }
    };

    dfs(current, prefix.toLowerCase());
    return results;
  }

  loadFromFile(filePath) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const dict = JSON.parse(data);
      for (const [word, def] of Object.entries(dict)) {
        this.insert(word, def);
      }
      console.log(`Đã nạp thành công ${this.wordCount} từ vào Cây Trie.`);
    } catch (err) {
      console.error('Lỗi khi nạp từ điển:', err);
    }
  }
}

// Khởi tạo Trie toàn cục (Singleton)
export const globalDictionary = new TrieTree();
