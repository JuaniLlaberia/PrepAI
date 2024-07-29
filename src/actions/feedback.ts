'use server';

import mongoose from 'mongoose';

import InterviewAttempt from '@/db/models/InterviewAttempt';
import Interview from '@/db/models/Interview';
import { authAction, interviewAttemptBelongsToUser } from './auth';
import { generateInterviewFeedbackWithGemini } from '@/gemini/functions';

type GenerateFeedbackType = {
  userResponses: {
    question: string;
    questionId?: string;
    answer: string;
  }[];
  attemptId?: string;
  interviewId?: string;
};

export const generateFeedback = async ({
  userResponses,
  attemptId,
  interviewId,
}: GenerateFeedbackType) => {
  await authAction();

  const { answers, speechAnalysis } = await generateInterviewFeedbackWithGemini(
    { userResponses }
  );

  const mongoSession = await mongoose.startSession();
  mongoSession.startTransaction();

  try {
    await Promise.all([
      InterviewAttempt.findByIdAndUpdate(attemptId, {
        speechAnalysis,
        answers,
      }),
      Interview.findByIdAndUpdate(interviewId, { taken: true }),
    ]);
  } catch (err) {
    await mongoSession.abortTransaction();
  } finally {
    mongoSession.endSession();
  }
};

export const getAttempts = async ({ interviewId }: { interviewId: string }) => {
  const userId = await authAction();

  return await InterviewAttempt.find({ interviewId, userId })
    .select('_id')
    .lean();
};

export const getAttemptFeedback = async ({
  interviewAttemptId,
}: {
  interviewAttemptId: string;
}) => {
  const userId = await authAction();
  await interviewAttemptBelongsToUser(userId, interviewAttemptId);

  return await InterviewAttempt.findById(interviewAttemptId);
};
