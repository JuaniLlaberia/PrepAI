'use server';

import { db } from '@/db';
import { authAction, belongsToUser } from './auth';

export const createInterviewAttempt = async ({
  interviewId,
}: {
  interviewId: string;
}) => {
  const user = await authAction();

  await belongsToUser(user.id, interviewId);

  const attempt = await db.interviewAttempt.create({
    data: {
      interviewId,
    },
  });

  return attempt.id;
};
