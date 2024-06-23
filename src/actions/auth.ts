import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { db } from '@/db';

export const authAction = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error('You need to log in');

  return user;
};

export const belongsToUser = async (userId: string, interviewId: string) => {
  const interview = await db.interview.findUnique({
    where: { id: interviewId },
    select: { userId: true },
  });

  if (!interview) throw new Error('Interview not found');

  if (interview?.userId !== userId)
    throw new Error('This interview does not belong to you');

  return true;
};
