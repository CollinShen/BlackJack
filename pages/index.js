import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Home() {
  const [menuChoice, setMenuChoice] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    switch(menuChoice.toLowerCase()) {
      case 'p':
        router.push('/game');
        break;
      case 'r':
        router.push('/rules');
        break;
      case 'a':
        router.push('/about');
        break;
      case 'q':
        alert("Thanks for playing!");
        break;
      default:
        alert("Invalid choice. Please try again.");
    }
  };

  return (
    <Layout>
      <h1>Blackjack Game</h1>
      <form onSubmit={handleSubmit}>
        <p>P: Play</p>
        <p>R: Rules</p>
        <p>A: About</p>
        <p>Q: Quit</p>
        <input
          type="text"
          value={menuChoice}
          onChange={(e) => setMenuChoice(e.target.value)}
          placeholder="Enter your choice"
        />
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
}