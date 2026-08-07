import Tilt from 'react-parallax-tilt';
import './Card.css';

export default function Card({
  character,
  src,
  alt,
  characterName,
  isFlipped,
  onCardClick,
}) {
  return (
    <Tilt className="card-tilt" tiltEnable={!isFlipped}>
      <div
        className={`card ${isFlipped ? 'flipped' : ''}`}
        onClick={() => onCardClick(character)}
      >
        <div className="card-inner">
          <div className="card-front">
            <div className="card-image-container">
              <img className="card-image" src={src} alt={alt} />
            </div>
            <span className="card-character-name">{characterName}</span>
          </div>

          <div className="card-back"></div>
        </div>
      </div>
    </Tilt>
  );
}
