'use server';

import { redirect } from 'next/navigation';

import { deleteUser, updateUser } from '@/access-data/user';
import { authenticatedAction } from '@/lib/safe-actions';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

export const updateUserAction = authenticatedAction
  .createServerAction()
  .input(z.object({}))
  .handler(async ({ ctx: { userId } }) => {
    await updateUser({ userId, user: {} });
    revalidatePath('/settings/profile');
  });

export const deleteUserAction = authenticatedAction
  .createServerAction()
  .input(z.object({}))
  .handler(async ({ ctx: { userId } }) => {
    await deleteUser({ userId });
    redirect('/');
  });
