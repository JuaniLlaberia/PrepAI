import mongoose from 'mongoose';

import InterviewAttempt from '@/db/models/InterviewAttempt';
import Interview, { IInterviewDocument } from '@/db/models/Interview';
import { getAuthUser } from '@/actions/auth';
import { generateInterviewWithGemini } from '@/gemini/functions';

export const getUserInterviews = async ({
  sort,
  filter,
}: {
  sort: 'createdAt' | 'name';
  filter: 'all' | 'taken' | 'new';
}) => {
  const userId = await getAuthUser();

  const interviewsQuery = Interview.find({ userId });

  if (filter === 'new') interviewsQuery.where({ taken: false });
  else if (filter === 'taken') interviewsQuery.where({ taken: true });

  return await interviewsQuery
    .select('_id jobRole jobExperience taken createdAt pinned passed')
    .sort(
      sort === 'createdAt'
        ? { pinned: 'desc', createdAt: 'desc' }
        : { pinned: 'desc', jobRole: 'desc' }
    )
    .lean();
};

export const getInterviewById = async ({
  interviewId,
}: {
  interviewId: string;
}) => {
  await getAuthUser();
  return await Interview.findById(interviewId)
    .select('questions.question questions.hint')
    .lean();
};

export const createInterview = async ({
  userId,
  interview,
}: {
  userId: string;
  interview: Pick<
    IInterviewDocument,
    'jobRole' | 'jobDescription' | 'jobExperience'
  >;
}) => {
  const { jobRole, jobExperience, jobDescription } = interview;

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

  return { id };
};

export const deleteInterview = async ({
  interviewId,
}: {
  interviewId: string;
}) => {
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
};

export const updateInterview = async ({
  interviewId,
  interview,
}: {
  interviewId: string;
  interview: Partial<IInterviewDocument>;
}) => {
  await Interview.findByIdAndUpdate(interviewId, interview);
};
