import { useEffect, useState } from 'react';

export const useTimer = () => {
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { timer };
};
