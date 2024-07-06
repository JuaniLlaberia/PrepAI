import mongoose, { Document, Model } from 'mongoose';

export interface IUser {
  kindeId: string;
  name: string;
  email: string;
}

export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUserDocument>({
  kindeId: { type: String, required: true },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (val: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      },
      message: 'Invalid email format',
    },
  },
});

userSchema.index({ kindeId: 1 });

const User: Model<IUserDocument> =
  mongoose.models?.User || mongoose.model('User', userSchema);

export default User;
