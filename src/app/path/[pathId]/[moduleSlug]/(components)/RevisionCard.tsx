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

type RevisionCardType = {
  revisionActivity: IRevisionActivity;
};

const RevisionCard = ({
  revisionActivity,
}: RevisionCardType) => {
  const pathname = usePathname();
  const { title, type, completed } = revisionActivity;

  return (
    <Card
      title={title}
      type={type}
      completed={completed}
      comment='Revision • References'
      menuContent={
        <>
          <DropdownMenuItem asChild>
            <Link href={`${pathname}/revision`}>
              <HiOutlineRocketLaunch className='size-4 mr-1.5' />
              Go to references
            </Link>
          </DropdownMenuItem>
        </>
      }
      icon={
        <HiOutlineArrowTopRightOnSquare className='size-5' strokeWidth={1.5} />
      }
    />
  );
};

export default RevisionCard;
