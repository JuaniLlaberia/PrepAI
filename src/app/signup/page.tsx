import Link from 'next/link';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

import Authentication from '@/components/auth/Authentication';
import Logo from '@/components/Logo';

const SignupPage = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isAuth = await isAuthenticated();

  if (isAuth) return redirect('/dashboard/paths');

  return (
    <section className='h-full flex flex-col items-center justify-center'>
      <div className='w-full max-w-[400px] px-8'>
        <div className='mb-6 text-xl font-bold'>
          <h1>Create your PrepAI account</h1>
          <h2 className='text-muted-foreground/60'>Smash that interview</h2>
        </div>
        <Authentication />
        <p className='mt-3 text-sm text-muted-foreground'>
          Already have an account?{' '}
          <Link
            href='/login'
            className='text-primary font-medium hover:underline'
          >
            Log in
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

export default SignupPage;
