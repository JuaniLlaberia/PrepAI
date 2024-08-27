import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { connectToDB } from '@/db';
import User, { IUserDocument } from '@/db/models/User';

export const findUserByKindeId = async (kindeId: string) => {
  await connectToDB();

  return await User.findOne({ kindeId }).lean();
};

export const getUserData = async (): Promise<IUserDocument> => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error('User is not logged in');

  await connectToDB();

  const userDB = await User.findOne({ kindeId: user?.id }).lean();
  if (!userDB) throw new Error('User not found');

  return userDB;
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
  await User.findByIdAndDelete(userId);
  //DELETE ALL USER DATA (INTERVIEWS, ATTEMPTS, EXAMS, PATHS, MODULES, ETC...)
};
