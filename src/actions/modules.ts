'use server';

import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import {
  createExamForModule,
  createInterviewForModule,
} from '@/access-data/modules';

export const createExamForModuleAction = authenticatedAction
  .createServerAction()
  .input(z.object({ moduleId: z.string() }))
  .handler(async ({ input: { moduleId } }) => {
    const { id } = await createExamForModule({ moduleId });

    return id;
  });

export const createInterviewForModuleAction = authenticatedAction
  .createServerAction()
  .input(z.object({ moduleId: z.string() }))
  .handler(async ({ input: { moduleId } }) => {
    const { id } = await createInterviewForModule({ moduleId });

    return id;
  });
