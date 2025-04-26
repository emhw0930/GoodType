import { useState, useEffect, useCallback } from 'react';

function useTimer(duration: number = 60) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const startTimer = useCallback(() => {
    setIsActive(true);
    setIsFinished(false);
    setTimeLeft(duration);
  }, [duration]);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setIsFinished(false);
    setTimeLeft(duration);
  }, [duration]);

  const stopTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsFinished(true);
      if (interval) clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  return { timeLeft, isActive, isFinished, startTimer, resetTimer, stopTimer };
}

export default useTimer; 