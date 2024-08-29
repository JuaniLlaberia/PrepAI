'use client';

import { toast } from 'sonner';

import ExamCard from './ExamCard';
import InterviewCard from './InterviewCard';
import RevisionCard from './RevisionCard';
import ProjectCard from './ProjectCard';
import {
  IActivity,
  IExamActivity,
  IInterviewActivity,
  IProjectActivity,
  IRevisionActivity,
} from '@/db/models/Activity';
import { useServerActionMutation } from '@/hooks/server-action-hooks';
import { skipActivityAction } from '@/actions/modules';
import { ActivityTypeEnum } from '@/lib/enum';

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
  const { mutate } = useServerActionMutation(skipActivityAction, {
    mutationKey: ['skip-activity'],
    onSuccess: () => toast.success('Activity skipped'),
    onError: () => toast.error('Fail to skip activity'),
  });

  const skipActivity = (activityId: string) =>
    mutate({ moduleId, pathId, activityId });

  if (isRevisionActivity(activity)) {
    return (
      <RevisionCard skipActivity={skipActivity} revisionActivity={activity} />
    );
  }
  if (isExamActivity(activity)) {
    return (
      <ExamCard
        skipActivity={skipActivity}
        examActivity={activity}
        pathId={pathId}
        moduleId={moduleId}
      />
    );
  }
  if (isInterviewActivity(activity)) {
    return (
      <InterviewCard
        skipActivity={skipActivity}
        interviewActivity={activity}
        pathId={pathId}
        moduleId={moduleId}
      />
    );
  }
  if (isProjectActivity(activity)) {
    return (
      <ProjectCard skipActivity={skipActivity} projectActivity={activity} />
    );
  }
};

export default ActivityCard;
