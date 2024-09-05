'use server';

import { z } from 'zod';

import { createUserFeedback } from '@/access-data/feedback';
import { authenticatedAction } from '@/lib/safe-actions';

export const sendUserFeedbackAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      feedback: z.string(),
    })
  )
  .handler(async ({ input }) => {
    await createUserFeedback(input);
  });
