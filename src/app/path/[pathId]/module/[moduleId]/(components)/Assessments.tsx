'use client';

import Link from 'next/link';
import { ObjectId } from 'mongoose';
import { HiOutlineCheckCircle } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  createExamForModuleAction,
  createInterviewForModuleAction,
} from '@/actions/modules';
import { cn } from '@/lib/utils';
import { useServerActionMutation } from '@/hooks/server-action-hooks';

type AssessmentsType = {
  moduleId: string;
  pathId: string;
  examData: {
    examId: string | ObjectId;
    passed: boolean;
  };
  interviewData: {
    interviewId: string | ObjectId;
    passed: boolean;
  };
};

const Assessments = ({
  moduleId,
  pathId,
  examData,
  interviewData,
}: AssessmentsType) => {
  const router = useRouter();

  const { mutate: createExam, isPending: isPendingExam } =
    useServerActionMutation(createExamForModuleAction, {
      mutationKey: ['create-module-exam'],
      onSuccess: (examId: string) => {
        router.push(`/exam/${examId}?pathId=${pathId}&moduleId=${moduleId}`);
        toast.success('Exam was created successfully', {
          description: 'Redirecting...',
        });
      },
      onError: () =>
        toast.error('Something went wrong.', {
          description: 'We failed to create the exam. Please try again.',
        }),
    });

  const { mutate: createInterview, isPending: isPendingInterview } =
    useServerActionMutation(createInterviewForModuleAction, {
      mutationKey: ['create-module-interview'],
      onSuccess: (interviewId: string) => {
        router.push(
          `/interview/${interviewId}?pathId=${pathId}&moduleId=${moduleId}`
        );
        toast.success('Interview was created successfully', {
          description: 'Redirecting...',
        });
      },
      onError: () =>
        toast.error('Something went wrong.', {
          description: 'We failed to create the interview. Please try again.',
        }),
    });

  return (
    <div className='mt-4'>
      <h2 className='text-sm lg:text-base xl:text-lg font-semibold mb-1'>
        Assessments
      </h2>
      <ul className='flex flex-col gap-2 lg:flex-row lg:w-full'>
        <li className='flex flex-col bg-background-2 border border-border rounded-lg p-3 lg:w-full'>
          {!examData || !examData?.passed ? (
            <>
              <h4 className='font-medium'>Ready for the exam?</h4>
              <p className='text-sm text-muted-foreground'>
                Take a mock exam to validate your knowledge.
              </p>
              <div className='flex items-center gap-3 mt-5'>
                {examData?.examId ? (
                  <Link
                    href={`/exam/${examData.examId}/results?pathId=${pathId}&moduleId=${moduleId}`}
                    className={cn(
                      buttonVariants({ size: 'sm', variant: 'outline' }),
                      'w-full',
                      isPendingExam || isPendingInterview
                        ? 'pointer-events-none opacity-50'
                        : null
                    )}
                  >
                    See attempts
                  </Link>
                ) : null}
                {!examData || !examData.examId ? (
                  <Button
                    className='w-full'
                    size='sm'
                    disabled={isPendingExam || isPendingInterview}
                    onClick={() => createExam({ moduleId })}
                  >
                    {isPendingExam ? (
                      <LuLoader2 className='size-4 mr-1.5 animate-spin' />
                    ) : null}
                    Start exam
                  </Button>
                ) : (
                  <Link
                    href={`/exam/${examData.examId}?pathId=${pathId}&moduleId=${moduleId}`}
                    className={cn(
                      buttonVariants({ size: 'sm' }),
                      'w-full',
                      isPendingExam || isPendingInterview
                        ? 'pointer-events-none opacity-50'
                        : null
                    )}
                  >
                    Go to exam
                  </Link>
                )}
              </div>
            </>
          ) : (
            <div className='flex items-center justify-center p-2'>
              <p className='flex items-center text-green-500 font-medium'>
                <HiOutlineCheckCircle
                  className='size-5 mr-1.5'
                  strokeWidth={2}
                />
                Exam passed
              </p>
            </div>
          )}
        </li>
        <li className='flex flex-col bg-background-2 border border-border rounded-lg p-3 lg:w-full'>
          {!interviewData || !interviewData.passed ? (
            <>
              <h4 className='font-medium'>Ready for the interview?</h4>
              <p className='text-sm text-muted-foreground'>
                Take a mock interview to practice your skills.
              </p>
              <div className='flex items-center gap-3 mt-5'>
                {interviewData?.interviewId ? (
                  <Link
                    href={`/interview/${interviewData.interviewId}/feedback?pathId=${pathId}&moduleId=${moduleId}`}
                    className={cn(
                      buttonVariants({ size: 'sm', variant: 'outline' }),
                      'w-full',
                      isPendingExam || isPendingInterview
                        ? 'pointer-events-none opacity-50'
                        : null
                    )}
                  >
                    See attempts
                  </Link>
                ) : null}
                {!interviewData || !interviewData.interviewId ? (
                  <Button
                    className='w-full'
                    size='sm'
                    disabled={isPendingExam || isPendingInterview}
                    onClick={() => createInterview({ moduleId })}
                  >
                    {isPendingInterview ? (
                      <LuLoader2 className='size-4 mr-1.5 animate-spin' />
                    ) : null}
                    Start interview
                  </Button>
                ) : (
                  <Link
                    href={`/interview/${interviewData.interviewId}?pathId=${pathId}&moduleId=${moduleId}`}
                    className={cn(
                      buttonVariants({ size: 'sm' }),
                      'w-full',
                      isPendingExam || isPendingInterview
                        ? 'pointer-events-none opacity-50'
                        : null
                    )}
                  >
                    Go to interview
                  </Link>
                )}
              </div>
            </>
          ) : (
            <div className='flex items-center justify-center p-2'>
              <p className='flex items-center text-green-500 font-medium'>
                <HiOutlineCheckCircle
                  className='size-5 mr-1.5'
                  strokeWidth={2}
                />
                Interview passed
              </p>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Assessments;
