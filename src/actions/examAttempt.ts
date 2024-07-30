'use server';

import mongoose from 'mongoose';

import Exam from '@/db/models/Exam';
import ExamAttempt, { IExamAttemptDocument } from '@/db/models/ExamAttempt';
import { authAction } from './auth';

export const createExamAttempt = async ({ examId }: { examId: string }) => {
  const userId = await authAction();

  const { id } = await ExamAttempt.create({ examId, userId });
  return id;
};

export const updateExamAttempt = async ({
  examId,
  attemptId,
  data,
}: {
  examId: string;
  attemptId: string;
  data: Partial<IExamAttemptDocument>;
}) => {
  const userId = await authAction();

  const score = data.answers?.filter(answer => answer.isCorrect).length!;
  const passed = score > data.answers?.length! - score;

  const mongoSession = await mongoose.startSession();
  mongoSession.startTransaction();

  try {
    await Promise.all([
      ExamAttempt.findByIdAndUpdate(attemptId, {
        answers: data.answers,
        time: data.time,
        score,
        passed,
        examId,
        userId,
      }),
      Exam.findByIdAndUpdate(examId, { taken: true }),
    ]);
  } catch (err) {
    await mongoSession.abortTransaction();
  } finally {
    mongoSession.endSession();
  }

  return passed;
};

export const getExamResults = async ({
  examId,
  attemptId,
}: {
  examId: string;
  attemptId: string;
}) => {
  await authAction();

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
  await authAction();

  return await ExamAttempt.find({ examId }).select('_id');
};
