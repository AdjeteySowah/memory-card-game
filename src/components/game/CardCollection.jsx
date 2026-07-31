import { useState, useEffect, useRef } from 'react';
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

function updateCharacterCardContent(characters, difficulty) {
  const characterCards =
    difficulty === 'Easy'
      ? shuffle(characters).slice(0, 4)
      : difficulty === 'Medium'
        ? shuffle(characters).slice(0, 8)
        : shuffle(characters).slice(0, 12);

  return characterCards;
}

export default function CardCollection({ characters, difficulty }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [characterCards, setCharacterCards] = useState(() =>
    updateCharacterCardContent(characters, difficulty)
  );
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  function handleFlip() {
    if (isFlipped) return;

    setIsFlipped(true);
    timeoutRef.current = setTimeout(() => {
      setCharacterCards(updateCharacterCardContent(characters, difficulty));
      setIsFlipped(false);
    }, 1200);
  }

  return (
    <div className="card-collection" onClick={handleFlip}>
      {characterCards.map((char, index) => (
        <Card
          key={index}
          src={char.character.image.medium}
          alt={char.character.name}
          characterName={char.character.name}
          isFlipped={isFlipped}
        />
      ))}
    </div>
  );
}
