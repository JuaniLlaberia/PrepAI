import { connectToDB } from '@/db';
import User, { IUserDocument } from '@/db/models/User';

export const findUserByKindeId = async (kindeId: string) => {
  await connectToDB();

  return await User.findOne({ kindeId }).lean();
};

export const createUser = async ({
  user,
}: {
  user: Partial<IUserDocument>;
}) => {
  await connectToDB();

  await User.create(user);
};

export const updateUser = async ({
  userId,
  user,
}: {
  userId: string;
  user: Partial<IUserDocument>;
}) => {
  await User.findByIdAndUpdate(userId, user);
};

export const deleteUser = async ({ userId }: { userId: string }) => {
  //DELETE USER
  //DELETE ALL USER DATA (INTERVIEWS, ATTEMPTS, EXAMS, PATHS, MODULES, ETC...)
};
