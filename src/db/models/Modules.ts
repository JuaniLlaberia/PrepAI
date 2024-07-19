import mongoose, { Document, Model, ObjectId } from 'mongoose';

export interface IModule {
  title: string;
  description: string;
  topics: { label: string; link: string }[];
  inProgress: boolean;
  pathId: ObjectId;
  exam: { examId: ObjectId; passed: boolean };
  interview: { interviewId: ObjectId; passed: boolean };

  // examId: ObjectId;
  // interviewId: ObjectId;
}

export interface IModuleDocument extends IModule, Document {
  createdAt: Date;
  updatedAt: Date;
}

const moduleSchema = new mongoose.Schema<IModuleDocument>(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    topics: [
      {
        label: String,
        link: String,
      },
    ],
    inProgress: { type: Boolean, default: false },
    pathId: { type: mongoose.Schema.ObjectId, ref: 'Path' },
    exam: {
      examId: { type: mongoose.Schema.ObjectId, ref: 'Exam' },
      passed: Boolean,
    },
    interview: {
      interviewId: { type: mongoose.Schema.ObjectId, ref: 'Interview' },
      passed: Boolean,
    },
    // examId: { type: mongoose.Schema.ObjectId, ref: 'Exam' },
    // interviewId: { type: mongoose.Schema.ObjectId, ref: 'Interview' },
  },
  { timestamps: true }
);

moduleSchema.index({ pathId: 1 });

const Module: Model<IModuleDocument> =
  mongoose.models?.Module || mongoose.model('Module', moduleSchema);

export default Module;
