'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { db } from '@/db';

export const authenticateUser = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.email || !user.id) throw new Error('Failed to authenticate');

  const userDB = await db.user.findUnique({ where: { id: user.id } });

  if (!userDB) {
    await db.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: `${user.given_name} ${user.family_name}` ?? '',
      },
    });
  }

  return true;
};
