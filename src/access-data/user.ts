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
