'use client';

import { usePathname, useRouter } from 'next/navigation';

import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { cn } from '@/lib/utils';

const Attempts = ({
  attempts,
  crrAttempt,
}: {
  attempts: { _id: string }[];
  crrAttempt: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const createQueryString = useCreateQueryString();

  const setSeachParam = (name: string, value: string) => {
    router.push(pathname + '?' + createQueryString(name, value));
  };

  return (
    <div className='mb-3'>
      <h2 className='mb-1 text-sm lg:text-base xl:text-lg font-semibold'>
        Your attempts
      </h2>
      <ul className='flex items-center flex-row gap-3 overflow-x-auto w-full pb-4 whitespace-nowrap'>
        {attempts.map((attempt, index) => (
          <li
            key={attempt._id}
            className={cn(
              'px-4 py-1.5 border border-border rounded-lg shadow text-sm font-medium',
              crrAttempt === attempt._id ? 'bg-blue-500 text-white' : null
            )}
            onClick={() => setSeachParam('attemptId', attempt._id)}
          >
            Attempt {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Attempts;
