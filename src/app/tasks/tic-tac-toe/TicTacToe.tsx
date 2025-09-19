'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Square from './Square';
import styles from './TicTacToe.module.css';

type Player = 'X' | 'O';
type GameMode = 'player' | 'computer' | null;

// --- Winner Announcement Modal ---
const WinnerModal = ({ winner, onReset }: { winner: Player | 'Draw'; onReset: () => void }) => {
  const message = winner === 'Draw' ? "It's a Draw!" : `Player ${winner} Wins!`;

  return (
    <div className={styles.modalOverlay}>
      <motion.div
        className={styles.modalContent}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <h2>Game Over</h2>
        <p className={styles.winnerText}>{message}</p>
        <div className={styles.modalButtons}>
          <button onClick={onReset}>Play Again</button>
        </div>
      </motion.div>
    </div>
  );
};

// --- Game Mode Selection Modal ---
const GameModeModal = ({ onSelect, isOpen }: { onSelect: (mode: GameMode) => void; isOpen: boolean }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <motion.div
        className={styles.modalContent}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <h2>Choose Your Game Mode</h2>
        <div className={styles.modalButtons}>
          <button onClick={() => onSelect('player')}>Player vs Player</button>
          <button onClick={() => onSelect('computer')}>Player vs Computer</button>
        </div>
      </motion.div>
    </div>
  );
};


const TicTacToe = () => {
  const [squares, setSquares] = useState<(Player | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [showWinnerModal, setShowWinnerModal] = useState(false);


  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const isDraw = !winner && squares.every(Boolean);

  useEffect(() => {
    if (winner) {
      setScores(prev => ({ ...prev, [winner]: prev[winner] + 1 }));
      setShowWinnerModal(true);
      return;
    }
    if (isDraw) {
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
      setShowWinnerModal(true);
      return;
    }
    
    if (gameMode === 'computer' && !xIsNext) {
      const bestMove = findBestMove(squares);
      if (bestMove !== -1) {
        setTimeout(() => {
          handleClick(bestMove, true);
        }, 600);
      }
    }
  }, [xIsNext, winner, isDraw, gameMode, squares]);
  
  const handleGameModeSelect = (mode: GameMode) => {
    setGameMode(mode);
    setIsModalOpen(false);
    handleResetGame(false);
  };


  function handleClick(i: number, isComputerMove = false) {
    if (squares[i] || winner || (gameMode === 'computer' && !xIsNext && !isComputerMove)) {
      return;
    }
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleResetGame(openModal = true) {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setShowWinnerModal(false);
    if (openModal) {
      setIsModalOpen(true);
    }
  }

  const renderSquare = (i: number) => {
    const isWinning = winnerInfo?.line.includes(i) ?? false;
    return <Square key={i} value={squares[i]} onClick={() => handleClick(i)} isWinning={isWinning} />;
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = 'It\'s a Draw!';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <>
      <AnimatePresence>
        {isModalOpen && <GameModeModal onSelect={handleGameModeSelect} isOpen={isModalOpen} />}
        {showWinnerModal && <WinnerModal winner={winner || 'Draw'} onReset={() => handleResetGame(true)} />}
      </AnimatePresence>

      <AnimatePresence>
        {!isModalOpen && (
          <motion.div
            className={styles.gameContainer}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <div className={styles.header}>
              <div className={styles.status}>{status}</div>
              <div className={styles.scoreboard}>
                <span>X: {scores.X}</span>
                <span>Draws: {scores.draws}</span>
                <span>O: {scores.O}</span>
              </div>
            </div>
            <motion.div
              className={styles.board}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              {[...Array(3)].map((_, rowIndex) => (
                <div key={rowIndex} className={styles.boardRow}>
                  {[...Array(3)].map((_, colIndex) => {
                    const i = rowIndex * 3 + colIndex;
                    return renderSquare(i);
                  })}
                </div>
              ))}
            </motion.div>
            <button onClick={() => handleResetGame()} className={styles.resetButton}>
              New Game
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Helper Functions ---
function calculateWinner(squares: (Player | null)[]) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}

function findBestMove(squares: (Player | null)[]): number {
  let bestVal = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
          squares[i] = 'O'; // Computer's move
          let moveVal = minimax(squares, 0, false);
          squares[i] = null; // Undo the move

          if (moveVal > bestVal) {
              bestMove = i;
              bestVal = moveVal;
          }
      }
  }
  return bestMove;
}

function minimax(board: (Player | null)[], depth: number, isMaximizing: boolean): number {
  const winner = calculateWinner(board)?.winner;
  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  if (board.every(square => square !== null)) return 0;

  if (isMaximizing) {
      let best = -Infinity;
      for (let i = 0; i < 9; i++) {
          if (board[i] === null) {
              board[i] = 'O';
              best = Math.max(best, minimax(board, depth + 1, !isMaximizing));
              board[i] = null;
          }
      }
      return best;
  } else {
      let best = Infinity;
      for (let i = 0; i < 9; i++) {
          if (board[i] === null) {
              board[i] = 'X';
              best = Math.min(best, minimax(board, depth + 1, !isMaximizing));
              board[i] = null;
          }
      }
      return best;
  }
}


export default TicTacToe;