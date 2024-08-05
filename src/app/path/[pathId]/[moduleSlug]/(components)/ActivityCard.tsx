import ExamCard from './ExamCard';
import InterviewCard from './InterviewCard';
import RevisionCard from './RevisionCard';
import ProjectCard from './ProjectCard';
import {
  ActivityTypeEnum,
  IActivity,
  IExamActivity,
  IInterviewActivity,
  IProjectActivity,
  IRevisionActivity,
} from '@/db/models/Activity';

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
  if (isRevisionActivity(activity)) {
    return <RevisionCard revisionActivity={activity} />;
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
    return <ProjectCard projectActivity={activity} />;
  }
};

export default ActivityCard;
