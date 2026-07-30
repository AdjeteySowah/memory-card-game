import CardCollection from '../components/game/CardCollection';
import ScoreBoard from '../components/game/ScoreBoard';

import gameLogo from '../assets/images/logo.png';
import './GamePage.css';

export default function GamePage({
  characters,
  animateIn,
  difficulty,
  setAnimateIn,
  setRenderHomePage,
  setRenderGamePage,
}) {
  function handleLogoClick() {
    setAnimateIn(false);
    setRenderGamePage(false);
    setRenderHomePage(true);
  }

  return (
    <main className="game-page">
      <div className="game-header">
        <img
          className={`game-logo ${animateIn ? 'active' : ''}`}
          src={gameLogo}
          alt="Game logo: Arcane League of Legends"
          onClick={handleLogoClick}
        />
        <ScoreBoard animateIn={animateIn} />
      </div>

      <div className={`game-board ${animateIn ? 'active' : ''}`}>
        <CardCollection characters={characters} difficulty={difficulty} />
      </div>
    </main>
  );
}
