'use client';

import { useEffect, useState } from 'react';
import AnimatedCircularProgressBar from '../ui/circular-progress';

export function FeatureScoreBar() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const handleIncrement = (prev: number) => {
      if (prev === 100) {
        return 0;
      }
      return prev + 10;
    };
    setValue(handleIncrement);
    const interval = setInterval(() => setValue(handleIncrement), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatedCircularProgressBar
      className='transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105'
      max={100}
      min={0}
      value={value}
      gaugePrimaryColor='#8b5cf6'
      gaugeSecondaryColor='rgba(0, 0, 0, 0.1)'
    />
  );
}
