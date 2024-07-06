import mongoose, { Document, Model, ObjectId } from 'mongoose';

export interface IInterview {
  jobRole: string;
  jobDescription: string;
  jobExperience: 'intership' | 'junior' | 'ssr' | 'senior' | 'lead';
  taken: boolean;
  pinned: boolean;
  userId: ObjectId;
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
      minlength: [4, 'Interviews role must be at least 4 characters long.'],
      maxlength: [40, 'Interviews role must be less than 40 characters long.'],
    },
    jobDescription: {
      type: String,
      required: true,
      minlength: [
        20,
        'Interviews description must be at least 20 characters long.',
      ],
      maxlength: [
        300,
        'Interviews description must be less than 300 characters long.',
      ],
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
      default: false,
    },
    userId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
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

const Interview: Model<IInterviewDocument> =
  mongoose.models?.Interview || mongoose.model('Interview', interviewSchema);

export default Interview;
