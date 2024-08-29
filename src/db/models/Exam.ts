import mongoose, { Document, Model, ObjectId } from 'mongoose';
import { DifficultyEnum, ExamTypeEnum } from '@/lib/validators';

export interface IExam {
  subject: string;
  difficulty: DifficultyEnum;
  examType: ExamTypeEnum;
  passed: boolean;
  taken: boolean;
  pinned: boolean;
  userId: ObjectId | string;
  moduleId: ObjectId;
  pathId: ObjectId;
  activityId: ObjectId;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

export interface IExamDocument extends IExam, Document {
  createdAt: Date;
}

const examSchema = new mongoose.Schema<IExamDocument>(
  {
    subject: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['easy', 'medium', 'hard'],
    },
    taken: { type: Boolean, default: false },
    passed: { type: Boolean, default: false },
    examType: {
      type: String,
      required: true,
      enum: ['multiple-choice', 'true-false'],
    },
    pinned: { type: Boolean },
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
        question: { type: String },
        options: { type: [String] },
        correctAnswer: { type: Number },
      },
    ],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

examSchema.index({ userId: 1 });
examSchema.index({ moduleId: 1 });

const Exam: Model<IExamDocument> =
  mongoose.models?.Exam || mongoose.model('Exam', examSchema);

export default Exam;
