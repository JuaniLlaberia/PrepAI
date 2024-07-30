'use server';

import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import {
  createExamAttempt,
  updateExamAttempt,
} from '@/access-data/examAttempts';
import { updateExamAttemptFromModule } from '@/access-data/modules';

export const createExamAttemptAction = authenticatedAction
  .createServerAction()
  .input(z.object({ examId: z.string() }))
  .handler(async ({ input: { examId }, ctx: { userId } }) => {
    const { id } = await createExamAttempt({ examId, userId });
    return id;
  });

export const updateExamAttemptAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      examId: z.string(),
      attemptId: z.string(),
      data: z.object({
        time: z.number(),
        answers: z.array(
          z.object({
            answer: z.number(),
            isCorrect: z.boolean(),
          })
        ),
      }),
      //Just for modules
      moduleId: z.optional(z.string()),
    })
  )
  .handler(
    async ({
      input: { examId, attemptId, data, moduleId },
      ctx: { userId },
    }) => {
      const score = data.answers?.filter(answer => answer.isCorrect).length!;
      const passed = score > data.answers?.length! - score;

      if (!moduleId)
        await updateExamAttempt({
          examId,
          attemptId,
          examAttempt: { userId, passed, score, ...data },
        });
      else
        await updateExamAttemptFromModule({
          examId,
          attemptId,
          examAttempt: { userId, passed, score, ...data },
          moduleId,
        });

      return passed;
    }
  );
