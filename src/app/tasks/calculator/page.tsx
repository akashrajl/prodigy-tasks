'use client';

import { useState, useEffect } from 'react'; // Import useEffect
import styles from './Calculator.module.css';

const CalculatorPage = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [isResultShown, setIsResultShown] = useState(false);

  // Keyboard Event Handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      if (key >= '0' && key <= '9') {
        handleDigitClick(key);
      } else if (key === '.') {
        handleDigitClick('.');
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleOperatorClick(key);
      } else if (key === 'Enter' || key === '=') {
        event.preventDefault(); // Prevent form submission
        handleEqualsClick();
      } else if (key === 'Backspace') {
        handleBackspace();
      } else if (key === 'Delete' || key.toLowerCase() === 'c') {
        handleClearClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [display, equation, firstOperand, operator, waitingForSecondOperand, isResultShown]);


  const handleDigitClick = (digit: string) => {
    if (isResultShown) {
      setDisplay(digit);
      setEquation(digit);
      setIsResultShown(false);
    } else {
      if (waitingForSecondOperand) {
        setDisplay(digit);
        setWaitingForSecondOperand(false);
      } else {
        setDisplay(display === '0' ? digit : display + digit);
      }
      setEquation(prev => (prev === '0' ? digit : prev + digit));
    }
  };

  const handleOperatorClick = (nextOperator: string) => {
    const inputValue = parseFloat(display);
    
    if (isResultShown) {
        setEquation(display + ` ${nextOperator} `);
        setIsResultShown(false);
    } else {
        setEquation(prev => prev + ` ${nextOperator} `);
    }

    if (operator && !waitingForSecondOperand) {
      const result = calculate(firstOperand!, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    } else {
      setFirstOperand(inputValue);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case '+': return first + second;
      case '-': return first - second;
      case '*': return first * second;
      case '/': return first / second;
      default: return second;
    }
  };

  const handleEqualsClick = () => {
    if (operator && firstOperand !== null) {
      const inputValue = parseFloat(display);
      const result = calculate(firstOperand, inputValue, operator);
      const newHistoryEntry = `${equation} = ${result}`;
      setHistory([newHistoryEntry, ...history].slice(0, 10));
      setDisplay(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
      setEquation(String(result));
      setIsResultShown(true);
    }
  };

  const handleClearClick = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
    setEquation('');
    setIsResultShown(false);
  };

  const handlePlusMinus = () => {
    setDisplay(String(parseFloat(display) * -1));
  };
  
  const handlePercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const handleBackspace = () => {
    if (isResultShown) return; // Don't allow backspace on a result
    setDisplay(display.slice(0, -1) || '0');
    setEquation(equation.slice(0, -1));
  };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.calculatorLayout}>
        <div className={styles.phoneBezel}>
          <div className={styles.calculatorContainer}>
            <div className={styles.displayContainer}>
              <div className={styles.equationDisplay}>{equation}</div>
              <div className={styles.display}>{display}</div>
            </div>
            <div className={styles.buttonsGrid}>
              {/* All the button rows */}
              {/* Row 1 */}
              <button onClick={handleClearClick} className={styles.topOperator}>AC</button>
              <button onClick={handlePlusMinus} className={styles.topOperator}>+/-</button>
              <button onClick={handlePercent} className={styles.topOperator}>%</button>
              <button onClick={() => handleOperatorClick('/')} className={styles.operator}>÷</button>

              {/* Row 2 */}
              <button onClick={() => handleDigitClick('7')} className={styles.digit}>7</button>
              <button onClick={() => handleDigitClick('8')} className={styles.digit}>8</button>
              <button onClick={() => handleDigitClick('9')} className={styles.digit}>9</button>
              <button onClick={() => handleOperatorClick('*')} className={styles.operator}>×</button>

              {/* Row 3 */}
              <button onClick={() => handleDigitClick('4')} className={styles.digit}>4</button>
              <button onClick={() => handleDigitClick('5')} className={styles.digit}>5</button>
              <button onClick={() => handleDigitClick('6')} className={styles.digit}>6</button>
              <button onClick={() => handleOperatorClick('-')} className={styles.operator}>-</button>

              {/* Row 4 */}
              <button onClick={() => handleDigitClick('1')} className={styles.digit}>1</button>
              <button onClick={() => handleDigitClick('2')} className={styles.digit}>2</button>
              <button onClick={() => handleDigitClick('3')} className={styles.digit}>3</button>
              <button onClick={() => handleOperatorClick('+')} className={styles.operator}>+</button>

              {/* Row 5 */}
              <button onClick={() => handleDigitClick('0')} className={`${styles.digit} ${styles.zero}`}>0</button>
              <button onClick={() => handleDigitClick('00')} className={styles.digit}>00</button>
              <button onClick={() => handleDigitClick('.')} className={styles.digit}>.</button>
              <button onClick={handleEqualsClick} className={styles.operator}>=</button>
            </div>
          </div>
        </div>
        <div className={styles.historyCard}>
          <h4>Calculation History</h4>
          <div className={styles.historyContent}>
            {history.map((item, index) => <div key={index}>{item}</div>)}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CalculatorPage;