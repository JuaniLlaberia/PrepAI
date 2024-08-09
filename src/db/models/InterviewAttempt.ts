import mongoose, { Document, Model, ObjectId } from 'mongoose';

export interface IInterviewAttempt {
  speechAnalysis?: string;
  interviewId: ObjectId;
  userId: ObjectId;
  score: number;
  passed: boolean;
  answers: {
    _id: ObjectId;
    question: string;
    userResponse: string;
    feedback: string;
    score: number;
  }[];
}

export interface IInterviewAttemptDocument extends IInterviewAttempt, Document {
  createdAt: Date;
  updatedAt: Date;
}

const interviewAttemptSchema = new mongoose.Schema<IInterviewAttemptDocument>(
  {
    speechAnalysis: {
      type: String,
    },
    interviewId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Interview',
      required: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    answers: [
      {
        question: { type: String, required: true },
        userResponse: { type: String, required: true },
        feedback: { type: String, required: true },
        score: { type: Number, required: true },
      },
    ],
    score: Number,
    passed: Boolean,
  },
  { timestamps: true }
);

interviewAttemptSchema.index({ interviewId: 1 });
interviewAttemptSchema.index({ userId: 1, interviewId: 1 });

const InterviewAttempt: Model<IInterviewAttemptDocument> =
  mongoose.models?.InterviewAttempt ||
  mongoose.model('InterviewAttempt', interviewAttemptSchema);

export default InterviewAttempt;
