import Link from 'next/link';
import { HiOutlineChevronLeft } from 'react-icons/hi2';

import NewExamForm from './(components)/NewExamForm';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NewExamPage = () => {
  return (
    <section className='h-full w-full flex flex-col items-center justify-center'>
      <div className='w-full max-w-[550px] px-6 overflow-hidden'>
        <NewExamForm />
      </div>
      <div className='flex items-center justify-between w-full absolute top-4 left-0 px-4 md:px-16 lg:px-32 xl:px-56'>
        <Link
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'group'
          )}
          href='/dashboard/exams'
        >
          <HiOutlineChevronLeft className='size-4 mr-1.5 group-hover:-translate-x-1 transition-transform' />
          Go back
        </Link>
        <h2>MockAI</h2>
      </div>
    </section>
  );
};

export default NewExamPage;
