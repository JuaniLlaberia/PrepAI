import type { ReactElement, ReactNode } from 'react';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { HiOutlineCheck, HiOutlineEllipsisHorizontal } from 'react-icons/hi2';

import { Button } from '@/components/ui/button';
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type CardType = {
  title: string;
  comment: string;
  type: string;
  icon: ReactElement;
  completed: boolean;
  menuContent: ReactNode;
  actionButton?: ReactNode;
};

const Card = ({
  title,
  comment,
  icon,
  menuContent,
  completed,
  actionButton,
}: CardType) => {
  return (
    <li
      className={cn(
        'relative flex flex-col gap-6 p-4 rounded-xl border-[1px] border-b-[3.5px] border-[#ebebeb] dark:border-accent',
        completed ? 'bg-green-100' : 'bg-background-2'
      )}
    >
      <div className='flex items-center gap-2'>
        <div
          className={cn(
            'flex items-center justify-center size-10 bg-background border border-boreder rounded-lg',
            completed ? 'bg-green-500 border border-green-500' : null
          )}
        >
          {completed ? (
            <HiOutlineCheck className='size-5 text-white' strokeWidth={2.5} />
          ) : (
            <>{icon}</>
          )}
        </div>
      </div>
      <h2
        className={cn(
          'text-xl font-medium',
          completed ? 'text-muted-foreground' : 'text-primary'
        )}
      >
        {title}
      </h2>
      <p className='text-sm text-muted-foreground'>{comment}</p>
      {actionButton}
      {menuContent && (
        <DropdownMenu>
          <DropdownMenuTrigger className='absolute top-4 right-4' asChild>
            <Button
              size='icon'
              variant='ghost'
              className='size-8'
              aria-label='Activity options'
            >
              <span className='sr-only'>Activity options</span>
              <HiOutlineEllipsisHorizontal className='size-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='mr-1'>
            {menuContent}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </li>
  );
};

export default Card;
