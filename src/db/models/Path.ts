import mongoose, { Document, Model, ObjectId } from 'mongoose';
import { ExperienceEnum } from '@/lib/enum';

export interface IPath {
  jobPosition: string;
  jobExperience: ExperienceEnum;
  topics: string;
  completed: boolean;
  pinned: boolean;
  userId: ObjectId;
  totalModules: number;
  completedModules: number;
}

export interface IPathDocument extends IPath, Document {
  createdAt: Date;
}

const pathSchema = new mongoose.Schema<IPathDocument>(
  {
    jobPosition: {
      type: String,
      required: true,
      minlength: [4, 'Interviews role must be at least 4 characters long.'],
      maxlength: [40, 'Interviews role must be less than 40 characters long.'],
    },
    jobExperience: {
      type: String,
      enum: ['intership', 'junior', 'ssr', 'senior', 'lead'],
      required: true,
    },
    topics: {
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
    completed: {
      type: Boolean,
      default: false,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    userId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    totalModules: Number,
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

pathSchema.index({ userId: 1, completed: 1 });

const Path: Model<IPathDocument> =
  mongoose.models?.Path || mongoose.model('Path', pathSchema);

export default Path;
