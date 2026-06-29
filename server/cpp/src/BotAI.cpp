#include "BotAI.h"
#include <algorithm>
#include <cstdlib>
#include <set>
#include <cctype>

void BotAI::shuffleWords(std::vector<Word>& words) {
    if (words.empty()) return;
    for (int i = words.size() - 1; i > 0; --i) {
        int j = std::rand() % (i + 1);
        std::swap(words[i], words[j]);
    }
}

Word BotAI::chooseWord(char lastChar, const std::vector<std::string>& usedWords, 
                        const std::string& difficulty, const TrieTree& dictionary) {
    std::string prefix = "";
    prefix += std::tolower(lastChar);

    // Tìm tối đa 5000 từ bắt đầu bằng lastChar từ cây Trie
    std::vector<Word> possibleWords = dictionary.findWordsStartingWith(prefix, 5000, 12);

    // Lọc các từ đã bị dùng
    std::set<std::string> usedSet;
    for (const auto& w : usedWords) {
        std::string clean = w;
        std::transform(clean.begin(), clean.end(), clean.begin(), [](unsigned char c) {
            return std::tolower(c);
        });
        usedSet.insert(clean);
    }

    std::vector<Word> validWords;
    for (const auto& item : possibleWords) {
        std::string wordSpelling = item.getSpelling();
        std::transform(wordSpelling.begin(), wordSpelling.end(), wordSpelling.begin(), [](unsigned char c) {
            return std::tolower(c);
        });
        if (usedSet.find(wordSpelling) == usedSet.end()) {
            validWords.push_back(item);
        }
    }

    if (validWords.empty()) {
        return Word(); // Bot bị bí từ
    }

    // KIỂM TRA ĐỂ TRÁNH TRÙNG LẶP KÝ TỰ CUỐI 3 LẦN LIÊN TIẾP
    char consecutiveEndChar = ' ';
    char consecutiveBotEndChar = ' ';
    int N = usedWords.size();
    
    // 1. Kiểm tra 2 từ cuối cùng trong game (không phân biệt của ai)
    if (N >= 2) {
        std::string lastWord = usedWords[N - 1];
        std::string prevWord = usedWords[N - 2];
        char lastChar1 = std::tolower(lastWord.empty() ? ' ' : lastWord.back());
        char lastChar2 = std::tolower(prevWord.empty() ? ' ' : prevWord.back());
        if (lastChar1 == lastChar2 && lastChar1 != ' ') {
            consecutiveEndChar = lastChar1;
        }
    }
    
    // 2. Kiểm tra 2 từ cuối cùng của riêng Bot
    if (N >= 4) { // Đã có ít nhất 2 từ của Bot (Bot chơi ở index lẻ: N-2, N-4)
        std::string lastBotWord = usedWords[N - 2];
        std::string prevBotWord = usedWords[N - 4];
        char lastChar1 = std::tolower(lastBotWord.empty() ? ' ' : lastBotWord.back());
        char lastChar2 = std::tolower(prevBotWord.empty() ? ' ' : prevBotWord.back());
        if (lastChar1 == lastChar2 && lastChar1 != ' ') {
            consecutiveBotEndChar = lastChar1;
        }
    }

    if (consecutiveEndChar != ' ' || consecutiveBotEndChar != ' ') {
        std::vector<Word> filteredWords;
        for (const auto& w : validWords) {
            std::string spelling = w.getSpelling();
            char wordEndChar = std::tolower(spelling.empty() ? ' ' : spelling.back());
            bool matchConsecutive = (consecutiveEndChar != ' ' && wordEndChar == consecutiveEndChar);
            bool matchBotConsecutive = (consecutiveBotEndChar != ' ' && wordEndChar == consecutiveBotEndChar);
            if (!matchConsecutive && !matchBotConsecutive) {
                filteredWords.push_back(w);
            }
        }
        // Nếu sau khi lọc vẫn còn từ khác để chọn, ta dùng danh sách đã lọc
        if (!filteredWords.empty()) {
            validWords = filteredWords;
        }
    }

    // Heuristics dựa trên độ khó
    if (difficulty == "hard" || difficulty == "khó") {
        // Trộn ngẫu nhiên trước
        shuffleWords(validWords);

        // Đẩy các từ khó lên đầu theo độ hiếm phân cấp: qxzv (100) > kw (50) > y (30)
        std::sort(validWords.begin(), validWords.end(), [](const Word& a, const Word& b) {
            std::string sa = a.getSpelling();
            std::string sb = b.getSpelling();
            char charA = std::tolower(sa.empty() ? ' ' : sa.back());
            char charB = std::tolower(sb.empty() ? ' ' : sb.back());

            std::string level1 = "qxzv";
            std::string level2 = "kw";
            std::string level3 = "y";

            int scoreA = 0;
            if (level1.find(charA) != std::string::npos) scoreA = 100;
            else if (level2.find(charA) != std::string::npos) scoreA = 50;
            else if (level3.find(charA) != std::string::npos) scoreA = 30;

            int scoreB = 0;
            if (level1.find(charB) != std::string::npos) scoreB = 100;
            else if (level2.find(charB) != std::string::npos) scoreB = 50;
            else if (level3.find(charB) != std::string::npos) scoreB = 30;

            return scoreB < scoreA; // Sắp xếp giảm dần điểm số (từ khó lên trước)
        });
    } else {
        // Chế độ dễ: Trộn ngẫu nhiên hoàn toàn
        shuffleWords(validWords);
    }

    return validWords[0];
}
