import mongoose, { Document, Model, ObjectId } from 'mongoose';
import { DifficultyEnum } from '@/lib/validators';

export interface IQuestion {
  question: string;
  answer: string;
  explanation: string;
  difficulty: DifficultyEnum;
  type: 'behavioral' | 'technical' | 'analytical';
  userId: ObjectId | string;
  pinned: boolean;
}

export interface IQuestionDocument extends IQuestion, Document {
  createdAt: Date;
}

const questionSchema = new mongoose.Schema<IQuestionDocument>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    explanation: { type: String, required: true },
    difficulty: {
      type: String,
      required: true,
      enum: ['easy', 'medium', 'hard'],
    },
    type: {
      type: String,
      required: true,
      enum: ['behavioral', 'technical', 'analytical'],
    },
    pinned: { type: Boolean },
    userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

questionSchema.index({ userId: 1 });

const Question: Model<IQuestionDocument> =
  mongoose.models?.Question || mongoose.model('Question', questionSchema);

export default Question;
