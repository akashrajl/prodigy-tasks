import React from 'react';
import styles from './Square.module.css';

type SquareProps = {
  value: 'X' | 'O' | null;
  onClick: () => void;
  isWinning: boolean;
};

const Square = ({ value, onClick, isWinning }: SquareProps) => {
  const className = `
    ${styles.square}
    ${value === 'X' ? styles.x : styles.o}
    ${isWinning ? styles.winningSquare : ''}
  `;
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;