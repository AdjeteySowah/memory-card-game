import Loading from '../components/ui/Loading';
import Button from '../components/ui/Button';

import { playSound } from '../utils/sounds';

import gameLogo from '../assets/images/logo.png';
import './HomePage.css';

export default function HomePage({
  characters,
  animateIn,
  setAnimateIn,
  error,
  setRenderHomePage,
  setDifficulty,
  setRenderGamePage,
}) {
  function handleDifficultySelection(e) {
    playSound('click');
    setRenderHomePage(false);
    setAnimateIn(false);
    setDifficulty(e.target.textContent);
    setRenderGamePage(true);
  }

  if (error) {
    return (
      <main className="home-page home-page--error">
        <div className="home-page__error">
          <h2>Something went wrong</h2>
          <p>Try one of the following:</p>
          <ul>
            <li>Refresh the page</li>
            <li>Check your internet connection</li>
            <li>Clear your browser cache</li>
          </ul>
        </div>
      </main>
    );
  }

  if (!characters) {
    return <Loading />;
  }

  return (
    <main className={`home-page ${animateIn ? 'active' : ''}`}>
      <img
        className="home-page__logo"
        src={gameLogo}
        alt="Game logo: Arcane League of Legends"
      />

      <h1 className="home-page__title">Memory Game</h1>

      <div className="home-page__difficulty-buttons">
        <Button variant="primary" onClick={handleDifficultySelection}>
          Easy
        </Button>
        <Button variant="primary" onClick={handleDifficultySelection}>
          Medium
        </Button>
        <Button variant="primary" onClick={handleDifficultySelection}>
          Hard
        </Button>
      </div>
    </main>
  );
}
