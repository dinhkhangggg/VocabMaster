import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { globalDictionary } from './ai/Trie.js';
import { playTurn, getMiniGameWord, getHint } from './controllers/gameController.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Nạp từ điển vào RAM khi khởi động Server
const dictPath = path.join(__dirname, 'data', 'dictionary.json');
globalDictionary.loadFromFile(dictPath);

// Routes
app.post('/api/game/play', playTurn);
app.post('/api/game/minigame', getMiniGameWord);
app.post('/api/game/hint', getHint);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', wordCount: globalDictionary.wordCount });
});

// Kết nối MongoDB (Thử nghiệm)
// import mongoose from 'mongoose';
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/vocabmaster').then(() => console.log('DB Connected'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
