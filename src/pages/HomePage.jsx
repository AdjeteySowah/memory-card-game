import { useState, useEffect } from 'react';

import Loading from '../components/ui/Loading';
import Button from '../components/ui/Button';

import gameLogo from '../assets/images/logo.png';
import './HomePage.css';

export default function HomePage({
  allCharacters,
  setAllCharacters,
  animateIn,
  setAnimateIn,
}) {
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      async function fetchCharacters() {
        try {
          const response = await fetch(
            'https://api.tvmaze.com/shows/55138/cast'
          );

          if (!response.ok) {
            throw new Error('Failed to fetch characters.');
          }

          const data = await response.json();
          setAllCharacters(data);
        } catch (error) {
          console.error(error); // Do I need to console this?
          setError(error.message);
        }
      }

      fetchCharacters();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (allCharacters) {
      requestAnimationFrame(() => setAnimateIn(true));
    }
  }, [allCharacters]);

  if (error) {
    return (
      <main>
        <div className="home-page__error">
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  if (!allCharacters) {
    return <Loading />;
  }

  return (
    <main className={`home-page ${animateIn ? 'active' : ''}`}>
      <img
        className="home-page__logo"
        src={gameLogo}
        alt="Game logo: Arcane League of Legends"
      />

      <h1 className="home-page__title">Memory Game</h1>

      <div className="home-page__difficulty-buttons">
        <Button variant="text">Easy</Button>
        <Button variant="text">Medium</Button>
        <Button variant="text">Hard</Button>
      </div>
    </main>
  );
}
