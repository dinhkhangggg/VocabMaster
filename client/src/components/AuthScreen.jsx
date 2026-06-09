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
      <h1 className="auth-title">
        <span className="brand-vocab">Vocab</span>
        <span className="brand-master">Master</span>
      </h1>
      <p>Điền tên để bắt đầu</p>
      
      <div className="input-group">
        <input 
          type="text" 
          placeholder="Username..." 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleStart()}
        />
        <button className="primary-btn" onClick={handleStart}>Bắt đầu</button>
      </div>
    </div>
  );
}
