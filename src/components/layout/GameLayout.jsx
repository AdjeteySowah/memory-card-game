import { useState } from 'react';

import HomePage from '../../pages/HomePage';
import GamePage from '../../pages/GamePage';
import Button from '../ui/Button';

import backgroundVideo from '../../assets/background-video.mp4';
import volume from '../../assets/icons/volume.svg';
import volumeOff from '../../assets/icons/volume-off.svg';
import music from '../../assets/icons/music.svg';
import musicOff from '../../assets/icons/music-off.svg';
import questionMark from '../../assets/icons/question-mark.svg';
import cancel from '../../assets/icons/cancel.svg';

export default function GameLayout() {
  const [allCharacters, setAllCharacters] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);
  const [renderHomePage, setRenderHomePage] = useState(true);
  const [renderGamePage, setRenderGamePage] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState(null);
  const [soundOn, setSoundOn] = useState(true);
  const [musicOn, setMusicOn] = useState(true);
  const [helpOn, setHelpOn] = useState(false);

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
          allCharacters={allCharacters}
          setAllCharacters={setAllCharacters}
          animateIn={animateIn}
          setAnimateIn={setAnimateIn}
          setRenderHomePage={setRenderHomePage}
          setDifficultyLevel={setDifficultyLevel}
          setRenderGamePage={setRenderGamePage}
        />
      )}

      {renderGamePage && <GamePage difficultyLevel={difficultyLevel} />}

      {allCharacters && (
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
