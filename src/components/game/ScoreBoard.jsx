import './ScoreBoard.css';

export default function ScoreBoard({ animateIn }) {
  return (
    <section className={`score-board-container ${animateIn ? 'active' : ''}`}>
      <div className="score-board">
        <span className="score">
          <span>Score:</span> <span>0</span>
        </span>

        <span className="best-score">
          <span>Best Score:</span> <span>0</span>
        </span>
      </div>

      <div className="score-board-progress-counter">0 / 6</div>
    </section>
  );
}
