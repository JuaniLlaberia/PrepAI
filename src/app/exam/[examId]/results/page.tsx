import Link from 'next/link';
import {
  HiMiniArrowLongLeft,
  HiOutlineCheck,
  HiOutlineXMark,
} from 'react-icons/hi2';

import ConfettiComponent from '@/app/interview/[interviewId]/feedback/(components)/Confetti';
import { buttonVariants } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const ExamResultsPage = async () => {
  const results = {};
  const hasPassed = true;

  return (
    <>
      {hasPassed ? <ConfettiComponent /> : null}
      <header className='flex items-center justify-between py-3'>
        <Link
          href='/dashboard/exams'
          className={cn(
            buttonVariants({ size: 'sm', variant: 'ghost' }),
            'group'
          )}
        >
          <HiMiniArrowLongLeft className='size-4 mr-1.5 group-hover:-translate-x-1 transition-transform' />
          Go to dashboard
        </Link>

        <h2>MockAI </h2>
      </header>
      <div>
        <h1 className='text-2xl font-medium'>Mock exam results</h1>
        {hasPassed ? (
          <h2 className='text-xl font-medium text-green-500'>
            Congratulations, you passed.
          </h2>
        ) : (
          <h2 className='text-xl font-medium text-red-500'>
            We are sorry, you failed.
          </h2>
        )}
      </div>

      <div className='mt-6'>
        <div className='flex items-center justify-between mb-1'>
          <h2 className='text-sm lg:text-base xl:text-lg font-semibold'>
            Your score
          </h2>
          <p className='text-sm text-muted-foreground'>{1}/10</p>
        </div>
        <Progress value={10} className='h-3' />
      </div>

      <div className='mt-6'>
        <h2 className='text-sm lg:text-base xl:text-lg font-semibold mb-1'>
          Your results
        </h2>
        <ul className='flex flex-col gap-1.5'>
          <li>
            <Collapsible>
              <CollapsibleTrigger className='flex justify-between w-full p-2 border border-border rounded-lg bg-background-2'>
                <p className='font-medium'>Question 1</p>
                <p className='flex items-center gap-1 text-green-500'>
                  <HiOutlineCheck strokeWidth={2} />
                  Correct
                </p>
              </CollapsibleTrigger>
              <CollapsibleContent asChild>
                <div className='bg-background-2 shadow p-4 mt-1 lg:mt-2 rounded-lg'>
                  <p className='font-medium mb-2.5'>
                    Which of the following methods can be used to display data
                    in some form using Javascript?
                  </p>
                  <p>Your answer: </p>
                  <p>Correct answer:</p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </li>
          <li className='flex justify-between p-2 border border-border rounded-lg bg-background-2'>
            <p className='font-medium'>Question 2</p>
            <p className='flex items-center gap-1 text-red-500'>
              <HiOutlineXMark strokeWidth={2} />
              Wrong
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ExamResultsPage;
