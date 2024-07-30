import Link from 'next/link';
import { notFound } from 'next/navigation';

import PageHeader from '@/components/PageHeader';
import AnswerExamComponent from './(components)/AnswerExamComponent';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { getExamQuestions } from '@/access-data/exams';

const ExamAnswerPage = async ({
  params: { examId },
  searchParams: { attemptId, pathId, moduleId },
}: {
  params: { examId: string };
  searchParams: { attemptId: string; moduleId: string; pathId: string };
}) => {
  const questions = await getExamQuestions({ examId: examId });
  if (!questions) return notFound();

  return (
    <>
      <PageHeader
        text='Quit exam'
        link={
          moduleId ? `/path/${pathId}/module/${moduleId}` : '/dashboard/exams'
        }
        withConfirmation
        confirmationModal={
          <>
            <DialogTitle>Quit exam</DialogTitle>
            <DialogDescription>
              You are about to leave this exam. You can&apos;t resume it after.{' '}
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
                    : '/dashboard/exams'
                }
                className={buttonVariants({})}
              >
                Quit exam
              </Link>
            </DialogFooter>
          </>
        }
      />
      <AnswerExamComponent
        examId={examId}
        questions={questions}
        attemptId={attemptId}
        pathId={pathId}
        moduleId={moduleId}
      />
    </>
  );
};

export default ExamAnswerPage;
