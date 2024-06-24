import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HiMiniArrowLongLeft } from 'react-icons/hi2';

import AnswerComponent from '../(components)/AnswerComponent';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getInterviewQuestions } from '@/actions/interview';

const AnswerPage = async ({
  params,
  searchParams,
}: {
  params: { interviewId: string };
  searchParams: { attemptId: string };
}) => {
  const questions = await getInterviewQuestions({
    interviewId: params.interviewId,
  });

  if (!questions) return notFound();

  return (
    <>
      <header className='flex items-center justify-between py-3'>
        <Dialog>
          <DialogTrigger asChild>
            <Button className='group' size='sm' variant='ghost'>
              <HiMiniArrowLongLeft className='size-4 mr-1.5 group-hover:-translate-x-1 transition-transform' />
              Quit interview
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Quit interview</DialogTitle>
            <DialogDescription>
              You are about to leave this interview. You can&apos;t resume it
              after.{' '}
              <span className='font-medium text-primary'>
                Are you sure you want to leave?
              </span>
            </DialogDescription>
            <DialogFooter className='flex flex-row justify-end items-center gap-2 mt-2'>
              <DialogClose asChild>
                <Button variant='ghost'>Cancel</Button>
              </DialogClose>
              <Link href='/dashboard' className={buttonVariants({})}>
                Quit interview
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <h2>MockAI</h2>
      </header>
      <AnswerComponent
        interviewId={params.interviewId}
        interviewAttemptId={searchParams.attemptId}
        questions={questions}
      />
    </>
  );
};

export default AnswerPage;
