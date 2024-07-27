import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HiOutlineInformationCircle } from 'react-icons/hi2';

import AnswerExamComponent from '@/app/exam/[examId]/answer/(components)/AnswerExamComponent';
import PageHeader from '@/components/PageHeader';
import { getExamQuestions } from '@/actions/exams';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ModuleExamAnswer = async ({
  params: { pathId, moduleId, examId },
  searchParams: { attemptId },
}: {
  params: {
    pathId: string;
    moduleId: string;
    examId: string;
  };
  searchParams: {
    attemptId: string;
  };
}) => {
  const questions = (await getExamQuestions({ examId }))?.questions;
  if (!questions) return notFound();

  return (
    <>
      <PageHeader
        text='Quit exam'
        link={`/path/${pathId}/module/${moduleId}`}
        confirmationModal={
          <>
            <DialogTitle>Quit assigment exam</DialogTitle>
            <DialogDescription>
              You are about to leave this exam. You can&apos;t resume it after.{' '}
              <span className='font-medium text-primary'>
                Are you sure you want to leave?
              </span>
            </DialogDescription>
            <Alert variant='information' className='max-w-[600px]'>
              <HiOutlineInformationCircle className='size-5' />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                You will lose this exam progress
              </AlertDescription>
            </Alert>
            <DialogFooter className='flex flex-row justify-end items-center gap-2 mt-2'>
              <DialogClose asChild>
                <Button variant='ghost'>Cancel</Button>
              </DialogClose>
              <Link
                href={`/path/${pathId}/module/${moduleId}`}
                className={buttonVariants({})}
              >
                Quit exam
              </Link>
            </DialogFooter>
          </>
        }
        withConfirmation
      />
      <AnswerExamComponent
        examId={examId}
        attemptId={attemptId}
        questions={questions}
        moduleId={moduleId}
        pathId={pathId}
      />
    </>
  );
};

export default ModuleExamAnswer;
