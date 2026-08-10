import Button from '../components/ui/Button';
import './ModalBox.css';

export default function Modal({ gameResult, gameWon, animateIn }) {
  console.log(animateIn);
  return (
    <div className="modal-overlay">
      <div
        className={`modal-box 
          ${gameWon ? 'modal-box__won' : 'modal-box__lost'} 
          ${animateIn ? 'active' : ''}`}
      >
        <span className="result">{gameResult}</span>
        <Button variant="primary">Restart</Button>
      </div>
    </div>
  );
}
