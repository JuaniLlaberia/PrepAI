import type { ReactNode } from 'react';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import {
  HiOutlineBookOpen,
  HiOutlineEllipsisHorizontal,
} from 'react-icons/hi2';
import { TbProgress, TbProgressCheck } from 'react-icons/tb';

import Badge from '@/components/ui/badge';
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
  completed: boolean;
  menuContent: ReactNode;
  actionButton?: ReactNode;
};

const Card = ({
  title,
  comment,
  menuContent,
  type,
  completed,
  actionButton,
}: CardType) => {
  return (
    <li
      className={cn(
        'relative flex flex-col gap-6 p-4 rounded-xl border-[1px] border-b-[3.5px] border-[#ebebeb] dark:border-accent',
        completed ? 'bg-green-100 border-green-200' : 'bg-background-2'
      )}
    >
      <h2 className='text-lg font-medium'>{title}</h2>
      <ul
        className={cn(
          'flex flex-col gap-1 text-sm',
          completed ? 'text-green-500' : 'text-muted-foreground'
        )}
      >
        <li className='[&_span]:flex [&_span]:items-center [&_span]:gap-1.5 '>
          {completed ? (
            <span>
              <TbProgressCheck className='size-4' />
              Completed
            </span>
          ) : (
            <span>
              <TbProgress className='size-4' /> In progress
            </span>
          )}
        </li>
        <li className='flex items-center gap-1.5'>
          <HiOutlineBookOpen className='size-4' />
          {comment}
        </li>
      </ul>
      <div className='flex items-center justify-between'>
        <Badge text={type} color='gray' />
        {actionButton}
      </div>
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
