import { useState, useEffect, useRef } from 'react';
import { updateCharacterCardContent } from '../../utils/cardGameLogic';
import { playSound } from '../../utils/sounds';
import Card from './Card';
import './CardCollection.css';

export default function CardCollection({
  characters,
  characterCards,
  selectedCharacterCards,
  difficulty,
  progress,
  bestScore,
  totalProgress,
  setCharacterCards,
  setSelectedCharacterCards,
  setProgress,
  setBestScore,
  setGameWon,
  setAnimateIn,
  setShowModal,
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  function handleCardClick(character) {
    let nextProgress = progress + 1;
    let nextSelectedCharacterCards = [...selectedCharacterCards, character];

    if (isFlipped) return;

    if (selectedCharacterCards.includes(character)) {
      setAnimateIn(false);
      setShowModal(true);
      return;
    }

    if (nextProgress === totalProgress) {
      setProgress(nextProgress);
      setBestScore(nextProgress);
      setGameWon(true);
      setAnimateIn(false);
      setShowModal(true);
      return;
    }

    setProgress(nextProgress);
    if (nextProgress > bestScore) setBestScore(nextProgress);
    setIsFlipped(true);
    playSound('flip');

    timeoutRef.current = setTimeout(() => {
      setSelectedCharacterCards(nextSelectedCharacterCards);

      setCharacterCards(
        updateCharacterCardContent(
          characters,
          difficulty,
          nextSelectedCharacterCards,
          nextProgress
        )
      );
      setIsFlipped(false);
      playSound('flip');
    }, 1200);
  }

  return (
    <div className="card-collection">
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
