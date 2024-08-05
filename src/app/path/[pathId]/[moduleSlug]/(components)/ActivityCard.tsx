'use client';

import {
  HiOutlineCheckCircle,
  HiOutlineRocketLaunch,
  HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2';
import { toast } from 'sonner';

import Card from './Card';
import ExamCard from './ExamCard';
import InterviewCard from './InterviewCard';
import RevisionCard from './RevisionCard';
import {
  ActivityTypeEnum,
  IActivity,
  IExamActivity,
  IInterviewActivity,
  IProjectActivity,
  IRevisionActivity,
} from '@/db/models/Activity';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useServerActionMutation } from '@/hooks/server-action-hooks';
import { skipActivityAction } from '@/actions/modules';

// Type guards
const isRevisionActivity = (
  activity: IActivity
): activity is IRevisionActivity => activity.type === ActivityTypeEnum.REVISION;

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
  const { mutate: skipActivity } = useServerActionMutation(skipActivityAction, {
    mutationKey: ['skip-activity'],
    onSuccess: () => toast.success('Activity skipped'),
    onError: () => toast.error('Failed to skip activity'),
  });

  if (isRevisionActivity(activity)) {
    return (
      <RevisionCard
        revisionActivity={activity}
        moduleId={moduleId}
        pathId={pathId}
      />
    );
  }
  if (isExamActivity(activity)) {
    return (
      <ExamCard examActivity={activity} pathId={pathId} moduleId={moduleId} />
    );
  }
  if (isInterviewActivity(activity)) {
    return (
      <InterviewCard
        interviewActivity={activity}
        pathId={pathId}
        moduleId={moduleId}
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
