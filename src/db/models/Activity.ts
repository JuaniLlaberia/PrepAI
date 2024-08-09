import mongoose, { ObjectId } from 'mongoose';
import { DifficultyEnum, ExamTypeEnum } from '@/lib/validators';

export enum ActivityTypeEnum {
  REVISION = 'revision',
  EXAM = 'exam',
  PROJECT = 'project',
  INTERVIEW = 'interview',
}

export interface IActivity {
  _id: string | ObjectId;
  title: string;
  type: ActivityTypeEnum;
  completed: boolean;
}

export interface IRevisionActivity extends IActivity {
  type: ActivityTypeEnum.REVISION;
  description: string;
  references: { label: string; link: string }[];
}

export interface IExamActivity extends IActivity {
  type: ActivityTypeEnum.EXAM;
  examType: ExamTypeEnum;
  difficulty: DifficultyEnum;
  examId: string | ObjectId | undefined;
  passed: boolean;
}

export interface IProjectActivity extends IActivity {
  type: ActivityTypeEnum.PROJECT;
  content: string;
  steps: string[];
  references: { label: string; link: string }[];
}

export interface IInterviewActivity extends IActivity {
  type: ActivityTypeEnum.INTERVIEW;
  interviewId: string | ObjectId | undefined;
  passed: boolean;
}

const baseOptions = {
  discriminatorKey: 'type',
  // _id: false,
};

const activitySchema = new mongoose.Schema<IActivity>(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: Object.values(ActivityTypeEnum),
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  baseOptions
);

const revisionActivitySchema = new mongoose.Schema<IRevisionActivity>(
  {
    description: String,
    references: [{ label: String, link: String }],
  },
  baseOptions
);

const examActivitySchema = new mongoose.Schema<IExamActivity>(
  {
    difficulty: {
      type: String,
      enum: Object.values(DifficultyEnum),
    },
    examType: {
      type: String,
      enum: Object.values(ExamTypeEnum),
    },
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
    passed: { type: Boolean, default: false },
  },
  baseOptions
);

const projectActivitySchema = new mongoose.Schema<IProjectActivity>(
  {
    content: String,
    steps: [String],
    references: [{ label: String, link: String }],
  },
  baseOptions
);

const interviewActivitySchema = new mongoose.Schema<IInterviewActivity>(
  {
    interviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview' },
    passed: { type: Boolean, default: false },
  },
  baseOptions
);

export {
  activitySchema,
  examActivitySchema,
  revisionActivitySchema,
  projectActivitySchema,
  interviewActivitySchema,
};
