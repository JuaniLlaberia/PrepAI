import mongoose, { Document, Model, ObjectId } from 'mongoose';
import {
  activitySchema,
  examActivitySchema,
  IActivity,
  interviewActivitySchema,
  projectActivitySchema,
  revisionActivitySchema,
} from './Activity';

export interface IModule {
  title: string;
  description: string;
  subject: string;
  slug: string;
  inProgress: boolean;
  completed: boolean;
  pathId: ObjectId;
  activities: IActivity[];
  completedActivities: number;
}

export interface IModuleDocument extends IModule, Document {
  createdAt: Date;
  updatedAt: Date;
}

const moduleSchema = new mongoose.Schema<IModuleDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    slug: { type: String, required: true },
    inProgress: {
      type: Boolean,
      default: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    pathId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Path',
      required: true,
    },
    activities: [activitySchema],
    completedActivities: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

moduleSchema.index({ pathId: 1 });
moduleSchema.index({ pathId: 1, slug: 1 });

// Create model
const Module: Model<IModuleDocument> =
  mongoose.models?.Module || mongoose.model('Module', moduleSchema);

// Activities discriminators
const activitiesPath = moduleSchema.path(
  'activities'
) as mongoose.Schema.Types.DocumentArray;
activitiesPath.discriminator('revision', revisionActivitySchema);
activitiesPath.discriminator('exam', examActivitySchema);
activitiesPath.discriminator('project', projectActivitySchema);
activitiesPath.discriminator('interview', interviewActivitySchema);

export default Module;
