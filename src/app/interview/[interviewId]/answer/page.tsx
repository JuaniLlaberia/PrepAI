import Link from 'next/link';
import { notFound } from 'next/navigation';

import AnswerInterviewComponent from '../(components)/AnswerInterviewComponent';
import PageHeader from '@/components/PageHeader';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { getInterviewById } from '@/access-data/interview';

const AnswerPage = async ({
  params: { interviewId },
  searchParams: { pathId, moduleId },
}: {
  params: { interviewId: string };
  searchParams: { pathId: string; moduleId: string };
}) => {
  const interview = await getInterviewById({ interviewId });

  if (!interview) return notFound();

  return (
    <>
      <PageHeader
        text='Quit interview'
        link={
          moduleId
            ? `/path/${pathId}/module/${moduleId}`
            : '/dashboard/interviews'
        }
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
                href={
                  moduleId
                    ? `/path/${pathId}/module/${moduleId}`
                    : '/dashboard/interviews'
                }
                className={buttonVariants({})}
              >
                Quit interview
              </Link>
            </DialogFooter>
          </>
        }
      />
      <AnswerInterviewComponent
        interviewId={interviewId}
        questions={interview.questions}
        //Just for modules
        moduleId={moduleId}
        pathId={pathId}
      />
    </>
  );
};

export default AnswerPage;
