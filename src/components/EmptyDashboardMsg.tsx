import Link from 'next/link';
import { HiOutlineFolder } from 'react-icons/hi2';

import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';

const EmptyDashboardMsg = ({
  type,
  crrLink,
  newPageLink,
}: {
  type: 'path' | 'interview' | 'exam';
  crrLink: string;
  newPageLink: string;
}) => {
  return (
    <div className='flex flex-col col-span-full gap-2 justify-center items-center py-10 lg:py-20 px-2'>
      <div className='border border-border rounded-xl p-3'>
        <HiOutlineFolder className='size-6' />
      </div>
      <h6 className='font-semibold'>No {type} found</h6>
      <p className='text-muted-foreground text-center max-w-[400px]'>
        We did not find any {type} that matches your filters. You can{' '}
        <Link href={newPageLink} className='underline'>
          create a new {type}
        </Link>
        .
      </p>
      <Link
        href={crrLink}
        className={cn(
          buttonVariants({ variant: 'secondary' }),
          'mt-4 text-black'
        )}
      >
        Clear filters
      </Link>
    </div>
  );
};

export default EmptyDashboardMsg;
