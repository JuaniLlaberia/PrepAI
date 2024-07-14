'use server';

import InterviewAttempt from '@/db/models/InterviewAttempt';
import { authAction } from './auth';

export const createInterviewAttempt = async ({
  interviewId,
}: {
  interviewId: string;
}) => {
  const userId = await authAction();

  const { id } = await InterviewAttempt.create({
    interviewId,
    userId,
  });

  return id;
};
