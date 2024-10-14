// App.js
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

/* styles.css */
body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f0f0f0;
}

.App {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  margin-bottom: 1rem;
}

.game-info {
  margin-bottom: 1rem;
}

input {
  padding: 0.5rem;
  margin-right: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.message {
  font-weight: bold;
  margin-top: 1rem;
}
