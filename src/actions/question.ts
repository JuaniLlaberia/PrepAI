'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { authenticatedAction } from '@/lib/safe-actions';
import {
  createQuestionWithAnswer,
  deleteQuestion,
  updateQuestion,
} from '@/access-data/question';

export const createQuestionWithAnswerAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      question: z.string(),
    })
  )
  .handler(async ({ input, ctx: { userId } }) => {
    const { id } = await createQuestionWithAnswer({
      question: input.question,
      userId,
    });

    revalidatePath('/dashboard/questions');
    return id;
  });

export const updateQuestionAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      questionId: z.string(),
      question: z.object({ pinned: z.boolean() }),
    })
  )
  .handler(async ({ input: { question, questionId } }) => {
    await updateQuestion({ questionId, question });

    revalidatePath('/dashboard/questions');
  });

export const deleteQuestionAction = authenticatedAction
  .createServerAction()
  .input(z.object({ questionId: z.string() }))
  .handler(async ({ input: { questionId } }) => {
    await deleteQuestion({ questionId });

    revalidatePath('/dashboard/questions');
  });
