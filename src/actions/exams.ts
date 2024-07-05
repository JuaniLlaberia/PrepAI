'use server';

import { Difficulty } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { authAction } from './auth';
import { db } from '@/db';
import { model } from '@/gemini';

export const getUserExams = async ({
  sort,
  filter,
}: {
  sort: 'createdAt' | 'name';
  filter: 'all' | 'easy' | 'medium' | 'hard';
}) => {
  const user = await authAction();

  return await db.exam.findMany({
    where: {
      userId: user.id,
      difficulty: filter === 'all' ? undefined : filter,
    },
    orderBy:
      sort === 'createdAt' ? [{ createdAt: 'desc' }] : [{ subject: 'desc' }],
  });
};

export const createExam = async ({
  subject,
  difficulty,
}: {
  subject: 'string';
  difficulty: Difficulty;
}) => {
  const user = await authAction();

  if (!subject || !difficulty) throw new Error('Missing required data');

  const { id } = await db.exam.create({
    data: {
      subject,
      difficulty,
      userId: user.id,
      passed: false,
      taken: false,
      pinned: false,
    },
  });

  const prompt = `Generate an multiple choice exam about ${subject}
   with a ${difficulty} difficulty level. Provide 5 related questions
   (each with the question, 4 options and the correct option (being the option index)). Provide
   it in JSON format with this schema: {exams: [{question, options, correctAnswers}]}.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const jsonData = response.text();

  revalidatePath('/dashboard/exams');

  return { id };
};

export const deleteExam = async ({ examId }: { examId: string }) => {
  await authAction();

  await db.exam.delete({ where: { id: examId } });
};
