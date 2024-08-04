'use server';

import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import {
  createExamForModule,
  createInterviewForModule,
  updateActivity,
  updateModule,
} from '@/access-data/modules';
import { revalidatePath } from 'next/cache';
import { DifficultyEnum } from '@/lib/validators';

export const startModuleAction = authenticatedAction
  .createServerAction()
  .input(z.object({ moduleId: z.string(), pathId: z.string() }))
  .handler(async ({ input: { moduleId, pathId } }) => {
    await updateModule({ moduleId, module: { inProgress: true } });

    revalidatePath(`/path/${pathId}`);
  });

export const createExamForModuleAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      moduleId: z.string(),
      activityId: z.string(),
      difficulty: z.nativeEnum(DifficultyEnum),
    })
  )
  .handler(async ({ input }) => {
    const { id } = await createExamForModule({ ...input });

    return id;
  });

export const createInterviewForModuleAction = authenticatedAction
  .createServerAction()
  .input(z.object({ moduleId: z.string() }))
  .handler(async ({ input: { moduleId } }) => {
    const { id } = await createInterviewForModule({ moduleId });

    return id;
  });

export const skipActivityAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      pathId: z.string(),
      moduleId: z.string(),
      activityId: z.string(),
    })
  )
  .handler(async ({ input: { pathId, moduleId, activityId } }) => {
    await updateActivity({ moduleId, activityId });

    revalidatePath(`/path/${pathId}/module/${moduleId}`);
  });
