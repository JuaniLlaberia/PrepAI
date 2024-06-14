import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi2';

import NewInterviewForm from './(components)/NewInterviewForm';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const NewInterviewPage = () => {
  return (
    <section className='h-full w-full flex flex-col items-center justify-center'>
      <div className='w-full max-w-[550px] px-6'>
        <h1 className='text-3xl font-medium tracking-tight'>New Interview</h1>
        <p className='tracking-tight mb-4 text-muted-foreground'>
          Provide your job information and requirements to create the perfect
          interview.
        </p>
        <NewInterviewForm />
      </div>
      <Link
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          'absolute top-2.5 left-2.5'
        )}
        href='/dashboard'
      >
        <HiArrowLeft className='size-4 mr-1.5' /> Go back
      </Link>
    </section>
  );
};

export default NewInterviewPage;
