'use server';

import { createUser, findUserByKindeId } from '@/access-data/user';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export const authenticateUser = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.email || !user.id) throw new Error('Failed to authenticate');

  const userDB = await findUserByKindeId(user.id);

  if (!userDB) {
    await createUser({
      user: {
        kindeId: user.id,
        email: user.email,
        name: `${user.given_name} ${user.family_name}` ?? '',
      },
    });
  }

  return true;
};
