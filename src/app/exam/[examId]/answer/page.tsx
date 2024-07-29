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
import { getExamQuestions } from '@/actions/exams';

const ExamAnswerPage = async ({
  params: { examId },
  searchParams: { attemptId },
}: {
  params: { examId: string };
  searchParams: { attemptId: string };
}) => {
  const questions = await getExamQuestions({ examId: examId });
  if (!questions) return notFound();

  return (
    <>
      <PageHeader
        text='Quit exam'
        link='/dashboard/exams'
        withConfirmation
        confirmationModal={
          <>
            <DialogTitle>Quit mock exam</DialogTitle>
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
                href='/dashboard/exams'
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
      />
    </>
  );
};

export default ExamAnswerPage;
