import React from 'react';
import styles from './AnalogClock.module.css';

interface AnalogClockProps {
  time: number;
}

const AnalogClock = ({ time }: AnalogClockProps) => {
  const seconds = time / 1000;
  const minutes = seconds / 60;

  const secondHandRotation = seconds * 6; // 360 degrees / 60 seconds
  const minuteHandRotation = minutes * 6; // 360 degrees / 60 minutes

  return (
    <div className={styles.clock}>
      <div className={styles.topButton}></div>
      <div className={styles.sideButton}></div>
      <div className={styles.dial}>
        {[...Array(12)].map((_, i) => (
          <div key={i} className={styles.hourMark} style={{ transform: `rotate(${i * 30}deg)` }}>
            <span>{i === 0 ? 60 : i * 5}</span>
          </div>
        ))}
        <div className={styles.center}></div>
        <div className={styles.secondHand} style={{ transform: `rotate(${secondHandRotation}deg)` }}></div>
        <div className={styles.minuteHand} style={{ transform: `rotate(${minuteHandRotation}deg)` }}></div>
      </div>
    </div>
  );
};

export default AnalogClock;