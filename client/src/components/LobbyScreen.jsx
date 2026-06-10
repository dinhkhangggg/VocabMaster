import React from 'react';
import './LobbyScreen.css';
import { SoundManager } from '../utils/SoundManager';

export default function LobbyScreen({ settings, onSettingsChange, onStart, onOpenStore, onOpenFlashcard }) {
  
  const handleStart = () => {
    SoundManager.success();
    onStart();
  };

  const handleModeChange = (mode) => {
    SoundManager.typeKey();
    onSettingsChange({ ...settings, mode });
  };

  const handleDifficultyChange = (difficulty) => {
    SoundManager.typeKey();
    onSettingsChange({ ...settings, difficulty });
  };

  const handleTimeSliderChange = (e) => {
    const timeLimit = parseInt(e.target.value, 10);
    SoundManager.typeKey();
    onSettingsChange({ ...settings, timeLimit });
  };

  const hpValues = [1, 3, 5, Infinity];
  const currentHpIndex = hpValues.indexOf(settings.maxAttempts) !== -1 ? hpValues.indexOf(settings.maxAttempts) : 1;

  // Xử lý thay đổi thanh trượt HP dựa vào index
  const handleHpSliderChange = (e) => {
    const index = parseInt(e.target.value, 10);
    SoundManager.typeKey();
    onSettingsChange({ ...settings, maxAttempts: hpValues[index] });
  };

  return (
    <div className="lobby-wrapper">
      <h1 className="lobby-title-outside">SẢNH CHỜ</h1>
      <p className="lobby-desc-outside">Tuỳ chỉnh cấu hình phòng chơi</p>

      <div className="settings-box">
        <div className="setting-group mode-group">
          <h3>Chế độ</h3>
          <div className="btn-group">
            <button 
              className={`choice-btn ${settings.mode === 'chain' ? 'active' : ''}`}
              onClick={() => handleModeChange('chain')}
            >
              Nối từ
            </button>
            <button 
              className={`choice-btn ${settings.mode === 'scramble' ? 'active' : ''}`}
              onClick={() => handleModeChange('scramble')}
            >
              Xếp chữ
            </button>
            <button 
              className={`choice-btn ${settings.mode === 'fillblank' ? 'active' : ''}`}
              onClick={() => handleModeChange('fillblank')}
            >
              Điền từ
            </button>
          </div>
        </div>

        <div className="settings-grid">
          {/* Độ khó giữ dạng nút bấm truyền thống */}
          <div className="setting-group">
            <h3>Độ khó</h3>
            <div className="btn-group">
              <button 
                className={`choice-btn ${settings.difficulty === 'easy' ? 'active' : ''}`}
                onClick={() => handleDifficultyChange('easy')}
              >
                Dễ
              </button>
              <button 
                className={`choice-btn ${settings.difficulty === 'hard' ? 'active' : ''}`}
                onClick={() => handleDifficultyChange('hard')}
              >
                Khó
              </button>
            </div>
          </div>

          <div className="setting-group slider-group">
            <h3>Thời gian: <span className="highlight-value">{settings.timeLimit}s</span></h3>
            <div className="slider-container">
              <input 
                type="range" 
                min="5" 
                max="15" 
                step="1"
                value={settings.timeLimit || 10} 
                onChange={handleTimeSliderChange}
                className="lobby-slider"
              />
              <div className="slider-ticks">
                <span>5s</span>
                <span>10s</span>
                <span>15s</span>
              </div>
            </div>
          </div>

          <div className="setting-group slider-group">
            <h3>❤️ HP: <span className="highlight-value">{settings.maxAttempts === Infinity ? '∞' : settings.maxAttempts}</span></h3>
            <div className="slider-container">
              <input 
                type="range" 
                min="0" 
                max="3" 
                step="1"
                value={currentHpIndex} 
                onChange={handleHpSliderChange}
                className="lobby-slider"
              />
              <div className="slider-ticks">
                <span>1</span>
                <span>3</span>
                <span>5</span>
                <span>∞</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lobby-actions">
        <button className="small-btn" onClick={() => { 
          SoundManager.typeKey(); 
          onOpenStore(); 
          }}> Cửa hàng</button>
        <button className="primary-btn pulse-btn" 
        onClick={handleStart}>CHIẾN</button>
        <button className="small-btn" onClick={() => { 
          SoundManager.typeKey(); 
          onOpenFlashcard(); 
          }}> Flashcard</button>
      </div>
    </div>
  );
}