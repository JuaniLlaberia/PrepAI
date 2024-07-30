import mongoose, { Document, Model, ObjectId } from 'mongoose';

export interface IExam {
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  passed: boolean;
  taken: boolean;
  pinned: boolean;
  userId: ObjectId;
  moduleId: ObjectId;
  pathId: ObjectId;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}

export interface IExamDocument extends IExam, Document {
  createdAt: Date;
  updatedAt: Date;
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
    pinned: { type: Boolean },
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
        question: { type: String },
        options: { type: [String] },
        correctAnswer: { type: Number },
        explanation: { type: String },
      },
    ],
  },
  { timestamps: true }
);

examSchema.index({ userId: 1 });
examSchema.index({ moduleId: 1 });

const Exam: Model<IExamDocument> =
  mongoose.models?.Exam || mongoose.model('Exam', examSchema);

export default Exam;
