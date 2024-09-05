import mongoose, { Document, Model, ObjectId } from 'mongoose';

export interface IExamAttempt {
  score: number;
  passed: boolean;
  time: number;
  userId: ObjectId | string;
  examId: ObjectId;

  answers: { answer: number; isCorrect: boolean; explanation?: string }[];
}

export interface IExamAttemptDocument extends IExamAttempt, Document {
  createdAt: Date;
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
        explanation: { type: String },
      },
    ],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

examAttemptSchema.index({ examId: 1 });
examAttemptSchema.index({ userId: 1, examId: 1 });

const ExamAttempt: Model<IExamAttemptDocument> =
  mongoose.models?.ExamAttempt ||
  mongoose.model('ExamAttempt', examAttemptSchema);

export default ExamAttempt;
