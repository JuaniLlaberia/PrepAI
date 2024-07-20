import Link from 'next/link';
import { notFound } from 'next/navigation';

import AnswerComponent from '../(components)/AnswerComponent';
import PageHeader from '@/components/PageHeader';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { getInterviewById } from '@/actions/interview';

const AnswerPage = async ({
  params,
  searchParams,
}: {
  params: { interviewId: string };
  searchParams: { attemptId: string };
}) => {
  const interview = await getInterviewById({ interviewId: params.interviewId });

  if (!interview) return notFound();

  return (
    <>
      <PageHeader
        text='Quit interview'
        link='/dashboard'
        withConfirmation
        confirmationModal={
          <>
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
          </>
        }
      />
      <AnswerComponent
        interviewId={params.interviewId}
        interviewAttemptId={searchParams.attemptId}
        questions={interview.questions}
      />
    </>
  );
};

export default AnswerPage;
