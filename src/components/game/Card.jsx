import './Card.css';

export default function Card({ src, alt, characterName }) {
  return (
    <div className="card">
      <div className="card-image-container">
        <img className="card-image" src={src} alt={alt} />
      </div>
      <span className="card-character-name">{characterName}</span>
    </div>
  );
}
