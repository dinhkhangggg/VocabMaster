import { useState, useEffect } from 'react'
import AuthScreen from './components/AuthScreen'
import LobbyScreen from './components/LobbyScreen'
import GameScreen from './components/GameScreen'
import StoreScreen from './components/StoreScreen'
import FlashcardScreen from './components/FlashcardScreen'

function App() {
  const [player, setPlayer] = useState(null)
  const [currentTab, setCurrentTab] = useState('lobby') // 'lobby', 'game', 'store', 'flashcard'
  const [vCoins, setVCoins] = useState(200)
  const [isLightMode, setIsLightMode] = useState(false)
  const [gameSettings, setGameSettings] = useState({ mode: 'chain', difficulty: 'easy', timeLimit: 15, maxAttempts: 3 })
  const [inventory, setInventory] = useState({ hint: 0, revive: 0, vip: false })

  const [flashcards, setFlashcards] = useState(() => {
    const saved = localStorage.getItem('vocab_flashcards');
    return saved ? JSON.parse(saved) : [];
  })

  useEffect(() => {
    if (isLightMode) document.documentElement.classList.add('light-mode');
    else document.documentElement.classList.remove('light-mode');
  }, [isLightMode]);

  const handleAddFlashcard = (word, meaning) => {
    setFlashcards(prev => {
      if (prev.find(f => f.word === word)) return prev;
      const updated = [{ id: Date.now(), word, meaning }, ...prev];
      localStorage.setItem('vocab_flashcards', JSON.stringify(updated));
      return updated;
    });
  };

  const renderTab = () => {
    switch(currentTab) {
      case 'lobby':
        return (
          <LobbyScreen 
            isLightMode={isLightMode}
            settings={gameSettings}
            onSettingsChange={setGameSettings}
            onStart={() => setCurrentTab('game')}
            onOpenStore={() => setCurrentTab('store')}
            onOpenFlashcard={() => setCurrentTab('flashcard')}
          />
        )
      case 'store':
        return <StoreScreen isLightMode={isLightMode} vCoins={vCoins} inventory={inventory} onBuy={(price, newInventory) => { setVCoins(v => v - price); setInventory(newInventory); }} onBack={() => setCurrentTab('lobby')} />
      case 'flashcard':
        return <FlashcardScreen isLightMode={isLightMode} flashcards={flashcards} onBack={() => setCurrentTab('lobby')} />
      case 'game':
      default:
        return (
          <GameScreen 
            isLightMode={isLightMode}
            playerName={player} 
            vCoins={vCoins}
            settings={gameSettings}
            inventory={inventory}
            onUpdateInventory={setInventory}
            onAddCoins={(amount) => setVCoins(v => v + amount)}
            onAddFlashcard={handleAddFlashcard}
            onGoLobby={() => setCurrentTab('lobby')}
            onOpenStore={() => setCurrentTab('store')}
          />
        )
    }
  }

  return (
    <div className="app-container">
      <button 
        className="theme-toggle" 
        onClick={() => setIsLightMode(!isLightMode)}
      >
        {isLightMode ? '🌙 ' : '☀️'}
      </button>

      {!player ? (
        <AuthScreen onLogin={setPlayer} isLightMode={isLightMode} />
      ) : (
        renderTab()
      )}
    </div>
  )
}

export default App

