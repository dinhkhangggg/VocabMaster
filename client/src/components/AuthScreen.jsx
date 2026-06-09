import React, { useState } from 'react';
import './AuthScreen.css';

export default function AuthScreen({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleStart = () => {
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="auth-container glass-panel">
      <h1>VocabMaster 🌍</h1>
      <p>Nhập tên của bạn để bắt đầu đấu trí với AI</p>
      
      <div className="input-group">
        <input 
          type="text" 
          placeholder="Tên hiển thị..." 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleStart()}
        />
        <button className="primary-btn" onClick={handleStart}>Bắt đầu ngay</button>
      </div>
    </div>
  );
}
