import { useState } from 'react';
import HomePage from '../../pages/HomePage';
import backgroundVideo from '../../assets/background-video.mp4';

export default function GameLayout() {
  const [allCharacters, setAllCharacters] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);

  return (
    <>
      <div className="video-container">
        <video className="background-video" autoPlay loop muted playsInline>
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <HomePage
        allCharacters={allCharacters}
        setAllCharacters={setAllCharacters}
        animateIn={animateIn}
        setAnimateIn={setAnimateIn}
      />

      {allCharacters && (
        <footer className={`footer ${animateIn ? 'active' : ''}`}>
          <p>Appears only when the home page renders.</p>
        </footer>
      )}
    </>
  );
}
