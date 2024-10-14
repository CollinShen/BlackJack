import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Card from '../components/Card';

const createDeck = () => {
  const deck = [];
  const suits = ['♠', '♥', '♦', '♣'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  
  return deck;
};

const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const calculateHandValue = (hand) => {
  let value = 0;
  let aceCount = 0;
  
  for (let card of hand) {
    if (card.value === 'A') {
      aceCount++;
      value += 11;
    } else if (['K', 'Q', 'J'].includes(card.value)) {
      value += 10;
    } else {
      value += parseInt(card.value);
    }
  }
  
  while (value > 21 && aceCount > 0) {
    value -= 10;
    aceCount--;
  }
  
  return value;
};

export default function Game() {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameState, setGameState] = useState('initial');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newDeck = shuffleDeck(createDeck());
    setDeck(newDeck);
    setPlayerHand([newDeck.pop(), newDeck.pop()]);
    setDealerHand([newDeck.pop(), newDeck.pop()]);
    setGameState('playerTurn');
    setMessage('');
  };

  const hit = () => {
    if (gameState !== 'playerTurn') return;
    
    const newPlayerHand = [...playerHand, deck.pop()];
    setPlayerHand(newPlayerHand);
    
    if (calculateHandValue(newPlayerHand) > 21) {
      setGameState('dealerWin');
      setMessage('You busted! Dealer wins.');
    }
  };

  const stand = () => {
    if (gameState !== 'playerTurn') return;
    
    let newDealerHand = [...dealerHand];
    while (calculateHandValue(newDealerHand) < 17) {
      newDealerHand.push(deck.pop());
    }
    setDealerHand(newDealerHand);
    
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(newDealerHand);
    
    if (dealerValue > 21) {
      setGameState('playerWin');
      setMessage('Dealer busted! You win!');
    } else if (dealerValue > playerValue) {
      setGameState('dealerWin');
      setMessage('Dealer wins!');
    } else if (dealerValue < playerValue) {
      setGameState('playerWin');
      setMessage('You win!');
    } else {
      setGameState('tie');
      setMessage("It's a tie!");
    }
  };

  return (
    <Layout>
      <h1>Blackjack Game</h1>
      <div>
        <h2>Your Hand ({calculateHandValue(playerHand)})</h2>
        <div style={{ display: 'flex' }}>
          {playerHand.map((card, index) => (
            <Card key={index} suit={card.suit} value={card.value} />
          ))}
        </div>
      </div>
      <div>
        <h2>Dealer's Hand ({gameState !== 'playerTurn' ? calculateHandValue(dealerHand) : '?'})</h2>
        <div style={{ display: 'flex' }}>
          {dealerHand.map((card, index) => (
            <Card key={index} suit={card.suit} value={gameState === 'playerTurn' && index === 0 ? '?' : card.value} />
          ))}
        </div>
      </div>
      {gameState === 'playerTurn' && (
        <div>
          <button onClick={hit}>Hit</button>
          <button onClick={stand}>Stand</button>
        </div>
      )}
      {gameState !== 'playerTurn' && (
        <div>
          <p>{message}</p>
          <button onClick={startNewGame}>Play Again</button>
          <button onClick={() => router.push('/')}>Main Menu</button>
        </div>
      )}
    </Layout>
  );
}