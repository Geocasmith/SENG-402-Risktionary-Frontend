import React, { useState, useEffect } from "react";

interface TimerProps {
  onFinish: () => void;
}

const Timer: React.FC<TimerProps> = ({ onFinish }) => {
  const [time, setTime] = useState(60);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timerId);
          onFinish();
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [onFinish]);

  return <div>{time}</div>;
};

export default Timer;
