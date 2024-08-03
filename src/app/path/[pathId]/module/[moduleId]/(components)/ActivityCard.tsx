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

type CardType = {
  title: string;
  comment: string;
  type: string;
  icon: ReactElement;
  completed: boolean;
  menuContent: ReactNode;
};

type ActivityCardType = {
  activity: IActivity;
  moduleId: string;
  pathId: string;
};

const Card = ({
  title,
  comment,
  type,
  icon,
  menuContent,
  completed,
}: CardType) => {
  return (
    <li
      className={cn(
        'relative flex flex-col gap-6 p-4 rounded-xl shadow',
        completed ? 'bg-green-100' : 'bg-background-2'
      )}
    >
      <div className='flex items-center gap-2'>
        <div
          className={cn(
            'flex items-center justify-center size-8 bg-background border border-boreder rounded-lg',
            completed ? 'bg-green-500 border border-green-500' : null
          )}
        >
          {completed ? (
            <HiOutlineCheck
              className='size-5 text-white'
              strokeWidth={2.5}
            />
          ) : (
            <>{icon}</>
          )}
        </div>
        <p className='flex items-center justify-center h-8 px-6 bg-background border border-boreder rounded-lg text-sm capitalize'>
          {type}
        </p>
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
      <DropdownMenu>
        <DropdownMenuTrigger className='absolute top-4 right-4'>
          <Button
            size='icon'
            variant='ghost'
            className='size-8'
          >
            <HiOutlineEllipsisHorizontal className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='mr-1'>
          {menuContent}
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
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
        comment={`${time} min`}
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
          <HiOutlineBookOpen
            className='size-5'
            strokeWidth={1.5}
          />
        }
      />
    );
  }
  if (isExamActivity(activity)) {
    const { title, completed, type, difficulty, _id, taken, examId, passed } =
      activity;

    const { mutate: createExam, isPending: isPendingExam } =
      useServerActionMutation(createExamForModuleAction, {
        mutationKey: ['create-module-exam'],
        onSuccess: (examId: string) => {
          router.push(`/exam/${examId}?pathId=${pathId}&moduleId=${moduleId}`);
          toast.success('Exam was created successfully', {
            description: 'Redirecting...',
          });
        },
        onError: err => {
          console.log(err);
          toast.error('Something went wrong.', {
            description: 'We failed to create the exam. Please try again.',
          });
        },
      });

    return (
      <Card
        title={title}
        type={type}
        completed={completed}
        comment={`${
          difficulty[0].toUpperCase() + difficulty.slice(1)
        } difficulty • 30 min`}
        menuContent={
          <>
            {/* If it exist redirect, else generate exam */}
            {/* {!passed ? (
              <DropdownMenuItem asChild>
                {examId ? (
                  <Link
                    href={`/exam/${examId}?pathId=${pathId}&moduleId=${moduleId}`}
                  >
                    <HiOutlineRocketLaunch className='size-4 mr-1.5' /> Go to
                    exam
                  </Link>
                ) : (
                  <button
                    disabled={isPendingExam}
                    onClick={() => createExam({ moduleId })}
                  >
                    {!isPendingExam ? (
                      <>
                        <HiOutlineRocketLaunch className='size-4 mr-1.5' />{' '}
                        Generate exam
                      </>
                    ) : (
                      <>
                        <LuLoader2 className='size-4 animate-spin' />
                        Generating...
                      </>
                    )}
                  </button>
                )}
              </DropdownMenuItem>
            ) : null} */}
            {/* To skip (mark as complete the activity) */}
            {!completed && !passed ? (
              <DropdownMenuItem
                onClick={() =>
                  skipActivity({ pathId, moduleId, activityId: String(_id) })
                }
              >
                <HiOutlineCheckCircle className='size-4 mr-1.5' />
                Skip activity
              </DropdownMenuItem>
            ) : null}
            {/* Takes us to the exam results */}
            {taken ? (
              <DropdownMenuItem asChild>
                <Link
                  href={`/exam/${examId}/results?pathId=${pathId}&moduleId=${moduleId}`}
                >
                  <HiOutlineClipboardDocumentList className='size-4 mr-1.5' />{' '}
                  See results
                </Link>
              </DropdownMenuItem>
            ) : null}
          </>
        }
        icon={
          <HiOutlineDocumentText
            className='size-5'
            strokeWidth={1.5}
          />
        }
      />
    );
  }
  if (isInterviewActivity(activity)) {
    const { title, completed, type, taken, _id } = activity;
    return (
      <Card
        title={title}
        type={type}
        completed={completed}
        comment='Final assesment'
        menuContent={
          <>
            <>
              <DropdownMenuItem>
                <HiOutlineRocketLaunch className='size-4 mr-1.5' />{' '}
                {completed ? 'Review activity' : 'Start activity'}
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
            {taken ? (
              <DropdownMenuItem>
                <HiOutlineClipboardDocumentList className='size-4 mr-1.5' /> See
                feedback
              </DropdownMenuItem>
            ) : null}
          </>
        }
        icon={
          <HiOutlineMicrophone
            className='size-5'
            strokeWidth={1.5}
          />
        }
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
        comment='Practice • Optional'
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
          <HiOutlineWrenchScrewdriver
            className='size-5'
            strokeWidth={1.5}
          />
        }
      />
    );
  }
};

export default ActivityCard;
