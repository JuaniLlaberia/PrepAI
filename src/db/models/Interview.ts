import mongoose, { Document, Model, ObjectId } from 'mongoose';

export interface IInterview {
  jobRole: string;
  jobDescription: string;
  jobExperience: 'intership' | 'junior' | 'ssr' | 'senior' | 'lead';
  taken: boolean;
  pinned: boolean;
  userId: ObjectId;
  moduleId: ObjectId;
  pathId: ObjectId;
  questions: { _id: string; question: string; hint: string }[];
}

export interface IInterviewDocument extends IInterview, Document {
  createdAt: Date;
  updatedAt: Date;
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
    //userId for interviews created by an user
    userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
    //moduleId & pathId for interviews created inside a module
    moduleId: { type: mongoose.Schema.ObjectId, ref: 'Module' },
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
  { timestamps: true }
);

interviewSchema.index({ userId: 1 });
interviewSchema.index({ moduleId: 1 });

const Interview: Model<IInterviewDocument> =
  mongoose.models?.Interview || mongoose.model('Interview', interviewSchema);

export default Interview;
