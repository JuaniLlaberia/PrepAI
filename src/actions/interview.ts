'use server';

import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';

import InterviewAttempt from '@/db/models/InterviewAttempt';
import Interview, { IInterviewDocument } from '@/db/models/Interview';
import { authAction, interviewBelongsToUser } from './auth';
import { generateInterviewWithGemini } from '@/gemini/functions';

export const getUserInterviews = async ({
  sort,
  filter,
}: {
  sort: 'createdAt' | 'name';
  filter: 'all' | 'taken' | 'new';
}) => {
  const userId = await authAction();

  const interviewsQuery = Interview.find({ userId });

  if (filter === 'new') interviewsQuery.where({ taken: false });
  else if (filter === 'taken') interviewsQuery.where({ taken: true });

  return await interviewsQuery
    .select('_id jobRole jobExperience taken createdAt pinned')
    .sort(
      sort === 'createdAt'
        ? { pinned: 'desc', createdAt: 'desc' }
        : { pinned: 'desc', jobRole: 'desc' }
    );
};

export const getInterviewById = async ({
  interviewId,
}: {
  interviewId: string;
}) => {
  await authAction();
  return await Interview.findById(interviewId)
    .select('questions.question questions.hint')
    .lean();
};

export const createInterview = async ({
  data,
}: {
  data: Partial<IInterviewDocument>;
}) => {
  const userId = await authAction();

  const { jobRole, jobExperience, jobDescription } = data;
  if (!jobRole || !jobExperience || !jobDescription)
    throw new Error('Missing required data');

  const questions = await generateInterviewWithGemini({
    jobRole,
    jobDescription,
    jobExperience,
  });

  const { id } = await Interview.create({
    jobRole,
    jobExperience,
    jobDescription,
    pinned: false,
    userId,
    questions,
  });

  revalidatePath('/dashboard/interviews');

  return id;
};

export const deleteInterview = async ({
  interviewId,
}: {
  interviewId: string;
}) => {
  const userId = await authAction();
  await interviewBelongsToUser(userId, interviewId);

  const mongoSession = await mongoose.startSession();
  mongoSession.startTransaction();

  try {
    await Promise.all([
      Interview.findByIdAndDelete(interviewId),
      InterviewAttempt.deleteMany({ interviewId }),
    ]);
  } catch (err) {
    await mongoSession.abortTransaction();
  } finally {
    mongoSession.endSession();
  }

  revalidatePath('/dashboard/interviews');
};

export const updateInterview = async ({
  interviewId,
  data,
}: {
  interviewId: string;
  data: Partial<IInterviewDocument>;
}) => {
  const userId = await authAction();
  await interviewBelongsToUser(userId, interviewId);

  await Interview.findByIdAndUpdate(interviewId, data);

  revalidatePath('/dashboard/interviews');
};
