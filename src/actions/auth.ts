import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export const authAction = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error('You need to log in');

  return user;
};
