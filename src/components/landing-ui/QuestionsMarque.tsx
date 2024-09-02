import { cn } from '@/lib/utils';
import Marquee from '../ui/marquee';
import Badge from '../ui/badge';
import DifficultyBadge from '../DifficultyBadge';
import { DifficultyEnum, QuestionTypeEnum } from '@/lib/enum';

const reviews = [
  {
    question: 'Describe a time when you disagreed with a team member.',
    type: 'behavioral',
    difficulty: 'easy',
  },
  {
    question: 'How would you implement a testing pipeline in React?',
    type: 'technical',
    difficulty: 'hard',
  },
  {
    question: 'How do you manage the launch of a new product?',
    type: 'technical',
    difficulty: 'medium',
  },
  {
    question: 'What is the difference between list and tuples in Python?',
    type: 'technical',
    difficulty: 'easy',
  },
  {
    question: 'Describe an issue in your last role and how you overcame it',
    type: 'analytical',
    difficulty: 'medium',
  },
  {
    question:
      'Tell me about a recent successful speech or presentation you gave.',
    type: 'behavioral',
    difficulty: 'medium',
  },
] as { question: string; type: QuestionTypeEnum; difficulty: DifficultyEnum }[];

const firstRow = reviews.slice(0, reviews.length / 2);

const QuestionCard = ({
  question,
  type,
  difficulty,
}: {
  question: string;
  type: QuestionTypeEnum;
  difficulty: DifficultyEnum;
}) => {
  return (
    <figure
      className={cn(
        'relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4',
        // light styles
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        // dark styles
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
      )}
    >
      <div className='flex flex-col gap-3'>
        <p>{question}</p>
        <div className='flex items-center gap-3'>
          <Badge text={type} color='purple' />
          <DifficultyBadge difficulty={difficulty} />
        </div>
      </div>
    </figure>
  );
};

export function QuestionsMarque() {
  return (
    <div className='absolute top-40 left-0 flex h-[200px] w-full flex-col items-center justify-center overflow-hidden'>
      <Marquee pauseOnHover className='[--duration:20s]'>
        {firstRow.map((question, i) => (
          <QuestionCard key={i} {...question} />
        ))}
      </Marquee>
      <div className='pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background'></div>
      <div className='pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background'></div>
    </div>
  );
}
