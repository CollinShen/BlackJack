import React, { useState, useEffect } from 'react';
import './styles.css';

const API_URL = 'http://localhost:5000';

function App() {
  const [gameState, setGameState] = useState(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    startGame();
  }, []);

  const startGame = async () => {
    const response = await fetch(`${API_URL}/start`, { method: 'POST' });
    const data = await response.json();
    setGameState(data);
  };

  const handleAction = async (action) => {
    const response = await fetch(`${API_URL}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });
    const data = await response.json();
    setGameState(data);
  };

  const handleAceValue = async (value) => {
    const response = await fetch(`${API_URL}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'ace_value', value }),
    });
    const data = await response.json();
    setGameState(data);
    setInputValue('');
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (inputValue === 'y') {
      handleAction('hit');
    } else if (inputValue === 'n') {
      handleAction('stay');
    } else if (inputValue === '1' || inputValue === '11') {
      handleAceValue(parseInt(inputValue));
    }
    setInputValue('');
  };

  if (!gameState) return <div>Loading...</div>;

  return (
    <div className="App">
      <h1>Blackjack</h1>
      <div className="game-info">
        <p>Player hand: {gameState.player_hand.join(', ')} (Total: {gameState.player_total})</p>
        <p>Dealer hand: {gameState.dealer_hand.join(', ')} (Total: {gameState.dealer_total})</p>
        {gameState.message && <p className="message">{gameState.message}</p>}
      </div>
      {!gameState.game_over && (
        <form onSubmit={handleInputSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your action (y/n) or Ace value (1/11)"
          />
          <button type="submit">Submit</button>
        </form>
      )}
      {gameState.game_over && (
        <button onClick={startGame}>Play Again</button>
      )}
    </div>
  );
}

export default App;
