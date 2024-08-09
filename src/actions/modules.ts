'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { authenticatedAction } from '@/lib/safe-actions';
import {
  completeActivity,
  createExamForModule,
  createInterviewForModule,
  updateModule,
} from '@/access-data/modules';
import { DifficultyEnum, ExamTypeEnum } from '@/lib/validators';

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
      pathId: z.string(),
      moduleId: z.string(),
      activityId: z.string(),
      difficulty: z.nativeEnum(DifficultyEnum),
      type: z.nativeEnum(ExamTypeEnum),
    })
  )
  .handler(async ({ input }) => {
    const { id } = await createExamForModule({ ...input });

    revalidatePath(`/path/${input.pathId}/module/${input.moduleId}`);
    return id;
  });

export const createInterviewForModuleAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      pathId: z.string(),
      moduleId: z.string(),
      activityId: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const { id } = await createInterviewForModule({ ...input });

    revalidatePath(`/path/${input.pathId}/module/${input.moduleId}`);
    return id;
  });

export const skipActivityAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      pathId: z.string(),
      moduleId: z.optional(z.string()),
      activityId: z.string(),
    })
  )
  .handler(async ({ input: { pathId, moduleId, activityId } }) => {
    await completeActivity({ moduleId, activityId });

    revalidatePath(`/path/${pathId}/module/${moduleId}`);
  });
