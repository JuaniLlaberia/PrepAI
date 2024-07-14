import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import Interview from '@/db/models/Interview';
import User from '@/db/models/User';
import Exam from '@/db/models/Exam';
import InterviewAttempt from '@/db/models/InterviewAttempt';
import { connectToDB } from '@/db';

export const authAction = async (): Promise<string> => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error('You need to log in');

  await connectToDB();
  const userDB = await User.findOne({ kindeId: user.id }).select('_id');

  if (!userDB) throw new Error('User not found.');

  return String(userDB._id);
};

export const interviewBelongsToUser = async (
  userId: string,
  interviewId: string
) => {
  const interview = await Interview.findById(interviewId).select('_id userId');

  if (!interview) throw new Error('Interview not found');

  if (String(interview?.userId) !== userId)
    throw new Error('This interview does not belong to you');

  return true;
};

export const interviewAttemptBelongsToUser = async (
  userId: string,
  interviewAttemptId: string
) => {
  const attempt = await InterviewAttempt.findById(interviewAttemptId).select(
    '_id userId'
  );

  if (!attempt) throw new Error('Attempt not found');

  if (String(attempt?.userId) !== userId)
    throw new Error('This attempt does not belong to you');

  return true;
};

export const examBelongsToUser = async (userId: string, examId: string) => {
  const exam = await Exam.findById(examId).select('_id userId');

  if (!exam) throw new Error('Interview not found');

  if (String(exam?.userId) !== userId)
    throw new Error('This exam does not belong to you');

  return true;
};
