import InterviewAttempt from '@/db/models/InterviewAttempt';
import { getAuthUser } from '@/actions/user';
import { generateInterviewFeedbackWithGemini } from '@/gemini/functions';
import mongoose from 'mongoose';
import Interview from '@/db/models/Interview';

export const getInterviewAttempts = async ({
  interviewId,
}: {
  interviewId: string;
}) => {
  const userId = await getAuthUser();

  return await InterviewAttempt.find({ interviewId, userId })
    .select('_id')
    .lean();
};

export const getAttemptFeedback = async ({
  interviewAttemptId,
}: {
  interviewAttemptId: string;
}) => {
  await getAuthUser();

  return await InterviewAttempt.findById(interviewAttemptId);
};

export const createInterviewAttempt = async ({
  interviewId,
  userId,
}: {
  interviewId: string;
  userId: string;
}) => {
  const { id } = await InterviewAttempt.create({
    interviewId,
    userId,
  });

  return { id };
};

export const createInterviewAttemptFeedback = async ({
  userResponses,
  attemptId,
  interviewId,
}: {
  userResponses: {
    question: string;
    answer: string;
  }[];
  attemptId?: string;
  interviewId?: string;
}) => {
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
