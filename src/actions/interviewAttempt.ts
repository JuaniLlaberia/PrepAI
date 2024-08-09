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
    await createInterviewAttempt({ interviewId, userId });
  });

export const createInterviewAttemptFeedbackAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      interviewId: z.optional(z.string()),
      userResponses: z.array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      ),
      //Just for modules
      moduleId: z.optional(z.string()),
    })
  )
  .handler(async ({ input: { userResponses, interviewId, moduleId } }) => {
    if (!moduleId)
      await createInterviewAttemptFeedback({
        userResponses,
        interviewId,
      });
    else
      await createInterviewAttemptFeedbackForModule({
        userResponses,
        interviewId,
        moduleId,
      });
  });
