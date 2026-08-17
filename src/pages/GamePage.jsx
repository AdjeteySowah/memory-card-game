import { useState } from 'react';

import CardCollection from '../components/game/CardCollection';
import ScoreBoard from '../components/game/ScoreBoard';
import ModalBox from './ModalBox';

import { updateCharacterCardContent } from '../utils/cardGameLogic';
import { playSound } from '../utils/sounds';

import gameLogo from '../assets/images/logo.png';
import './GamePage.css';

export default function GamePage({
  characters,
  animateIn,
  difficulty,
  showModal,
  setAnimateIn,
  setRenderHomePage,
  setRenderGamePage,
  setShowModal,
}) {
  const [selectedCharacterCards, setSelectedCharacterCards] = useState([]);
  const [progress, setProgress] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [characterCards, setCharacterCards] = useState(() =>
    updateCharacterCardContent(
      characters,
      difficulty,
      selectedCharacterCards,
      progress
    )
  );
  const [gameWon, setGameWon] = useState(false);
  const totalProgress =
    difficulty === 'Easy' ? 5 : difficulty === 'Medium' ? 8 : 12;

  function handleLogoClick() {
    playSound('click');
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
        <ScoreBoard
          animateIn={animateIn}
          difficulty={difficulty}
          progress={progress}
          totalProgress={totalProgress}
          bestScore={bestScore}
        />
      </div>

      <div className={`game-board ${animateIn ? 'active' : ''}`}>
        <CardCollection
          characters={characters}
          characterCards={characterCards}
          selectedCharacterCards={selectedCharacterCards}
          difficulty={difficulty}
          progress={progress}
          bestScore={bestScore}
          totalProgress={totalProgress}
          setCharacterCards={setCharacterCards}
          setSelectedCharacterCards={setSelectedCharacterCards}
          setProgress={setProgress}
          setBestScore={setBestScore}
          setGameWon={setGameWon}
          setAnimateIn={setAnimateIn}
          setShowModal={setShowModal}
        />
      </div>

      {showModal && (
        <ModalBox
          characters={characters}
          difficulty={difficulty}
          gameResult={`${gameWon ? 'You win!' : 'You lose!'}`}
          gameWon={gameWon}
          animateIn={animateIn}
          setCharacterCards={setCharacterCards}
          setSelectedCharacterCards={setSelectedCharacterCards}
          setProgress={setProgress}
          setGameWon={setGameWon}
          setShowModal={setShowModal}
        />
      )}
    </main>
  );
}
