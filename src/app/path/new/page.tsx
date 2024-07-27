import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi2';

import NewPathForm from './(components)/NewPathForm';
import { buttonVariants } from '@/components/ui/button';

const NewPathPage = () => {
  return (
    <section className='h-full w-full flex flex-col items-center justify-center'>
      <div className='w-full max-w-[550px] px-6'>
        <NewPathForm />
      </div>
      <div className='flex items-center justify-between w-full absolute top-4 left-0 px-4 md:px-16 lg:px-32 xl:px-56'>
        <Link
          className={buttonVariants({ variant: 'ghost', size: 'sm' })}
          href='/dashboard/paths'
        >
          <HiArrowLeft className='size-4 mr-1.5' /> Go back
        </Link>
        <h2>MockAI</h2>
      </div>
    </section>
  );
};

export default NewPathPage;
