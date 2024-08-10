import Link from 'next/link';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

import Authentication from '@/components/auth/Authentication';
import Logo from '@/components/Logo';

const LoginPage = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isAuth = await isAuthenticated();

  if (isAuth) return redirect('/dashboard/paths');

  return (
    <section className='h-full flex flex-col items-center justify-center'>
      <div className='w-full max-w-[400px] px-8'>
        <div className='mb-6 text-xl font-bold tracking-tight'>
          <h1>Welcome back!</h1>
          <h2 className='text-muted-foreground/60'>
            Log in to your PrepAI account
          </h2>
        </div>
        <Authentication />
        <p className='mt-3 text-sm text-muted-foreground tracking-tight'>
          Don&apos;t have an account?{' '}
          <Link
            href='/signup'
            className='text-primary font-medium hover:underline'
          >
            Sign up
          </Link>
        </p>
      </div>
      <Link
        href='/'
        className='absolute top-5 left-5 px-4 md:px-16 lg:px-20 2xl:px-80'
      >
        <Logo />
      </Link>
    </section>
  );
};

export default LoginPage;
