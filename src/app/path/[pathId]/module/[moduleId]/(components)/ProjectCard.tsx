'use client';

import Link from 'next/link';
import { HiOutlineRocketLaunch } from 'react-icons/hi2';
import { usePathname } from 'next/navigation';

import Card from './Card';
import { IProjectActivity } from '@/db/models/Activity';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ProjectCardType = {
  projectActivity: IProjectActivity;
  skipActivity: (activityId: string) => void;
};

const ProjectCard = ({ projectActivity, skipActivity }: ProjectCardType) => {
  const pathname = usePathname();
  const { title, type, completed, _id } = projectActivity;

  return (
    <Card
      title={title}
      type={type}
      completed={completed}
      comment='Optional'
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
          href={`${pathname}/project`}
          className={cn(
            buttonVariants({
              size: 'sm',
              variant: completed ? 'secondary' : 'default',
            }),
            'min-w-[150px]'
          )}
        >
          {completed ? 'Review project' : 'Start project'}
        </Link>
      }
    />
  );
};

export default ProjectCard;
