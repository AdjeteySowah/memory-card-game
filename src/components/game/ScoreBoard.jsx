import { useState } from 'react';
import './ScoreBoard.css';

export default function ScoreBoard({ animateIn, difficulty, progress }) {
  const [bestScore, setBestScore] = useState(0);
  const totalProgress =
    difficulty === 'Easy' ? 5 : difficulty === 'Medium' ? 8 : 12;

  return (
    <section className={`score-board-container ${animateIn ? 'active' : ''}`}>
      <div className="score-board">
        <span className="score">
          <span>Score:</span> <span>{progress}</span>
        </span>

        <span className="best-score">
          <span>Best Score:</span>{' '}
          <span>{progress > bestScore ? progress : bestScore}</span>
        </span>
      </div>

      <div className="score-board-progress-counter">
        {progress} / {totalProgress}
      </div>
    </section>
  );
}
