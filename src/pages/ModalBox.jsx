import Button from '../components/ui/Button';

import { updateCharacterCardContent } from '../utils/cardGameLogic';
import { playSound } from '../utils/sounds';

import './ModalBox.css';

export default function ModalBox({
  characters,
  difficulty,
  gameResult,
  gameWon,
  animateIn,
  setCharacterCards,
  setSelectedCharacterCards,
  setProgress,
  setGameWon,
  setShowModal,
}) {
  function handleRestartClick() {
    playSound('click');
    setSelectedCharacterCards([]);
    setProgress(0);
    setCharacterCards(
      updateCharacterCardContent(characters, difficulty, [], 0)
    );
    setGameWon(false);
    setShowModal(false);
  }

  return (
    <div className="modal-overlay">
      <div
        className={`modal-box 
          ${gameWon ? 'modal-box__won' : 'modal-box__lost'} 
          ${animateIn ? 'active' : ''}`}
      >
        <span className="result">{gameResult}</span>
        <Button variant="primary" onClick={handleRestartClick}>
          Restart
        </Button>
      </div>
    </div>
  );
}
