'use server';

import { db } from '@/db';
import { model } from '@/gemini';
import { authAction } from './auth';

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
  const prompt = `Generate feedback on how the user responded to the questions. This is the json ${JSON.stringify(
    userResponses
  )} containing the questions and the user answers. Provide a feedback and a score (1 to 10, 1 being very poorly and 10 being excellent) for each question/answer pair. The feedback must be between 3-5 lines. Return it in this json schema format: {feedbacks: [{userResponse: userResponse.answer, feedback, score, questionId: userResponse.questionId, interviewId: ${interviewId}, interviewAttemptId: ${attemptId}}]}.
`;
  //With all the user responses (answers), generate a brief text (3-5 lines) analysis the speech and words used by the user (In order to help them improve their speech by using more suitable words, not repeat the same words all the time, etc.). Make sure you are talking to the user. Return this in a separate json with this schema: {speechAnalysis: analysis}.

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

  await db.answer.createMany({ data: answers });
  await db.interview.update({
    where: { id: interviewId },
    data: { taken: true },
  });
};

export const getAttemptFeedback = async ({
  interviewId,
  interviewAttemptId,
}: {
  interviewId: string;
  interviewAttemptId: string;
}) => {
  await authAction();

  const feedback = await db.answer.findMany({
    where: { interviewId, interviewAttemptId },
    include: { question: { select: { question: true } } },
  });

  return feedback;
};
