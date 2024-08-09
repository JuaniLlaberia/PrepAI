'use client';

import { useRouter } from 'next/navigation';

import Badge from '@/components/ui/badge';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';

const ErrorPage = ({ error }: { error: Error & { digest?: string } }) => {
  const router = useRouter();
  return (
    <main className='flex flex-col py-2 px-4 md:px-16 lg:px-32 xl:px-56 h-screen'>
      <header className='flex items-center py-3'>
        <Logo />
      </header>
      <section className='flex flex-col flex-1 items-center justify-center'>
        <div className='flex flex-col gap-3 items-start'>
          <Badge text='Error' color='red' />
          <div className='mb-2'>
            <h2 className='text-2xl font-medium'>
              Oops! Something went wrong.
            </h2>
            <p className='text-muted-foreground'>
              Sorry, something didn&apos;t go as expected. Try reloading or come
              back later.
            </p>
          </div>
          <Button onClick={() => router.refresh()}>Reload page</Button>
        </div>
      </section>
      <footer className='px-4 pb-4'>
        <p className='text-xs md:text-sm text-center text-muted-foreground'>
          PrepAI &copy; {new Date().getFullYear()} All rights reserved
        </p>
      </footer>
    </main>
  );
};

export default ErrorPage;
