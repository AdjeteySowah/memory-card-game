import { useState, useEffect } from 'react';

export default function useGameNavigation(characters) {
  const [renderHomePage, setRenderHomePage] = useState(true);
  const [renderGamePage, setRenderGamePage] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (characters) requestAnimationFrame(() => setAnimateIn(true));
  }, [renderHomePage, renderGamePage, characters]);

  return {
    renderHomePage,
    renderGamePage,
    difficulty,
    animateIn,
    setRenderHomePage,
    setRenderGamePage,
    setDifficulty,
    setAnimateIn,
  };
}
