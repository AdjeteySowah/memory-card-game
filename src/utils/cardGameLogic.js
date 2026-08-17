import { shuffle, generateRandomNumber } from './random';

const NUMBER_OF_CARDS_FOR_EASY = 4;
const NUMBER_OF_CARDS_FOR_MEDIUM = 8;
const NUMBER_OF_CARDS_FOR_HARD = 12;

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

export function updateCharacterCardContent(
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
