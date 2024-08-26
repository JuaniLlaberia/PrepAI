import { getAuthUser } from '@/actions/auth';
import { createServerActionProcedure } from 'zsa';

export const authenticatedAction = createServerActionProcedure().handler(
  async () => {
    const userId = await getAuthUser();

    //Rate limiter by IP

    return { userId };
  }
);
