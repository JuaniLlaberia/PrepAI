'use server';

import mongoose from 'mongoose';

import InterviewAttempt from '@/db/models/InterviewAttempt';
import Interview from '@/db/models/Interview';
import { model } from '@/gemini';
import { authAction, interviewAttemptBelongsToUser } from './auth';

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

  const prompt = `Generate feedback on how the user responded to the questions. This is the json ${JSON.stringify(
    userResponses
  )} containing the questions and the user answers. Provide a feedback and a score (1 to 10, 1 being very poorly and 10 being excellent) for each question/answer pair. The feedback must be between 3-5 lines. Return it in this json schema format: {feedbacks: [{userResponse: userResponse.answer, feedback, score, questionId: userResponse.questionId, question: userResponse.question}]}.

  In addition return a speech analysis based on the users responses (analyse the vocabulary, the words used and it's repetition and return a feedback between 4-6 (create it as if you were talking to the user) lines in the same json under the name of speechAnalysis.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const jsonData = response.text();

  const answers: {
    userResponse: string;
    feedback: string;
    score: number;
  }[] = JSON.parse(jsonData).feedbacks;

  const speechAnalysis = JSON.parse(jsonData).speechAnalysis as string;

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

  return await InterviewAttempt.find({ interviewId, userId }).select('_id');
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
