// Timer.tsx
import React, { useState, useEffect } from "react";

interface TimerProps {
  onFinish: () => void;
  onTimeChange?: (newTime: number, revealProgress: number) => void;
}

const Timer: React.FC<TimerProps> = ({ onFinish, onTimeChange }) => {
  const [time, setTime] = useState(90);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime - 1;
        const revealProgress = 1 - newTime / 90;

        onTimeChange && onTimeChange(newTime, revealProgress);
        if (newTime === 0) {
          clearInterval(timerId);
          onFinish();
        }
        return newTime;
      });
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [onFinish, onTimeChange]);

  return <div>{time}</div>;
};
export default Timer;
