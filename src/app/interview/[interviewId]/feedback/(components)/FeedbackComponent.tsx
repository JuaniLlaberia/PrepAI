import { notFound } from 'next/navigation';

import ConfettiComponent from '@/components/Confetti';
import AnimatedProgress from '@/components/AnimatedProgress';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { getInterviewFeedback } from '@/access-data/interviewAttempt';

const FeedbackComponent = async ({ interviewId }: { interviewId: string }) => {
  const interviewFeedback = await getInterviewFeedback({
    interviewId,
  });

  if (!interviewFeedback) return notFound();

  const { passed, score, answers, speechAnalysis } = interviewFeedback;

  return (
    <>
      {passed ? <ConfettiComponent /> : null}{' '}
      <div className='flex flex-col items-center mt-2'>
        <section className='king-tight pb-3 max-w-[700px] overflow-x-hidden w-full'>
          <div className='flex items-start justify-between flex-col-reverse md:flex-row'>
            <div>
              <h1 className='text-2xl font-medium'>Interview feedback</h1>
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
          </div>

          <div className='mt-6'>
            <div className='flex items-center justify-between mb-1'>
              <h2 className='text-sm lg:text-base xl:text-lg font-semibold'>
                Your max score
              </h2>
              <p className='text-sm text-muted-foreground'>{score}/10</p>
            </div>
            <AnimatedProgress value={score * 10} />
          </div>
          <div className='mt-6'>
            <h2 className='mb-1 text-sm lg:text-base xl:text-lg font-semibold'>
              Your questions
            </h2>
            <ul className='flex flex-col gap-3'>
              {answers.map(feedback => (
                <li key={String(feedback._id)}>
                  <Collapsible>
                    <CollapsibleTrigger className='flex w-full items-center justify-between gap-3 shadow bg-background-2 rounded-lg p-2 dark:border dark:border-border'>
                      <p className='font-medium line-clamp-1 text-start'>
                        {feedback.question}
                      </p>
                    </CollapsibleTrigger>
                    <CollapsibleContent asChild>
                      <div className='bg-background-2 tracking-tight shadow p-4 mt-1 lg:mt-2 rounded-lg dark:border dark:border-border'>
                        <h3 className='mb-1 text-sm lg:text-base xl:text-lg font-semibold'>
                          Feedback
                        </h3>
                        <p>{feedback.feedback}</p>
                        <h3 className='mb-1 mt-4 text-sm lg:text-base xl:text-lg font-semibold'>
                          Score
                        </h3>
                        <p className='text-lg font-medium'>
                          {feedback.score}/10
                        </p>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </li>
              ))}
            </ul>
          </div>
          <div className='mt-6'>
            <h2 className='mb-1 text-sm lg:text-base xl:text-lg font-semibold'>
              Analysis
            </h2>
            <p className='shadow tracking-tight bg-background-2 p-4 rounded-lg dark:border dark:border-border'>
              {speechAnalysis}
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default FeedbackComponent;
