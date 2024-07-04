import Link from 'next/link';
import { HiChevronRight } from 'react-icons/hi2';

import Marquee from './ui/marquee';
import ReviewCard from './ui/review-card';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

const reviews = [
  {
    name: 'Jack',
    username: '@jack',
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: 'https://avatar.vercel.sh/jack',
  },
  {
    name: 'Jill',
    username: '@jill',
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: 'https://avatar.vercel.sh/jill',
  },
  {
    name: 'John',
    username: '@john',
    body: "It's an amazing product and super helpfull.",
    img: 'https://avatar.vercel.sh/john',
  },
  {
    name: 'Jane',
    username: '@jane',
    body: 'I would use it again 100%. I love it.',
    img: 'https://avatar.vercel.sh/jane',
  },
  {
    name: 'Jenny',
    username: '@jenny',
    body: "It's amazing. I really recommend it.",
    img: 'https://avatar.vercel.sh/jenny',
  },
  {
    name: 'James',
    username: '@james',
    body: 'It helped me pass my interview and land a new job.',
    img: 'https://avatar.vercel.sh/james',
  },
];

const CallToAction = () => {
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  return (
    <section className='px-4 md:px-24 lg:px-40 xl:px-80 py-8'>
      <div className='relative overflow-hidden flex flex-col justify-center items-center border border-border rounded-3xl'>
        <div className='rotate-[10deg]'>
          <Marquee className='[--duration:20s]'>
            {firstRow.map(review => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse className='[--duration:20s]'>
            {firstRow.map(review => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee className='[--duration:20s]'>
            {secondRow.map(review => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse className='[--duration:20s] hidden md:flex'>
            {firstRow.map(review => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
        </div>
        <div className='absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-white to-70% dark:to-black'></div>
        <div className='absolute flex flex-col items-center justify-center gap-2 px-8'>
          <div className='size-20 bg-primary rounded-2xl mb-3'></div>
          <h3 className='text-3xl font-semibold text-center'>
            Start your Mock Interview today.
          </h3>
          <p className='text-muted-foreground'>
            Get started with MockAI for free.
          </p>
          <Link
            href='/dashboard'
            className={cn(
              buttonVariants({ size: 'lg' }),
              'rounded-full mt-3 group bg-background hover:bg-background-2 border border-border text-primary shadow-none'
            )}
          >
            Get started now{' '}
            <HiChevronRight
              strokeWidth={1}
              className='size-4 ml-2 group-hover:translate-x-1 transition-transform'
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
