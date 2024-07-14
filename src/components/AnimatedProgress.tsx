'use client';

import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

const AnimatedProgress = ({ value }: { value: number }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 250);
    return () => clearTimeout(timer);
  }, [value]);

  return <Progress value={progress} className='h-3' />;
};

export default AnimatedProgress;
