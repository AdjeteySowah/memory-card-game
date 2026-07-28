import './ScoreBoard.css';

export default function ScoreBoard({ animateIn }) {
  return (
    <div className={`score-board ${animateIn ? 'active' : ''}`}>
      <span className="score">
        <span>Score:</span> <span>0</span>
      </span>
      <span className="best-score">
        <span>Best Score:</span> <span>0</span>
      </span>
    </div>
  );
}
// adjust spacing b/n score and score-value later
