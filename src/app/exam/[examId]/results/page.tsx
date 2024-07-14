import Link from 'next/link';
import {
  HiMiniArrowLongLeft,
  HiOutlineCheck,
  HiOutlineXMark,
} from 'react-icons/hi2';
import { notFound } from 'next/navigation';

import AnimatedProgress from '@/components/AnimatedProgress';
import ConfettiComponent from '@/components/Confetti';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getExamAttempts, getExamResults } from '@/actions/examAttempt';
import { formatTimer } from '@/lib/helpers';
import Attempts from '@/components/Attempts';

const ExamResultsPage = async ({
  params,
  searchParams,
}: {
  params: { examId: string };
  searchParams: { attemptId: string };
}) => {
  const attempts = await getExamAttempts({ examId: params.examId });

  const results = await getExamResults({
    examId: params.examId,
    attemptId: searchParams.attemptId ?? attempts[0]._id,
  });

  if (!results) return notFound();

  const { score, passed, answers, time } = results;

  return (
    <>
      {passed ? <ConfettiComponent /> : null}
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
      <div className='flex flex-col items-center mt-2'>
        <section className='w-full max-w-[700px] tracking-tight'>
          <div className='flex items-start justify-between flex-col-reverse lg:flex-row'>
            <div>
              <h1 className='text-2xl font-medium'>Mock exam results</h1>
              {passed ? (
                <h2 className='text-xl font-medium text-green-500'>
                  Congratulations, you passed.
                </h2>
              ) : (
                <h2 className='text-xl font-medium text-red-500'>
                  We are sorry, you failed.
                </h2>
              )}
            </div>
            <Attempts
              attempts={attempts as { _id: string }[]}
              crrAttempt={searchParams.attemptId ?? attempts[0].id}
            />
          </div>

          <div className='mt-6'>
            <div className='flex items-center justify-between mb-1'>
              <h2 className='text-sm lg:text-base xl:text-lg font-semibold'>
                Your time
              </h2>
              <p className='text-sm text-muted-foreground md:text-base'>
                {formatTimer(time)}
              </p>
            </div>
          </div>
          <div className='mt-3'>
            <div className='flex items-center justify-between mb-1'>
              <h2 className='text-sm lg:text-base xl:text-lg font-semibold'>
                Your score
              </h2>
              <p className='text-sm text-muted-foreground'>
                {score}/{answers.length}
              </p>
            </div>
            <AnimatedProgress value={(score / answers.length) * 100} />
          </div>

          <div className='mt-6'>
            <h2 className='text-sm lg:text-base xl:text-lg font-semibold mb-1'>
              Your results
            </h2>
            <ul className='flex flex-col gap-1.5'>
              {answers.map((answer, i) => (
                <li
                  key={i}
                  className='flex justify-between w-full p-2 border border-border rounded-lg bg-background-2'
                >
                  <p className='font-medium'>Question {i + 1}</p>
                  {answer.isCorrect ? (
                    <p className='flex items-center gap-1 text-green-500'>
                      <HiOutlineCheck strokeWidth={2} />
                      Correct
                    </p>
                  ) : (
                    <p className='flex items-center gap-1 text-red-500'>
                      <HiOutlineXMark strokeWidth={2} />
                      Wrong
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default ExamResultsPage;
