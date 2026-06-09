import React from 'react';
import './FlashcardScreen.css';

export default function FlashcardScreen({ flashcards, onBack }) {

  return (
    <div className="flashcard-container glass-panel">
      <div className="flashcard-header">
        <button className="back-btn" onClick={onBack}>⬅ Trở về</button>
        <h2>Thư viện Flashcard 📚</h2>
        <div style={{width: '80px'}}></div>
      </div>

      <p className="hint-text">Rê chuột vào thẻ để học nghĩa Tiếng Việt (Từ mới sẽ được Bot tự động lưu vào đây).</p>

      {(!flashcards || flashcards.length === 0) ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#94a3b8' }}>
          <h3>Thư viện trống rỗng!</h3>
          <p>Hãy vào game thi đấu, Bot sẽ tự động nhét những từ vựng bạn chưa biết vào đây.</p>
        </div>
      ) : (
        <div className="flashcard-grid">
          {flashcards.map(card => (
          <div key={card.id} className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <h3>{card.word}</h3>
              </div>
              <div className="flip-card-back">
                <p>
                  {typeof card.meaning === 'string' ? card.meaning : (
                    <>
                      <span style={{ display: 'block', color: 'var(--muted-text)', fontStyle: 'italic', marginBottom: '5px' }}>{card.meaning.ipa}</span>
                      <span style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>{card.meaning.en}</span>
                      <span style={{ display: 'block', color: 'var(--accent-color)' }}>{card.meaning.vi}</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
}
