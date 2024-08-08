import { notFound } from 'next/navigation';
import { HiOutlineCheck, HiOutlineXMark } from 'react-icons/hi2';

import AnimatedProgress from '@/components/AnimatedProgress';
import ConfettiComponent from '@/components/Confetti';
import { formatTimer } from '@/lib/helpers';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { getExamResults } from '@/access-data/examAttempts';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const ResultsComponent = async ({ examId }: { examId: string }) => {
  const results = await getExamResults({
    examId,
  });

  if (!results) return notFound();

  const { score, passed, questions, time } = results;

  return (
    <>
      {passed ? <ConfettiComponent /> : null}
      <div className='flex flex-col items-center mt-2'>
        <section className='w-full max-w-[700px]'>
          <div className='flex items-start justify-between flex-col-reverse md:flex-row'>
            <div>
              <h1 className='text-2xl font-medium'>Mock exam results</h1>
              {passed ? (
                <h2 className='text-2xl font-medium text-green-500'>
                  Congratulations, you passed.
                </h2>
              ) : (
                <h2 className='text-xl font-medium text-red-500'>
                  We are sorry, you failed.
                </h2>
              )}
            </div>
          </div>

          <div className='mt-6'>
            <div className='flex items-center justify-between mb-1'>
              <h2 className='text-sm lg:text-base xl:text-lg font-semibold'>
                Your max score
              </h2>
              <p className='text-sm text-muted-foreground'>
                {score || 0}/{questions.length}
              </p>
            </div>
            <AnimatedProgress value={(score / questions.length) * 100} />
          </div>
          <Separator className='my-6' />
          <div className='mt-2'>
            <div className='flex items-center justify-between mb-1'>
              <h2 className='text-sm lg:text-base xl:text-lg font-semibold'>
                Attempt time
              </h2>
              <p className='text-sm text-muted-foreground md:text-base'>
                {formatTimer(time || 0)}
              </p>
            </div>
          </div>

          <div className='mt-6'>
            <h2 className='text-sm lg:text-base xl:text-lg font-semibold mb-1'>
              Attempt results
            </h2>
            <ul className='flex flex-col gap-1.5'>
              {questions.map(
                (
                  {
                    isCorrect,
                    question,
                    answer,
                    correctAnswer,
                    explanation,
                    options,
                  },
                  i
                ) => (
                  <li key={i}>
                    <Collapsible>
                      <CollapsibleTrigger className='flex justify-between w-full p-3 border-[1px] border-b-[2.5px] border-border rounded-xl bg-background-2 md:hover:opacity-80'>
                        <p className='font-medium'>Question {i + 1}</p>
                        {isCorrect ? (
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
                      </CollapsibleTrigger>
                      <CollapsibleContent asChild>
                        <div className='bg-background-2 tracking-tight p-4 mt-1 lg:mt-2 rounded-xl border border-border'>
                          <p className='font-medium mb-3'>{question}</p>
                          <p
                            className={cn(
                              'p-2 border rounded-lg',
                              isCorrect
                                ? 'bg-green-100  border-green-200'
                                : 'bg-red-100  border-red-200'
                            )}
                          >
                            <span className='font-medium'>Your answer:</span>{' '}
                            {options[answer] || 'No answer'}
                          </p>
                          <p className='p-2 bg-green-100 border border-green-200 rounded-lg mt-2'>
                            <span className='font-medium'>Correct answer:</span>{' '}
                            {options[correctAnswer]}
                          </p>
                          <h2 className='text-sm lg:text-base xl:text-lg font-semibold mt-3'>
                            Explanation
                          </h2>
                          <p>{explanation}</p>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </li>
                )
              )}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default ResultsComponent;
