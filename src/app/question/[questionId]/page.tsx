import { notFound } from 'next/navigation';

import { GeistSans } from 'geist/font/sans';

import PageHeader from '@/components/PageHeader';
import DifficultyBadge from '@/components/DifficultyBadge';
import Badge from '@/components/ui/badge';
import { getQuestionById } from '@/access-data/question';
import { formatDate } from '@/lib/helpers';
import { cn } from '@/lib/utils';

const QuestionPage = async ({
  params: { questionId },
}: {
  params: { questionId: string };
}) => {
  const questionData = await getQuestionById({ questionId });
  if (!questionData) return notFound();

  const { question, answer, explanation, type, difficulty, createdAt } =
    questionData;

  return (
    <>
      <PageHeader link='/dashboard/questions' />
      <div className='flex flex-col items-center mt-4'>
        <section className='w-full max-w-[700px] tracking-tight bg-background-2 mb-3 p-4 rounded-xl border-[1px] border-b-[2.5px] border-border'>
          <h1 className='text-lg font-medium mb-3'>{question}</h1>
          <ul className='flex items-end gap-2 mb-3'>
            <li>
              <Badge text={type} color='purple' />
            </li>
            <li>
              <DifficultyBadge difficulty={difficulty} />
            </li>
          </ul>
          <p className='text-sm text-muted-foreground'>
            Created {formatDate(createdAt)}
          </p>
        </section>
        <section className='w-full max-w-[700px] tracking-tight bg-background-2 mb-3 p-4 rounded-xl border-[1px] border-b-[2.5px] border-border'>
          <h2 className='mb-2 text-sm lg:text-base xl:text-lg font-semibold'>
            Explanation
          </h2>
          <pre className={cn('text-wrap', GeistSans.className)}>
            {explanation}
          </pre>
        </section>
        <section className='w-full max-w-[700px] tracking-tight bg-background-2 p-4 rounded-xl border-[1px] border-b-[2.5px] border-border'>
          <h2 className='mb-2 text-sm lg:text-base xl:text-lg font-semibold'>
            Answer
          </h2>
          <pre className={cn('text-wrap', GeistSans.className)}>{answer}</pre>
        </section>
      </div>
    </>
  );
};

export default QuestionPage;
