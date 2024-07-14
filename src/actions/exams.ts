'use server';

import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';

import ExamAttempt from '@/db/models/ExamAttempt';
import Exam, { IExamDocument } from '@/db/models/Exam';
import { authAction, examBelongsToUser } from './auth';
import { model } from '@/gemini';

export const getUserExams = async ({
  sort,
  filter,
}: {
  sort: 'createdAt' | 'name';
  filter: 'all' | 'easy' | 'medium' | 'hard';
}) => {
  const userId = await authAction();

  const examQuery = Exam.find({ userId });

  if (filter !== 'all') examQuery.where({ difficulty: filter });

  return await examQuery
    .select('_id subject difficulty taken pinned passed createdAt')
    .sort(
      sort === 'createdAt'
        ? { pinned: 'desc', createdAt: 'desc' }
        : { pinned: 'desc', subject: 'desc' }
    );
};

export const createExam = async ({
  data,
}: {
  data: Partial<IExamDocument>;
}) => {
  const userId = await authAction();
  const { subject, difficulty } = data;

  if (!subject || !difficulty) throw new Error('Missing required data');

  const prompt = `Generate an multiple choice exam about ${subject}
   with a ${difficulty} difficulty level. Provide ${
    difficulty === 'easy' || difficulty === 'medium' ? '10' : '15'
  } related questions
   (each with the question, 4 options and the correct option (being the option index)). Provide
   it in JSON format with this schema: {questions: [{question, options, correctAnswer}]}.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const jsonData = response.text();

  const questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[] = JSON.parse(jsonData).questions;

  const { id } = await Exam.create({
    subject,
    difficulty,
    userId,
    questions,
  });

  revalidatePath('/dashboard/exams');

  return id;
};

export const deleteExam = async ({ examId }: { examId: string }) => {
  await authAction();

  const mongoSession = await mongoose.startSession();
  mongoSession.startTransaction();

  try {
    await Promise.all([
      ExamAttempt.deleteMany({ examId }),
      Exam.findByIdAndDelete(examId),
    ]);
  } catch (err) {
    mongoSession.abortTransaction();
  } finally {
    mongoSession.endSession();
  }

  revalidatePath('/dashboard/exams');
};

export const updateExam = async ({
  examId,
  data,
}: {
  examId: string;
  data: Partial<IExamDocument>;
}) => {
  const userId = await authAction();
  await examBelongsToUser(userId, examId);

  await Exam.findByIdAndUpdate(examId, data);

  revalidatePath('/dashboard/exams');
};

export const getExamQuestions = async ({ examId }: { examId: string }) => {
  await authAction();

  const questions = await Exam.findById(examId).select('questions').lean();
  return questions;
};
