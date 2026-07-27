import './GamePage.css';

export default function GamePage({ difficultyLevel }) {
  return (
    <main className="game-page">
      <h2>Welcome to the {difficultyLevel} page 😁.</h2>
    </main>
  );
}
