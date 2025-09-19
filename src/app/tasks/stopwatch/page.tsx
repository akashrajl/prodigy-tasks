'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './Stopwatch.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import AnalogClock from './AnalogClock';

const StopwatchPage = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastLapTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime: number) => prevTime + 10);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    lastLapTimeRef.current = 0;
  };

  const handleLap = () => {
    if (isRunning) {
      const currentLap = time - lastLapTimeRef.current;
      setLaps([currentLap, ...laps]);
      lastLapTimeRef.current = time;
    }
  };

  const formatTime = (timeInMs: number) => {
    const minutes = Math.floor(timeInMs / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((timeInMs % 60000) / 1000).toString().padStart(2, '0');
    const centiseconds = Math.floor((timeInMs % 1000) / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}.${centiseconds}`;
  };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.stopwatchLayout}>
        <motion.div
          className={styles.stopwatchContainer}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnalogClock time={time} />
          <div className={styles.timeDisplay}>{formatTime(time)}</div>
          <div className={styles.controls}>
            <button onClick={handleReset} className={`${styles.controlButton} ${styles.resetButton}`}>Reset</button>
            <button onClick={handleStartStop} className={`${styles.controlButton} ${isRunning ? styles.stopButton : styles.startButton}`}>
              {isRunning ? 'Stop' : 'Start'}
            </button>
            <button onClick={handleLap} className={`${styles.controlButton} ${styles.lapButton}`} disabled={!isRunning}>Lap</button>
          </div>
        </motion.div>

        <AnimatePresence>
          {laps.length > 0 && (
            <motion.div
              className={styles.lapsContainer}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
            >
              <h3 className={styles.lapsTitle}>Laps</h3>
              <AnimatePresence>
                {laps.map((lap: number, index: number) => (
                  <motion.div
                    key={laps.length - index}
                    className={styles.lapItem}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    layout
                  >
                    <span>Lap {laps.length - index}</span>
                    <span>{formatTime(lap)}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default StopwatchPage;