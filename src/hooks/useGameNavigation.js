import { useState, useEffect } from 'react';

export default function useGameNavigation(characters) {
  const [renderHomePage, setRenderHomePage] = useState(true);
  const [renderGamePage, setRenderGamePage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (characters) requestAnimationFrame(() => setAnimateIn(true));
  }, [renderHomePage, renderGamePage, showModal, characters]);

  return {
    renderHomePage,
    renderGamePage,
    showModal,
    difficulty,
    animateIn,
    setRenderHomePage,
    setRenderGamePage,
    setShowModal,
    setDifficulty,
    setAnimateIn,
  };
}
