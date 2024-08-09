'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { generateExamWithGemini } from '@/gemini/functions';
import { authenticatedAction } from '@/lib/safe-actions';
import { DifficultyEnum, ExamTypeEnum } from '@/lib/validators';
import { createExam, deleteExam, updateExam } from '@/access-data/exams';

export const createExamAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      subject: z.string(),
      difficulty: z.nativeEnum(DifficultyEnum),
      type: z.nativeEnum(ExamTypeEnum),
    })
  )
  .handler(
    async ({ input: { subject, difficulty, type }, ctx: { userId } }) => {
      const questions = await generateExamWithGemini({
        subject,
        difficulty,
        type,
      });

      const { id } = await createExam({
        exam: { userId, subject, difficulty, questions },
      });

      revalidatePath('/dashboard/exams');
      return id;
    }
  );

export const deleteExamAction = authenticatedAction
  .createServerAction()
  .input(z.object({ examId: z.string() }))
  .handler(async ({ input: { examId } }) => {
    await deleteExam({ examId });

    revalidatePath('/dashboard/exams');
  });

export const updateExamAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({ examId: z.string(), exam: z.object({ pinned: z.boolean() }) })
  )
  .handler(async ({ input: { examId, exam } }) => {
    await updateExam({ examId, exam });

    revalidatePath('/dashboard/exams');
  });
