import Card from './Card';
import './CardCollection.css';

function shuffle(characters) {
  const shuffled = [...characters];

  for (let i = characters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export default function CardCollection({ characters, difficulty }) {
  const characterCards =
    difficulty === 'Easy'
      ? shuffle(characters).slice(0, 4)
      : difficulty === 'Medium'
        ? shuffle(characters).slice(0, 8)
        : shuffle(characters).slice(0, 12);

  return (
    <div className="card-collection">
      {characterCards.map((char) => (
        <Card
          key={char.character.id}
          src={char.character.image.medium}
          alt={char.character.name}
          characterName={char.character.name}
        />
      ))}
    </div>
  );
}
