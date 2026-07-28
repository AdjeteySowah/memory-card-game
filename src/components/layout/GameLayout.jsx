import { useState, useEffect } from 'react';

import HomePage from '../../pages/HomePage';
import GamePage from '../../pages/GamePage';
import Button from '../ui/Button';

import { unwantedPersons } from '../../data/unwantedPersons';
import backgroundVideo from '../../assets/background-video.mp4';
import volume from '../../assets/icons/volume.svg';
import volumeOff from '../../assets/icons/volume-off.svg';
import music from '../../assets/icons/music.svg';
import musicOff from '../../assets/icons/music-off.svg';
import questionMark from '../../assets/icons/question-mark.svg';
import cancel from '../../assets/icons/cancel.svg';

function filterData(data) {
  const filteredData = data.filter(
    (item) =>
      !unwantedPersons.some(
        (p) =>
          p.person === item.person.name && p.character === item.character.name
      )
  );
  return filteredData;
}

export default function GameLayout() {
  const [characters, setCharacters] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);
  const [error, setError] = useState(null);
  const [renderHomePage, setRenderHomePage] = useState(true);
  const [renderGamePage, setRenderGamePage] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [soundOn, setSoundOn] = useState(true);
  const [musicOn, setMusicOn] = useState(true);
  const [helpOn, setHelpOn] = useState(false);

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
          setCharacters(filterData(data));
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
    if (characters) {
      requestAnimationFrame(() => setAnimateIn(true));
    }
  }, [renderHomePage, renderGamePage, characters]);

  function handleSoundToggle() {
    setSoundOn((prevValue) => !prevValue);
  }

  function handleMusicToggle() {
    setMusicOn((prevValue) => !prevValue);
  }

  function handleHelpToggle() {
    setHelpOn((prevValue) => !prevValue);
  }

  return (
    <>
      <div className="video-container">
        <video className="background-video" autoPlay loop muted playsInline>
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      {renderHomePage && (
        <HomePage
          characters={characters}
          animateIn={animateIn}
          setAnimateIn={setAnimateIn}
          error={error}
          setRenderHomePage={setRenderHomePage}
          setDifficulty={setDifficulty}
          setRenderGamePage={setRenderGamePage}
        />
      )}

      {renderGamePage && (
        <GamePage
          characters={characters}
          animateIn={animateIn}
          difficulty={difficulty}
          setAnimateIn={setAnimateIn}
          setRenderHomePage={setRenderHomePage}
          setRenderGamePage={setRenderGamePage}
        />
      )}

      {characters && (
        <footer className={`footer ${animateIn ? 'active' : ''}`}>
          <div>
            <Button
              variant="secondary"
              icon={soundOn ? volume : volumeOff}
              alt={`volume ${soundOn ? 'on' : 'off'} icon`}
              aria-label={`volume ${soundOn ? 'on' : 'off'}`}
              onClick={handleSoundToggle}
            />
            <Button
              variant="secondary"
              icon={musicOn ? music : musicOff}
              alt={`music ${musicOn ? 'on' : 'off'} icon`}
              aria-label={`music ${musicOn ? 'on' : 'off'}`}
              onClick={handleMusicToggle}
            />
          </div>
          <Button
            variant="secondary"
            icon={!helpOn ? questionMark : cancel}
            alt={`${!helpOn ? 'help' : 'close help'} icon`}
            aria-label={`${!helpOn ? 'help' : 'close help'}`}
            onClick={handleHelpToggle}
          />
        </footer>
      )}
    </>
  );
}
