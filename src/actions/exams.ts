'use server';

import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';

import ExamAttempt from '@/db/models/ExamAttempt';
import Exam, { IExamDocument } from '@/db/models/Exam';
import { authAction, examBelongsToUser } from './auth';
import { generateExamWithGemini } from '@/gemini/functions';

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

  const questions = await generateExamWithGemini({ subject, difficulty });

  const { id } = await Exam.create({
    subject,
    difficulty,
    pinned: false,
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
