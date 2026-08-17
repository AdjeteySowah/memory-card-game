import HomePage from '../../pages/HomePage';
import GamePage from '../../pages/GamePage';
import BackgroundVideo from './BackgroundVideo';
import Footer from './Footer';
import Instructions from '../../pages/Instructions';

import useCharacters from '../../hooks/useCharacters';
import useGameNavigation from '../../hooks/useGameNavigation';

export default function GameLayout() {
  const { characters, error } = useCharacters();
  const {
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
          showModal={showModal}
          setAnimateIn={setAnimateIn}
          setRenderHomePage={setRenderHomePage}
          setRenderGamePage={setRenderGamePage}
          setShowModal={setShowModal}
        />
      )}

      {characters && <Footer animateIn={animateIn} />}

      <Instructions />
    </>
  );
}
