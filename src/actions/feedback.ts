'use server';

import { db } from '@/db';
import { model } from '@/gemini';
import { authAction, belongsToUser } from './auth';

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
  )} containing the questions and the user answers. Provide a feedback and a score (1 to 10, 1 being very poorly and 10 being excellent) for each question/answer pair. The feedback must be between 3-5 lines. Return it in this json schema format: {feedbacks: [{userResponse: userResponse.answer, feedback, score, questionId: userResponse.questionId, interviewId: ${interviewId}, interviewAttemptId: ${attemptId}}]}.

  In addition return a speech analysis based on the users responses (analyse the vocabulary, the words used and it's repetition and return a feedback between 4-6 (create it as if you were talking to the user) lines in the same json under the name of speechAnalysis.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const jsonData = response.text();

  const answers: {
    userResponse: string;
    feedback: string;
    score: number;
    questionId: string;
    interviewId: string;
    interviewAttemptId: string;
  }[] = JSON.parse(jsonData).feedbacks;

  await db.$transaction([
    db.answer.createMany({ data: answers }),
    db.interview.update({
      where: { id: interviewId },
      data: {
        taken: true,
      },
    }),
    db.interviewAttempt.update({
      where: { id: attemptId },
      data: {
        speechAnalysis: JSON.parse(jsonData).speechAnalysis as string,
      },
    }),
  ]);
};

export const getAttempts = async ({ interviewId }: { interviewId: string }) => {
  const user = await authAction();
  await belongsToUser(user.id, interviewId);

  return await db.interviewAttempt.findMany({
    where: { interviewId },
    select: { id: true },
  });
};

export const getAttemptFeedback = async ({
  interviewId,
  interviewAttemptId,
}: {
  interviewId: string;
  interviewAttemptId: string;
}) => {
  const user = await authAction();
  await belongsToUser(user.id, interviewId);

  const feedbackQuery = db.answer.findMany({
    where: { interviewId, interviewAttemptId },
    include: {
      question: { select: { question: true } },
    },
  });

  const analysisQuery = db.interviewAttempt.findUnique({
    where: { id: interviewAttemptId },
    select: { speechAnalysis: true },
  });

  const [feedback, analysis] = await Promise.all([
    feedbackQuery,
    analysisQuery,
  ]);

  return { feedback, analysis };
};
