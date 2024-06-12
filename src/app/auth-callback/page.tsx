'use client';

import { useQuery } from '@tanstack/react-query';
import { LuLoader2 } from 'react-icons/lu';
import { useRouter } from 'next/navigation';

import { authenticateUser } from './actions';

const AuthPage = () => {
  const router = useRouter();
  const { data: isAuth, isPending } = useQuery({
    queryKey: ['auth-user'],
    queryFn: async () => authenticateUser(),
    retry: true,
    retryDelay: 500,
  });

  if (isAuth && !isPending) {
    router.push('/dashboard');
  } else {
    router.push('/');
  }

  return (
    <section className='h-full flex flex-col items-center justify-center'>
      <div className='flex items-center gap-3 mb-2'>
        <LuLoader2
          className='size-7 animate-spin'
          strokeWidth={1}
        />
        <h1 className='font-medium'>Logging in</h1>
      </div>
      <p className='text-sm text-muted-foreground'>
        You will be redirected automatically.
      </p>
    </section>
  );
};

export default AuthPage;
