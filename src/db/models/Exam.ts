import mongoose, { Document, Model, ObjectId } from 'mongoose';

export interface IExam {
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  passed: boolean;
  taken: boolean;
  pinned: boolean;
  userId: ObjectId;
  questions: { question: string; options: string[]; correctAnswer: number }[];
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
      minlength: [4, 'Interviews role must be at least 4 characters long.'],
      maxlength: [40, 'Interviews role must be less than 40 characters long.'],
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['easy', 'medium', 'hard'],
    },
    taken: { type: Boolean, default: false },
    passed: { type: Boolean, default: false },
    pinned: { type: Boolean, default: false },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    questions: [
      {
        question: { type: String },
        options: { type: [String] },
        correctAnswer: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

examSchema.index({ userId: 1 });

const Exam: Model<IExamDocument> =
  mongoose.models?.Exam || mongoose.model('Exam', examSchema);

export default Exam;
