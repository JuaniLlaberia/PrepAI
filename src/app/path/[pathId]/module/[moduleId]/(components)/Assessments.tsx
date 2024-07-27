'use client';

import Link from 'next/link';
import { ObjectId } from 'mongoose';
import { HiOutlineCheckCircle } from 'react-icons/hi2';
import { usePathname, useRouter } from 'next/navigation';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  createExamForModule,
  createInterviewForModule,
} from '@/actions/modules';
import { cn } from '@/lib/utils';

type AssessmentsType = {
  moduleId: string;
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
  examData,
  interviewData,
}: AssessmentsType) => {
  const router = useRouter();
  const pathname = usePathname();

  //Mutation with action to handle new exams for module
  const { mutate: createExam, isPending: isPendingExam } = useMutation({
    mutationKey: ['create-module-exam'],
    mutationFn: createExamForModule,
    onSuccess: (examId: string) => {
      router.push(`${pathname}/exam/${examId}`);
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
    useMutation({
      mutationKey: ['create-module-interview'],
      mutationFn: createInterviewForModule,
      onSuccess: (interviewId: string) => {
        router.push(`${pathname}/interview/${interviewId}`);
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
          {!examData.passed ? (
            <>
              <h4 className='font-medium'>Ready for the exam?</h4>
              <p className='text-sm text-muted-foreground'>
                Take a mock exam to validate your knowledge.
              </p>
              <div className='flex items-center gap-3 mt-5'>
                {examData.examId ? (
                  <Link
                    href={`${pathname}/exam/${examData.examId}/results`}
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
                {!examData.examId ? (
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
                    href={`${pathname}/exam/${examData.examId}`}
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
          {!interviewData.passed ? (
            <>
              <h4 className='font-medium'>Ready for the interview?</h4>
              <p className='text-sm text-muted-foreground'>
                Take a mock interview to practice your skills.
              </p>
              <div className='flex items-center gap-3 mt-5'>
                {interviewData.interviewId ? (
                  <Link
                    href={`${pathname}/interview/${interviewData.interviewId}/feedback`}
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
                {!interviewData.interviewId ? (
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
                    href={`${pathname}/interview/${interviewData.interviewId}`}
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
