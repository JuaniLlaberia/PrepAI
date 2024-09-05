'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import { createPath, deletePath, updatePath } from '@/access-data/paths';
import { ExperienceEnum } from '@/lib/enum';

export const createPathAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      jobPosition: z.string(),
      jobExperience: z.nativeEnum(ExperienceEnum),
      topics: z.string(),
    })
  )
  .handler(async ({ input, ctx: { userId } }) => {
    const { id } = await createPath({ userId, path: { ...input } });

    revalidatePath('/dashboard/paths');
    return id;
  });

export const deletePathAction = authenticatedAction
  .createServerAction()
  .input(z.object({ pathId: z.string() }))
  .handler(async ({ input: { pathId } }) => {
    await deletePath({ pathId });

    revalidatePath('/dashboard/paths');
  });

export const updatePathAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      pathId: z.string(),
      path: z.object({ pinned: z.boolean() }),
    })
  )
  .handler(async ({ input: { pathId, path } }) => {
    await updatePath({ pathId, path });

    revalidatePath('/dashboard/paths');
  });
