import mongoose, { Document, Model, ObjectId } from 'mongoose';
import { ExperienceEnum } from '@/lib/enum';

export interface IInterview {
  jobRole: string;
  jobDescription: string;
  jobExperience: ExperienceEnum;
  taken: boolean;
  pinned: boolean;
  passed: boolean;
  userId: ObjectId;
  moduleId: ObjectId;
  activityId: ObjectId;
  pathId: ObjectId;
  questions: { _id: string; question: string; hint: string }[];
}

export interface IInterviewDocument extends IInterview, Document {
  createdAt: Date;
}

const interviewSchema = new mongoose.Schema<IInterviewDocument>(
  {
    jobRole: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    jobExperience: {
      type: String,
      enum: ['intership', 'junior', 'ssr', 'senior', 'lead'],
      required: true,
    },
    taken: {
      type: Boolean,
      default: false,
    },
    pinned: {
      type: Boolean,
    },
    passed: {
      type: Boolean,
    },
    //userId for interviews created by an user
    userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
    //moduleId & pathId for interviews created inside a module
    moduleId: { type: mongoose.Schema.ObjectId, ref: 'Module' },
    activityId: { type: mongoose.Schema.ObjectId, ref: 'Module.activities' },
    pathId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Path',
    },
    questions: [
      {
        question: { type: String, required: true },
        hint: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

interviewSchema.index({ userId: 1 });
interviewSchema.index({ moduleId: 1 });

const Interview: Model<IInterviewDocument> =
  mongoose.models?.Interview || mongoose.model('Interview', interviewSchema);

export default Interview;
