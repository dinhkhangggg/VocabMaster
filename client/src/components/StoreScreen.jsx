import React, { useState } from 'react';
import './StoreScreen.css';

export default function StoreScreen({ vCoins, inventory, onBuy, onBack }) {
  const items = [
    { id: 1, name: 'Kính lúp Gợi ý', price: 50, icon: '🔍', desc: 'Nhờ AI gợi ý 1 từ hợp lệ khi bạn bí.' },
    { id: 2, name: 'Avatar Vip', price: 200, icon: '👑', desc: 'Khung viền vàng chói lóa cho tài khoản.' },
    { id: 3, name: 'Bùa Hồi Sinh', price: 500, icon: '❤️', desc: 'Có thêm 15 giây khi hết giờ.' }
  ];

  const handleBuy = (item) => {
    if (item.id === 2 && inventory.vip) {
      alert('Bạn đã sở hữu Avatar Vip rồi!');
      return;
    }

    if (vCoins >= item.price) {
      alert(`Đã mua thành công: ${item.name}!`);
      
      const newInventory = { ...inventory };
      if (item.id === 1) newInventory.hint += 1;
      else if (item.id === 3) newInventory.revive += 1;
      else if (item.id === 2) newInventory.vip = true;

      onBuy(item.price, newInventory);
    } else {
      alert('Bạn không đủ V-Coins!');
    }
  };

  return (
    <div className="store-container glass-panel">
      <div className="store-header">
        <button className="back-btn" onClick={onBack}>⬅ Trở về</button>
        <h2>Cửa Hàng Vật Phẩm 🛒</h2>
        <div className="coin-display">💰 {vCoins} V-Coins</div>
      </div>

      <div className="store-grid">
        {items.map(item => (
          <div key={item.id} className="store-item">
            <div className="item-icon">{item.icon}</div>
            <h3>{item.name}</h3>
            <p>{item.desc}</p>
            <button 
              className="buy-btn" 
              onClick={() => handleBuy(item)}
              disabled={item.id === 2 && inventory.vip}
              style={item.id === 2 && inventory.vip ? { background: 'var(--muted-text)', cursor: 'not-allowed' } : {}}
            >
              {item.id === 2 && inventory.vip ? 'Đã Sở Hữu' : `Mua (${item.price} 💰)`}
            </button>
            {item.id !== 2 && (
              <div style={{ marginTop: '10px', fontSize: '0.9rem', color: 'var(--accent-color)' }}>
                Đang có: {item.id === 1 ? inventory.hint : inventory.revive}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
