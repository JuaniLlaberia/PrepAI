import Link from 'next/link';
import { notFound } from 'next/navigation';

import PageHeader from '@/components/PageHeader';
import AnswerComponent from '@/app/interview/[interviewId]/(components)/AnswerComponent';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { getInterviewById } from '@/actions/interview';

const ModuleAnswerPage = async ({
  params: { interviewId, pathId, moduleId },
  searchParams: { attemptId },
}: {
  params: { interviewId: string; pathId: string; moduleId: string };
  searchParams: { attemptId: string };
}) => {
  const interview = await getInterviewById({ interviewId: interviewId });

  if (!interview) return notFound();

  return (
    <>
      <PageHeader
        text='Quit interview'
        link={`/path/${pathId}/module/${moduleId}`}
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
              <Link
                href={`/path/${pathId}/module/${moduleId}`}
                className={buttonVariants({})}
              >
                Quit interview
              </Link>
            </DialogFooter>
          </>
        }
      />
      <AnswerComponent
        interviewId={interviewId}
        interviewAttemptId={attemptId}
        questions={interview.questions}
        moduleId={moduleId}
        pathId={pathId}
      />
    </>
  );
};

export default ModuleAnswerPage;
