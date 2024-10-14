import React, { useState, useEffect } from 'react';
import './styles.css';

const API_URL = 'http://localhost:5000';

function App() {
  const [gameState, setGameState] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [gameLog, setGameLog] = useState([]);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = async () => {
    const response = await fetch(`${API_URL}/start`, { method: 'POST' });
    const data = await response.json();
    setGameState(data);
    setGameLog([
      "Welcome to Blackjack!",
      `Your cards are: ${data.player_hand.join(', ')} with a value of: ${data.player_total}`
    ]);
  };

  const handleAction = async (action) => {
    const response = await fetch(`${API_URL}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });
    const data = await response.json();
    setGameState(data);
    updateGameLog(data);
  };

  const handleAceValue = async (value) => {
    const response = await fetch(`${API_URL}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'ace_value', value }),
    });
    const data = await response.json();
    setGameState(data);
    updateGameLog(data);
    setInputValue('');
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (inputValue.toLowerCase() === 'y') {
      handleAction('hit');
    } else if (inputValue.toLowerCase() === 'n') {
      handleAction('stay');
    } else if (inputValue === '1' || inputValue === '11') {
      handleAceValue(parseInt(inputValue));
    }
    setInputValue('');
  };

  const updateGameLog = (data) => {
    setGameLog(prevLog => [
      ...prevLog,
      `Your hand: ${data.player_hand.join(', ')} (Total: ${data.player_total})`,
      `Dealer's hand: ${data.dealer_hand.join(', ')} (Total: ${data.dealer_total})`,
      data.message
    ]);
  };

  if (!gameState) return <div>Loading...</div>;

  return (
    <div className="App">
      <h1>Blackjack</h1>
      <div className="game-log">
        {gameLog.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
      {!gameState.game_over && (
        <form onSubmit={handleInputSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={gameState.player_hand.includes('A') ? "Enter Ace value (1 or 11)" : "Would you like to hit? (y/n)"}
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
