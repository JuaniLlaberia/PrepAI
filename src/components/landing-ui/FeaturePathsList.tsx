'use client';

import AnimatedProgress from '@/components/AnimatedProgress';

import { cn } from '@/lib/utils';
import { AnimatedList } from '../ui/animated-list';
import Badge from '../ui/badge';
import { Progress } from '../ui/progress';

interface Item {
  name: string;
  level: string;
  inProgress: boolean;
  score: number;
}

let paths: Item[] = [
  {
    name: 'Front End Developer',
    level: 'Junior',
    inProgress: true,
    score: 3,
  },
  {
    name: 'Data Scientist',
    level: 'Senior',
    inProgress: false,
    score: 10,
  },
  {
    name: 'Marketing intern',
    level: 'Intership',
    inProgress: true,
    score: 7,
  },
  {
    name: 'Project coordinator',
    level: 'Ssr',
    inProgress: true,
    score: 1,
  },
];

paths = Array.from({ length: 10 }, () => paths).flat();

const Path = ({ name, inProgress, level, score }: Item) => {
  return (
    <figure
      className={cn(
        'relative mx-auto min-h-fit w-full max-w-[450px] cursor-pointer overflow-hidden rounded-2xl p-4',
        'transition-all duration-200 ease-in-out hover:scale-[103%]',
        'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
        'transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]'
      )}
    >
      <div className='flex flex-col items-start gap-3'>
        <div className='flex items-center gap-2'>
          <Badge text={`${level} level`} color='purple' />
          {inProgress ? (
            <Badge text='In progress' color='orange' />
          ) : (
            <Badge text='Completed' color='green' />
          )}
        </div>
        <div className='flex flex-col overflow-hidden w-full'>
          <figcaption className='flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white '>
            <span className='text-sm sm:text-lg'>{name}</span>
          </figcaption>
          <div className='flex flex-col mt-6 w-full'>
            <div className='flex justify-between items-center text-sm px-1 mb-1'>
              <p>{Math.round((score / 10) * 100)} % completed</p>
              <p>
                {score}/{10} stages
              </p>
            </div>
            <Progress value={(score / 10) * 100} className='h-4' />
          </div>
        </div>
      </div>
    </figure>
  );
};

export function FeaturePathsList({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative flex h-[500px] w-full flex-col p-6 overflow-hidden rounded-lg border bg-background md:shadow-xl',
        className
      )}
    >
      <AnimatedList>
        {paths.map((item, idx) => (
          <Path {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
