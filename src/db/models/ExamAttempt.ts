import mongoose, { Document, Model, ObjectId } from 'mongoose';

export interface IExamAttempt {
  score: number;
  passed: boolean;
  time: number;
  userId: ObjectId | string;
  examId: ObjectId;

  answers: { answer: number; isCorrect: boolean }[];
}

export interface IExamAttemptDocument extends IExamAttempt, Document {
  createdAt: Date;
  updatedAt: Date;
}

const examAttemptSchema = new mongoose.Schema<IExamAttemptDocument>(
  {
    score: { type: Number },
    passed: { type: Boolean, default: false },
    time: { type: Number },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    examId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Exam',
      required: true,
    },
    answers: [
      {
        answer: { type: Number },
        isCorrect: { type: Boolean },
      },
    ],
  },
  { timestamps: true }
);

examAttemptSchema.index({ userId: 1, examId: 1 });

const ExamAttempt: Model<IExamAttemptDocument> =
  mongoose.models?.ExamAttempt ||
  mongoose.model('ExamAttempt', examAttemptSchema);

export default ExamAttempt;
