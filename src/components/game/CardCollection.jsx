import { useState, useEffect, useRef } from 'react';
import Card from './Card';
import './CardCollection.css';

const NUMBER_OF_CARDS_FOR_EASY = 4;
const NUMBER_OF_CARDS_FOR_MEDIUM = 8;
const NUMBER_OF_CARDS_FOR_HARD = 12;

function shuffle(characters) {
  const shuffled = [...characters];

  for (let i = characters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getPairOfSlices(difficulty, progress) {
  const numberOfCards =
    difficulty === 'Easy'
      ? NUMBER_OF_CARDS_FOR_EASY
      : difficulty === 'Medium'
        ? NUMBER_OF_CARDS_FOR_MEDIUM
        : NUMBER_OF_CARDS_FOR_HARD;

  let [a, b] = [null, null];

  if (difficulty === 'Easy') {
    if (progress >= 2) {
      a = generateRandomNumber(1, 2);
      b = numberOfCards - a;
    } else if (progress === 1) {
      a = generateRandomNumber(0, 1);
      b = numberOfCards - a;
    } else {
      a = 0;
      b = numberOfCards;
    }
  }

  if (difficulty === 'Medium') {
    if (progress >= 6) {
      a = generateRandomNumber(4, 5);
      b = numberOfCards - a;
    } else if (progress >= 4) {
      a = generateRandomNumber(3, 4);
      b = numberOfCards - a;
    } else if (progress >= 2) {
      a = 2;
      b = numberOfCards - a;
    } else if (progress === 1) {
      a = 1;
      b = numberOfCards - a;
    } else {
      a = 0;
      b = numberOfCards;
    }
  }

  if (difficulty === 'Hard') {
    if (progress >= 10) {
      a = 10;
      b = numberOfCards - a;
    } else if (progress >= 8) {
      a = generateRandomNumber(7, 8);
      b = numberOfCards - a;
    } else if (progress >= 6) {
      a = generateRandomNumber(5, 6);
      b = numberOfCards - a;
    } else if (progress >= 4) {
      a = 4;
      b = numberOfCards - a;
    } else if (progress >= 2) {
      a = 2;
      b = numberOfCards - a;
    } else if (progress === 1) {
      a = 1;
      b = numberOfCards - a;
    } else {
      a = 0;
      b = numberOfCards;
    }
  }

  return [a, b];
}

function updateCharacterCardContent(
  characters,
  difficulty,
  selectedCharacterCards,
  progress
) {
  const updatedCharacters = shuffle(characters).filter(
    (item) =>
      !selectedCharacterCards.some((i) => i.name === item.character.name)
  );

  const pairOfSlices = getPairOfSlices(difficulty, progress);

  const sliceFromSelectedCharacterCards = selectedCharacterCards.slice(
    0,
    pairOfSlices[0]
  );
  const sliceFromShuffledCharacters = updatedCharacters.slice(
    0,
    pairOfSlices[1]
  );

  return shuffle([
    ...sliceFromSelectedCharacterCards,
    ...sliceFromShuffledCharacters,
  ]);
}

export default function CardCollection({
  characters,
  difficulty,
  progress,
  setProgress,
}) {
  const [selectedCharacterCards, setSelectedCharacterCards] = useState([]);
  const [characterCards, setCharacterCards] = useState(() =>
    updateCharacterCardContent(
      characters,
      difficulty,
      selectedCharacterCards,
      progress
    )
  );
  const [isFlipped, setIsFlipped] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  function handleFlip() {
    if (isFlipped) return;

    setIsFlipped(true);
    timeoutRef.current = setTimeout(() => {
      setIsFlipped(false);
    }, 1200);
  }

  function handleCardClick(character) {
    if (selectedCharacterCards.includes(character)) return;

    let nextSelectedCharacterCards = [...selectedCharacterCards, character];
    let nextProgress = progress + 1;

    setSelectedCharacterCards(nextSelectedCharacterCards);
    setProgress(nextProgress);

    setCharacterCards(
      updateCharacterCardContent(
        characters,
        difficulty,
        nextSelectedCharacterCards,
        nextProgress
      )
    );
  }

  return (
    <div className="card-collection" onClick={handleFlip}>
      {characterCards.map((char, index) => (
        <Card
          key={index}
          character={char.character || char}
          src={char.character?.image.medium || char.image.medium}
          alt={char.character?.name || char.name}
          characterName={char.character?.name || char.name}
          isFlipped={isFlipped}
          onCardClick={handleCardClick}
        />
      ))}
    </div>
  );
}
