import { useState } from 'react';
import './ScoreBoard.css';

export default function ScoreBoard({ animateIn, progress, totalProgress }) {
  let bestScore = 0;

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
