import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const CountdownTimer: React.FC<{ seconds: number, onTimeOut: () => void }> = ({ seconds, onTimeOut }) => (
  <CountdownCircleTimer
    isPlaying
    duration={seconds}
    colors={['#004777', '#F7B801', '#A30000']}
    colorsTime={[seconds * 0.33, seconds * 0.66, 0]}
    onComplete={() => { 
      onTimeOut();
      return { shouldRepeat: false };
    }}
    size={70} 
  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>
);

export default CountdownTimer;
