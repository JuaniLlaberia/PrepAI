import Badge from '@/components/ui/badge';
import GoBackBtn from '@/components/GoBackBtn';
import Logo from '@/components/Logo';

const NotFoundPage = () => {
  return (
    <main className='flex flex-col py-2 px-4 md:px-16 lg:px-32 xl:px-56 h-screen'>
      <header className='flex items-center py-3'>
        <Logo />
      </header>
      <section className='flex flex-col flex-1 items-center justify-center'>
        <div className='flex flex-col gap-3 items-start'>
          <Badge text='404 page' color='gray' />
          <div className='mb-2'>
            <h2 className='text-2xl font-medium'>Oops! Page not found.</h2>
            <p className='text-muted-foreground'>
              Sorry, we could&apos;t find the page you where looking for.
            </p>
          </div>
          <GoBackBtn />
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

export default NotFoundPage;
