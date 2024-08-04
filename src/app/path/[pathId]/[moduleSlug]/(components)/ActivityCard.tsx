'use client';

import type { ReactElement, ReactNode } from 'react';
import {
  HiOutlineBookOpen,
  HiOutlineCheck,
  HiOutlineCheckCircle,
  HiOutlineClipboardDocumentList,
  HiOutlineDocumentText,
  HiOutlineEllipsisHorizontal,
  HiOutlineMicrophone,
  HiOutlineRocketLaunch,
  HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import {
  ActivityTypeEnum,
  IActivity,
  IExamActivity,
  IInterviewActivity,
  IProjectActivity,
  IReadingActivity,
} from '@/db/models/Activity';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useServerActionMutation } from '@/hooks/server-action-hooks';
import {
  createExamForModuleAction,
  skipActivityAction,
} from '@/actions/modules';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LuLoader2 } from 'react-icons/lu';
import Card from './Card';
import ExamCard from './ExamCard';

// Type guards
const isReadingActivity = (activity: IActivity): activity is IReadingActivity =>
  activity.type === ActivityTypeEnum.READING;

const isExamActivity = (activity: IActivity): activity is IExamActivity =>
  activity.type === ActivityTypeEnum.EXAM;

const isProjectActivity = (activity: IActivity): activity is IProjectActivity =>
  activity.type === ActivityTypeEnum.PROJECT;

const isInterviewActivity = (
  activity: IActivity
): activity is IInterviewActivity =>
  activity.type === ActivityTypeEnum.INTERVIEW;

type ActivityCardType = {
  activity: IActivity;
  moduleId: string;
  pathId: string;
};

const ActivityCard = ({ activity, moduleId, pathId }: ActivityCardType) => {
  const router = useRouter();
  const { mutate: skipActivity } = useServerActionMutation(skipActivityAction, {
    mutationKey: ['skip-activity'],
    onSuccess: () => toast.success('Activity skipped'),
    onError: () => toast.error('Failed to skip activity'),
  });

  if (isReadingActivity(activity)) {
    const { title, completed, type, time, _id } = activity;
    return (
      <Card
        title={title}
        type={type}
        completed={completed}
        comment={`Reading • ${time} min`}
        menuContent={
          <>
            <DropdownMenuItem asChild>
              <Link href=''>
                <HiOutlineRocketLaunch className='size-4 mr-1.5' />{' '}
                {completed ? 'Review activity' : 'Start activity'}
              </Link>
            </DropdownMenuItem>
            {!completed ? (
              <DropdownMenuItem
                onClick={() =>
                  skipActivity({ pathId, moduleId, activityId: String(_id) })
                }
              >
                <HiOutlineCheckCircle className='size-4 mr-1.5' />
                Skip activity
              </DropdownMenuItem>
            ) : null}
          </>
        }
        icon={<HiOutlineBookOpen className='size-5' strokeWidth={1.5} />}
      />
    );
  }
  if (isExamActivity(activity)) {
    return (
      <ExamCard examActivity={activity} pathId={pathId} moduleId={moduleId} />
    );
  }
  if (isInterviewActivity(activity)) {
    const { title, completed, type, _id } = activity;
    return (
      <Card
        title={title}
        type={type}
        completed={completed}
        comment='Interview • Final assesment'
        menuContent={
          <>
            <>
              <DropdownMenuItem>
                <HiOutlineRocketLaunch className='size-4 mr-1.5' />{' '}
                {completed ? '• Review activity' : 'Start activity'}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  skipActivity({ pathId, moduleId, activityId: String(_id) })
                }
              >
                <HiOutlineCheckCircle className='size-4 mr-1.5' />
                Skip activity
              </DropdownMenuItem>
            </>
            {/* {taken ? (
              <DropdownMenuItem>
                <HiOutlineClipboardDocumentList className='size-4 mr-1.5' /> See
                feedback
              </DropdownMenuItem>
            ) : null} */}
          </>
        }
        icon={<HiOutlineMicrophone className='size-5' strokeWidth={1.5} />}
      />
    );
  }
  if (isProjectActivity(activity)) {
    const { title, completed, type, _id } = activity;
    return (
      <Card
        title={title}
        type={type}
        completed={completed}
        comment='Project • Optional'
        menuContent={
          <>
            <DropdownMenuItem>
              <HiOutlineRocketLaunch className='size-4 mr-1.5' />{' '}
              {completed ? 'Review activity' : 'Start activity'}
            </DropdownMenuItem>
            {!completed ? (
              <DropdownMenuItem
                onClick={() =>
                  skipActivity({ pathId, moduleId, activityId: String(_id) })
                }
              >
                <HiOutlineCheckCircle className='size-4 mr-1.5' />
                Skip activity
              </DropdownMenuItem>
            ) : null}
          </>
        }
        icon={
          <HiOutlineWrenchScrewdriver className='size-5' strokeWidth={1.5} />
        }
      />
    );
  }
};

export default ActivityCard;
