'use server';

import User from '@/db/models/User';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export const authenticateUser = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.email || !user.id) throw new Error('Failed to authenticate');

  const userDB = await User.findById(user.id);

  if (!userDB) {
    await User.create({
      _id: user.id,
      email: user.email,
      name: `${user.given_name} ${user.family_name}` ?? '',
    });
  }

  return true;
};
