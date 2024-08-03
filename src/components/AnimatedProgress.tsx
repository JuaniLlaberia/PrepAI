'use client';

import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const AnimatedProgress = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 250);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <Progress
      value={progress}
      className={cn('h-3', className)}
    />
  );
};

export default AnimatedProgress;
