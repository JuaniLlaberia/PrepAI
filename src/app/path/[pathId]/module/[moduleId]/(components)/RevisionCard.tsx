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
      comment='Revision • References'
      menuContent={
        !completed ? (
          <DropdownMenuItem onClick={() => skipActivity(String(_id))}>
            <HiOutlineRocketLaunch className='size-4 mr-1.5' />
            Skip activity
          </DropdownMenuItem>
        ) : null
      }
      icon={
        <HiOutlineArrowTopRightOnSquare className='size-5' strokeWidth={1.5} />
      }
      actionButton={
        <Link
          href={`${pathname}/revision`}
          className={buttonVariants({
            size: 'sm',
            variant: completed ? 'secondary' : 'default',
          })}
        >
          {completed ? 'Review activity' : 'Go to references'}
        </Link>
      }
    />
  );
};

export default RevisionCard;
