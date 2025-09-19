import TicTacToe from './TicTacToe';
import styles from '../taskpage.module.css';

export default function TicTacToePage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Tic Tac Toe</h1>
      <div className={styles.componentWrapper}>
        <TicTacToe />
      </div>
    </main>
  );
}