import { notFound } from 'next/navigation';
import {
  HiOutlineCheck,
  HiOutlineQuestionMarkCircle,
  HiOutlineXMark,
} from 'react-icons/hi2';

import AnimatedProgress from '@/components/AnimatedProgress';
import Attempts from '@/components/Attempts';
import ConfettiComponent from '@/components/Confetti';
import { formatTimer } from '@/lib/helpers';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { getExamAttempts, getExamResults } from '@/access-data/examAttempts';

const ResultsComponent = async ({
  examId,
  attemptId,
}: {
  examId: string;
  attemptId: string;
}) => {
  const attempts = await getExamAttempts({ examId: examId });

  const results = await getExamResults({
    examId: examId,
    attemptId: attemptId ?? attempts[0]._id,
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
              attempts={
                JSON.parse(JSON.stringify(attempts)) as { _id: string }[]
              }
              crrAttempt={attemptId ?? String(attempts[0].id)}
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
                {score}/{questions.length}
              </p>
            </div>
            <AnimatedProgress value={(score / questions.length) * 100} />
          </div>

          <div className='mt-6'>
            <h2 className='text-sm lg:text-base xl:text-lg font-semibold mb-1'>
              Your results
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
                  <Collapsible key={i}>
                    <CollapsibleTrigger className='flex justify-between w-full p-2 border border-border rounded-lg bg-background-2'>
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
                      <div className='bg-background-2 tracking-tight shadow p-4 mt-1 lg:mt-2 rounded-lg dark:border dark:border-border'>
                        <p className='font-medium mb-2'>{question}</p>
                        <p>
                          <span className='font-medium'>Your answer:</span> "
                          {options[answer]}"
                        </p>
                        <p>
                          <span className='font-medium'>Correct answer:</span> "
                          {options[correctAnswer]}"
                        </p>
                        <h2 className='text-sm lg:text-base xl:text-lg font-semibold mt-3'>
                          Explanation
                        </h2>
                        <p>{explanation}</p>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
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
