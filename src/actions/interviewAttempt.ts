'use server';

import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import {
  createInterviewAttempt,
  createInterviewAttemptFeedback,
} from '@/access-data/interviewAttempt';
import { createInterviewAttemptFeedbackForModule } from '@/access-data/modules';

export const createInterviewAttemptAction = authenticatedAction
  .createServerAction()
  .input(z.object({ interviewId: z.string() }))
  .handler(async ({ input: { interviewId }, ctx: { userId } }) => {
    const { id } = await createInterviewAttempt({ interviewId, userId });

    return id;
  });

export const createInterviewAttemptFeedbackAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      userResponses: z.array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      ),
      interviewId: z.optional(z.string()),
      attemptId: z.optional(z.string()),
      //Just for modules
      moduleId: z.optional(z.string()),
    })
  )
  .handler(
    async ({ input: { userResponses, interviewId, attemptId, moduleId } }) => {
      if (!moduleId)
        await createInterviewAttemptFeedback({
          userResponses,
          interviewId,
          attemptId,
        });
      else
        await createInterviewAttemptFeedbackForModule({
          userResponses,
          interviewId,
          attemptId,
          moduleId,
        });
    }
  );
