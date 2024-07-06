'use server';

import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';

import Interview, { IInterviewDocument } from '@/db/models/Interview';
import { model } from '@/gemini/index';
import { authAction, interviewBelongsToUser } from './auth';
import InterviewAttempt from '@/db/models/InterviewAttempt';

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

  //Create questions using gemini model
  const prompt = `Generate job interview questions for the role of ${jobRole} with a
    ${jobExperience} level. The job description and content is: "${jobDescription}".
    For each question provide the question and a hint (short text to help the
    user understand the question) in this json schema format: {questions: [{question, hint}]}. Based on
    the experience level generate between 4-6 questions.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const jsonData = response.text();

  const questions: { question: string; hint: string }[] =
    JSON.parse(jsonData).questions;

  const { _id } = await Interview.create({
    jobRole,
    jobExperience,
    jobDescription,
    userId,
    questions,
  });

  revalidatePath('/dashboard');

  return String(_id);
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

  revalidatePath('/dashboard');
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

  revalidatePath('/dashboard');
};
