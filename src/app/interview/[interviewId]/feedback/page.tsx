import Link from 'next/link';
import { HiMiniArrowLongLeft, HiOutlineChevronUpDown } from 'react-icons/hi2';

import ConfettiComponent from './(components)/Confetti';
import { buttonVariants } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { getAttemptFeedback } from '@/actions/feedback';
import { Progress } from '@/components/ui/progress';

const FeedbackPage = async ({
  params,
  searchParams,
}: {
  params: { interviewId: string };
  searchParams: { interviewAttemptId: string };
}) => {
  // const feedback = await getAttemptFeedback();

  const hasPassed = true;

  return (
    <>
      {hasPassed ? <ConfettiComponent /> : null}
      <header className='flex items-center justify-between py-3'>
        <Link
          href='/dashboard'
          className={cn(
            buttonVariants({ size: 'sm', variant: 'ghost' }),
            'group'
          )}
        >
          <HiMiniArrowLongLeft className='size-4 mr-1.5 group-hover:-translate-x-1 transition-transform' />
          Go to dashboard
        </Link>

        <h2>MockAI</h2>
      </header>
      <div className='flex flex-col items-center mt-2'>
        <section className='tracking-tight pb-3 max-w-[700px]'>
          <div>
            <h1 className='text-2xl font-medium'>Interviw feedback</h1>
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
                Your questions
              </h2>
              <p className='text-sm text-muted-foreground'>7/10</p>
            </div>
            <Progress value={70} className='h-3' />
          </div>
          <div className='mt-6'>
            <h2 className='mb-1 text-sm lg:text-base xl:text-lg font-semibold'>
              Your questions
            </h2>
            <ul className='flex flex-col gap-3'>
              <li>
                <Collapsible>
                  <CollapsibleTrigger className='flex w-full items-center justify-between gap-3 shadow bg-background-2 rounded-lg p-2'>
                    <p className='font-medium line-clamp-1'>
                      Describe how would you implement server side rendering in
                      React?
                    </p>
                    <HiOutlineChevronUpDown className='size-7' />
                  </CollapsibleTrigger>
                  <CollapsibleContent asChild>
                    <div className='bg-background-2 shadow p-4 mt-1 lg:mt-2 rounded-lg'>
                      <h3 className='mb-1 text-sm lg:text-base xl:text-lg font-semibold'>
                        Feedback
                      </h3>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the industrys
                        standard dummy text ever since the 1500s, when an
                        unknown printer took a galley of type and scrambled it
                        to make a type specimen book.
                      </p>
                      <h3 className='mb-1 mt-4 text-sm lg:text-base xl:text-lg font-semibold'>
                        Score
                      </h3>
                      <p className='text-lg font-medium'>5/10</p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </li>
            </ul>
          </div>
          <div className='mt-6'>
            <h2 className='mb-1 text-sm lg:text-base xl:text-lg font-semibold'>
              Speech analysis
            </h2>
            <p className='shadow bg-background-2 p-2 rounded-lg'>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default FeedbackPage;
