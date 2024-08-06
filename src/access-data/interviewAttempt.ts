import mongoose from 'mongoose';

import Interview from '@/db/models/Interview';
import InterviewAttempt from '@/db/models/InterviewAttempt';
import { getAuthUser } from '@/actions/user';
import { generateInterviewFeedbackWithGemini } from '@/gemini/functions';

export const getInterviewFeedback = async ({
  interviewId,
}: {
  interviewId: string;
}) => {
  await getAuthUser();

  return await InterviewAttempt.findOne({ interviewId });
};

export const createInterviewAttempt = async ({
  interviewId,
  userId,
}: {
  interviewId: string;
  userId: string;
}) => {
  const interviewAttempt = await InterviewAttempt.findOne({
    interviewId,
    userId,
  }).select('_id');

  if (!interviewAttempt) await InterviewAttempt.create({ interviewId, userId });
};

export const createInterviewAttemptFeedback = async ({
  userResponses,
  interviewId,
}: {
  userResponses: {
    question: string;
    answer: string;
  }[];
  interviewId?: string;
}) => {
  const { answers, speechAnalysis } = await generateInterviewFeedbackWithGemini(
    { userResponses }
  );

  const mongoSession = await mongoose.startSession();
  mongoSession.startTransaction();

  try {
    const score =
      answers.reduce((prev, crr) => prev + crr.score, 0) / answers.length;
    const passed = score >= 6;

    await Promise.all([
      InterviewAttempt.findOneAndUpdate(
        { interviewId },
        { speechAnalysis, answers, passed, $max: { score } }
      ),
      Interview.findByIdAndUpdate(interviewId, { taken: true, passed }),
    ]);
  } catch (err) {
    await mongoSession.abortTransaction();
  } finally {
    mongoSession.endSession();
  }
};
