import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'grid w-full auto-rows-[22rem] grid-cols-3 gap-4',
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background = <div></div>,
  Icon,
  description,
}: {
  name: string;
  className: string;
  background?: ReactNode;
  Icon: any;
  description: string;
}) => (
  <div
    key={name}
    className={cn(
      'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl',
      'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
      'dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
      className
    )}
  >
    <div>{background}</div>
    <div className='pointer-events-none z-10 flex flex-col gap-1 p-6'>
      <Icon className='h-10 w-10 origin-left text-neutral-700' />
      <h3 className='text-xl font-medium text-neutral-700 dark:text-neutral-300'>
        {name}
      </h3>
      <p className='max-w-lg text-neutral-400'>{description}</p>
    </div>
  </div>
);

export { BentoCard, BentoGrid };
