import type { ReactNode } from 'react';
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
  background,
  Icon,
  description,
  small,
}: {
  name: string;
  className: string;
  background?: ReactNode;
  Icon: any;
  description: string;
  small?: boolean;
}) => (
  <div
    key={name}
    className={cn(
      'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl',
      'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.06),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
      'dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
      'hover:scale-[101%] hover:[box-shadow:0_0_0_1px_rgba(0,0,0,.06),0_2px_4px_rgba(0,0,0,.07),0_12px_24px_rgba(0,0,0,.07)] transition-all',
      className
    )}
  >
    <div className='flex flex-col py-5'>
      <div
        className={cn(
          'flex flex-col px-6',
          !small ? 'items-center lg:items-start' : 'items-center'
        )}
      >
        <div className='border border-border rounded-lg p-2 bg-background-2 z-40'>
          <Icon className='h-7 w-7 text-muted-foreground' />
        </div>
        <h3 className='text-lg font-medium mt-3'>{name}</h3>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
      <div className='flex justify-center mt-8'>{background}</div>
    </div>
  </div>
);

export { BentoCard, BentoGrid };
