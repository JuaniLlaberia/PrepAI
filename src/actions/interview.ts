'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import {
  createInterview,
  deleteInterview,
  updateInterview,
} from '@/access-data/interview';
import { ExperienceEnum } from '@/lib/enum';

export const createInterviewAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      jobRole: z.string(),
      jobExperience: z.nativeEnum(ExperienceEnum),
      jobDescription: z.string(),
    })
  )
  .handler(async ({ input, ctx: { userId } }) => {
    const { id } = await createInterview({ userId, interview: { ...input } });

    revalidatePath('/dashboard/interviews');

    return id;
  });

export const deleteInterviewAction = authenticatedAction
  .createServerAction()
  .input(z.object({ interviewId: z.string() }))
  .handler(async ({ input: { interviewId } }) => {
    await deleteInterview({ interviewId });

    revalidatePath('/dashboard/interviews');
  });

export const updateInterviewAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      interviewId: z.string(),
      interview: z.object({ pinned: z.boolean() }),
    })
  )
  .handler(async ({ input: { interviewId, interview } }) => {
    await updateInterview({ interviewId, interview });

    revalidatePath('/dashboard/interviews');
  });
