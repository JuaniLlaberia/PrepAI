import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

import User from '@/db/models/User';
import { connectToDB } from '@/db';

export const getAuthUser = async (): Promise<string> => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    console.log('You need to log in.');
    redirect('/login');
  }

  await connectToDB();
  const userDB = await User.findOne({ kindeId: user.id }).select('_id');

  if (!userDB) throw new Error('User not found.');

  return String(userDB._id);
};
