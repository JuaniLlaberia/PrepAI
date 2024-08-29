import Link from 'next/link';
import {
  HiOutlineCalendarDays,
  HiOutlineBriefcase,
  HiOutlineTag,
} from 'react-icons/hi2';
import type { ReactNode } from 'react';

import Badge from '@/components/ui/badge';
import AnimatedProgress from '@/components/AnimatedProgress';
import { formatDate } from '@/lib/helpers';
import { Separator } from '@/components/ui/separator';

type DashboardCardType = {
  title: string;
  level: string;
  pinned: boolean;
  createdAt: Date;
  link: string;
  type?: string;
  completedModules?: number;
  totalModules?: number;
  dialog?: ReactNode;
  customBadges?: ReactNode;
};

const DashboardCard = ({
  title,
  level,
  createdAt,
  pinned,
  type,
  link,
  dialog,
  customBadges,
  completedModules,
  totalModules,
}: DashboardCardType) => {
  return (
    <li className='relative p-4 bg-background rounded-xl border-[1px] border-b-[3.5px] border-[#ebebeb] dark:border-accent dark:bg-background-2 hover:border-[#cdcdcd] dark:hover:border-[#474747] transition-colors'>
      <Link href={link} className='flex flex-col gap-4'>
        <h3 className='text-xl font-medium pr-3 line-clamp-3'>{title}</h3>
        <div className='flex items-center gap-2'>
          {customBadges}
          {pinned ? <Badge text='Pinned' color='blue' /> : null}
        </div>
        {totalModules ? (
          <div className='flex flex-col'>
            <div className='flex justify-between items-center text-sm px-1 mb-1'>
              <p>
                {Math.round((completedModules! / totalModules) * 100)} %
                completed
              </p>
              <p>
                {completedModules}/{totalModules} stages
              </p>
            </div>
            <AnimatedProgress
              value={(completedModules! / totalModules) * 100}
              className='h-4'
            />
          </div>
        ) : null}

        <div className='flex flex-col gap-1.5 mt-2.5'>
          <p className='flex items-center justify-between text-start'>
            <span>
              <span className='capitalize'>{level}</span> level
            </span>
            <span>
              <HiOutlineBriefcase className='size-5 text-muted-foreground' />
            </span>
          </p>
          <Separator />
          {type ? (
            <>
              <p className='flex items-center justify-between text-start'>
                <span>{type[0].toLocaleUpperCase() + type.slice(1)}</span>
                <span>
                  <HiOutlineTag className='size-5 text-muted-foreground' />
                </span>
              </p>
              <Separator />
            </>
          ) : null}
          <p className='flex items-center justify-between text-start'>
            <span>{formatDate(createdAt)}</span>
            <span>
              <HiOutlineCalendarDays className='size-5 text-muted-foreground' />
            </span>
          </p>
        </div>
      </Link>
      {dialog}
    </li>
  );
};

export default DashboardCard;
