import backgroundVideo from '../../assets/background-video.mp4';
import HomePage from '../../pages/HomePage';

export default function GameLayout() {
  return (
    <>
      <div className="video-container">
        <video className="background-video" autoPlay loop muted playsInline>
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <HomePage />

      <footer></footer>
    </>
  );
}
