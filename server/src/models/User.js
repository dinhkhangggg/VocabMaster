import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  vCoins: { type: Number, default: 0 },
  highscore: { type: Number, default: 0 },
  flashcards: [{
    word: String,
    meaning: String,
    addedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
