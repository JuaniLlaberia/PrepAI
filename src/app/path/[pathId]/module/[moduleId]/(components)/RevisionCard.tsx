'use client';

import Link from 'next/link';
import {
  HiOutlineArrowTopRightOnSquare,
  HiOutlineRocketLaunch,
} from 'react-icons/hi2';
import { usePathname } from 'next/navigation';

import Card from './Card';
import { IRevisionActivity } from '@/db/models/Activity';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type RevisionCardType = {
  revisionActivity: IRevisionActivity;
  skipActivity: (activityId: string) => void;
};

const RevisionCard = ({ revisionActivity, skipActivity }: RevisionCardType) => {
  const pathname = usePathname();
  const { title, type, completed, _id } = revisionActivity;

  return (
    <Card
      title={title}
      type={type}
      completed={completed}
      comment='References'
      menuContent={
        !completed ? (
          <DropdownMenuItem onClick={() => skipActivity(String(_id))}>
            <HiOutlineRocketLaunch className='size-4 mr-1.5' />
            Skip activity
          </DropdownMenuItem>
        ) : null
      }
      actionButton={
        <Link
          href={`${pathname}/revision`}
          className={cn(
            buttonVariants({
              size: 'sm',
              variant: completed ? 'secondary' : 'default',
            }),
            'min-w-[150px]'
          )}
        >
          {completed ? 'Review activity' : 'Go to references'}
        </Link>
      }
    />
  );
};

export default RevisionCard;
