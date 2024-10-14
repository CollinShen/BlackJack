import Layout from '../components/Layout';

export default function Rules() {
  return (
    <Layout>
      <h1>Blackjack Rules</h1>
      <ul>
        <li>This version of blackjack will be based on no bets and a winstreak</li>
        <li>The player will be dealt 2 cards, and can choose the value of an Ace to be 1 or 11</li>
        <li>The player can then choose to hit or stay, if they stay it passes to dealer's turn</li>
        <li>If the player chooses to hit, their value increases, if it passes 21 they bust</li>
        <li>If the dealer's cards are below 17, they are forced to hit, if they are above, they must stay</li>
        <li>If the dealer and player tie values and neither bust, the dealer wins</li>
      </ul>
    </Layout>
  );
}