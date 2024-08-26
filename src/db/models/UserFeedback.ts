import mongoose, { Document, Model } from 'mongoose';

export interface IUserFeedback {
  email: string;
  feedback: string;
}

export interface IUserFeedbackDocument extends IUserFeedback, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userFeedbackSchema = new mongoose.Schema<IUserFeedbackDocument>({
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (val: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      },
      message: 'Invalid email format',
    },
  },
  feedback: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 300,
  },
});

userFeedbackSchema.index({ kindeId: 1 });

const UserFeedback: Model<IUserFeedbackDocument> =
  mongoose.models?.UserFeedback ||
  mongoose.model('UserFeedback', userFeedbackSchema);

export default UserFeedback;
