import mongoose from 'mongoose';

import Exam from '@/db/models/Exam';
import ExamAttempt, { IExamAttemptDocument } from '@/db/models/ExamAttempt';
import { getAuthUser } from '@/actions/user';

export const createExamAttempt = async ({
  examId,
  userId,
}: {
  examId: string;
  userId: string;
}) => {
  const { id } = await ExamAttempt.create({ examId, userId });
  return id;
};

export const getExamResults = async ({
  examId,
  attemptId,
}: {
  examId: string;
  attemptId: string;
}) => {
  await getAuthUser();

  const questions = await Exam.findById(examId).select('questions').lean();
  const answers = await ExamAttempt.findById(attemptId)
    .select('score passed time answers')
    .lean();

  if (!questions || !answers) throw Error('');

  const quests = questions?.questions.map((question, i) => {
    return {
      correctAnswer: question.correctAnswer,
      question: question.question,
      options: question.options,
      explanation: question.explanation,
      isCorrect: answers?.answers[i].isCorrect,
      answer: answers?.answers[i].answer,
    };
  });

  return {
    score: answers?.score,
    passed: answers?.passed,
    time: answers?.time,
    questions: quests,
  };
};

export const getExamAttempts = async ({ examId }: { examId: string }) => {
  await getAuthUser();

  return await ExamAttempt.find({ examId }).select('_id');
};

export const updateExamAttempt = async ({
  examId,
  attemptId,
  examAttempt,
}: {
  examId: string;
  attemptId: string;
  examAttempt: Partial<IExamAttemptDocument>;
}) => {
  const mongoSession = await mongoose.startSession();
  mongoSession.startTransaction();

  try {
    await Promise.all([
      ExamAttempt.findByIdAndUpdate(attemptId, {
        ...examAttempt,
        examId,
      }),
      Exam.findByIdAndUpdate(examId, { taken: true }),
    ]);
  } catch (err) {
    await mongoSession.abortTransaction();
  } finally {
    mongoSession.endSession();
  }
};
