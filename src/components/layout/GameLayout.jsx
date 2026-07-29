import HomePage from '../../pages/HomePage';
import GamePage from '../../pages/GamePage';
import BackgroundVideo from './BackgroundVideo';
import Footer from './Footer';

import useCharacters from '../../hooks/useCharacters';
import useGameNavigation from '../../hooks/useGameNavigation';

export default function GameLayout() {
  const { characters, error } = useCharacters();
  const {
    renderHomePage,
    renderGamePage,
    difficulty,
    animateIn,
    setRenderHomePage,
    setRenderGamePage,
    setDifficulty,
    setAnimateIn,
  } = useGameNavigation(characters);

  return (
    <>
      <BackgroundVideo />

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

      {characters && <Footer animateIn={animateIn} />}
    </>
  );
}
