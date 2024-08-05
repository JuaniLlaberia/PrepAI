'use client';

import Link from 'next/link';
import {
  HiOutlineRocketLaunch,
  HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2';
import { usePathname } from 'next/navigation';

import Card from './Card';
import { IProjectActivity } from '@/db/models/Activity';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

type ProjectCardType = {
  projectActivity: IProjectActivity;
};

const ProjectCard = ({ projectActivity }: ProjectCardType) => {
  const pathname = usePathname();
  const { title, type, completed } = projectActivity;

  return (
    <Card
      title={title}
      type={type}
      completed={completed}
      comment='Project • Optional'
      menuContent={
        <>
          <DropdownMenuItem asChild>
            <Link href={`${pathname}/project`}>
              <HiOutlineRocketLaunch className='size-4 mr-1.5' />
              Start project
            </Link>
          </DropdownMenuItem>
        </>
      }
      icon={<HiOutlineWrenchScrewdriver className='size-5' strokeWidth={1.5} />}
    />
  );
};

export default ProjectCard;
