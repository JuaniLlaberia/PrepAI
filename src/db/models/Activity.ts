import mongoose, { ObjectId } from 'mongoose';
import { DifficultyEnum } from '@/lib/validators';

export enum ActivityTypeEnum {
  READING = 'reading',
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

export interface IReadingActivity extends IActivity {
  type: ActivityTypeEnum.READING;
  time: number;
}

export interface IExamActivity extends IActivity {
  type: ActivityTypeEnum.EXAM;
  difficulty: DifficultyEnum;
  examId: string | ObjectId | undefined;
  taken: boolean;
  passed: boolean;
}

export interface IProjectActivity extends IActivity {
  type: ActivityTypeEnum.PROJECT;
}

export interface IInterviewActivity extends IActivity {
  type: ActivityTypeEnum.INTERVIEW;
  interviewId: string | ObjectId | undefined;
  taken: boolean;
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

const readingActivitySchema = new mongoose.Schema<IReadingActivity>(
  { time: Number },
  baseOptions
);

const examActivitySchema = new mongoose.Schema<IExamActivity>(
  {
    difficulty: {
      type: String,
      enum: Object.values(DifficultyEnum),
    },
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
    taken: { type: Boolean, default: false },
    passed: { type: Boolean, default: false },
  },
  baseOptions
);

const projectActivitySchema = new mongoose.Schema<IProjectActivity>(
  {},
  baseOptions
);

const interviewActivitySchema = new mongoose.Schema<IInterviewActivity>(
  {
    interviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview' },
    taken: { type: Boolean, default: false },
    passed: { type: Boolean, default: false },
  },
  baseOptions
);

export {
  activitySchema,
  readingActivitySchema,
  examActivitySchema,
  projectActivitySchema,
  interviewActivitySchema,
};
