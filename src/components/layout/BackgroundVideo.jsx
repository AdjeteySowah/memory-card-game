import backgroundVideo from '../../assets/background-video.mp4';

export default function BackgroundVideo() {
  return (
    <div className="video-container">
      <video className="background-video" autoPlay loop muted playsInline>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className="video-overlay"></div>
    </div>
  );
}
