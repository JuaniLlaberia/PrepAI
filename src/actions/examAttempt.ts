'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { authenticatedAction } from '@/lib/safe-actions';
import {
  createExamAttempt,
  updateExamAttempt,
} from '@/access-data/examAttempts';
import { updateExamAttemptFromModule } from '@/access-data/modules';
import { test } from '@/gemini/functions';

export const createExamAttemptAction = authenticatedAction
  .createServerAction()
  .input(z.object({ examId: z.string() }))
  .handler(async ({ input: { examId }, ctx: { userId } }) => {
    await createExamAttempt({ examId, userId });
  });

export const updateExamAttemptAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      examId: z.string(),
      data: z.object({
        time: z.number(),
        answers: z.array(
          z.object({
            answerIndex: z.number(),
            isCorrect: z.boolean(),
            question: z.string(),
          })
        ),
      }),
      //Just for modules
      moduleId: z.optional(z.string()),
    })
  )
  .handler(async ({ input: { examId, data, moduleId } }) => {
    const score = data.answers?.filter(answer => answer.isCorrect).length!;
    const passed = score > data.answers?.length! - score;
    const time = data.time;

    const answers = await test({ data: data.answers });

    if (!moduleId)
      await updateExamAttempt({
        examId,
        examAttempt: { passed, score, time, answers },
      });
    else
      await updateExamAttemptFromModule({
        examId,
        examAttempt: { passed, score, time, answers },
        moduleId,
      });

    revalidatePath(`/exam/${examId}/results`);
  });
