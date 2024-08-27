'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { deleteUser, updateUser } from '@/access-data/user';
import { authenticatedAction } from '@/lib/safe-actions';
import { cookies } from 'next/headers';

export const updateUserAction = authenticatedAction
  .createServerAction()
  .input(z.object({ name: z.string() }))
  .handler(async ({ input, ctx: { userId } }) => {
    await updateUser({ userId, user: input });
    revalidatePath('/settings/profile');
  });

export const deleteUserAction = authenticatedAction
  .createServerAction()
  .input(z.object({}))
  .handler(async ({ ctx: { userId } }) => {
    await deleteUser({ userId });

    //Delete cookies
    cookies().delete('access_token');
    cookies().delete('id_token');
    cookies().delete('refresh_token');
    //Redirect to home page
    redirect('/');
  });
