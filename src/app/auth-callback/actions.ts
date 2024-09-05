'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { createUser, findUserByKindeId } from '@/access-data/user';

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
        name:
          user.given_name || user.family_name
            ? `${user.given_name} ${user.family_name}`
            : undefined,
        profileImg: user.picture || undefined,
      },
    });
  }

  return true;
};
