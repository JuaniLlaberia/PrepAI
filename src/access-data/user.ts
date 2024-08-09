import User, { IUserDocument } from '@/db/models/User';

export const findUserByKindeId = async (kindeId: string) => {
  console.log('KINDE ID', kindeId);
  return await User.findOne({ kindeId });
};

export const createUser = async ({
  user,
}: {
  user: Partial<IUserDocument>;
}) => {
  await User.create(user);
};
