'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { LuLoader2 } from 'react-icons/lu';
import {
  HiOutlineClipboardDocumentList,
  HiOutlineRocketLaunch,
} from 'react-icons/hi2';

import Card from './Card';
import { IExamActivity } from '@/db/models/Activity';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useServerActionMutation } from '@/hooks/server-action-hooks';
import { createExamForModuleAction } from '@/actions/modules';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ExamCardType = {
  examActivity: IExamActivity;
  pathId: string;
  moduleId: string;
  skipActivity: (activityId: string) => void;
};

const ExamCard = ({
  examActivity,
  pathId,
  moduleId,
  skipActivity,
}: ExamCardType) => {
  const router = useRouter();

  const { title, completed, type, difficulty, _id, examId, passed, examType } =
    examActivity;

  const { mutate: createExam, isPending: isPending } = useServerActionMutation(
    createExamForModuleAction,
    {
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
    }
  );

  return (
    <Card
      title={title}
      type={type}
      completed={completed}
      comment={`${
        difficulty[0].toUpperCase() + difficulty.slice(1)
      } difficulty`}
      menuContent={
        !completed ? (
          <>
            {!passed ? (
              <DropdownMenuItem onClick={() => skipActivity(String(_id))}>
                <HiOutlineRocketLaunch className='size-4 mr-1.5' />
                Skip activity
              </DropdownMenuItem>
            ) : null}
            {examId ? (
              <DropdownMenuItem asChild>
                <Link
                  href={`/exam/${examId}/results?pathId=${pathId}&moduleId=${moduleId}`}
                >
                  <HiOutlineClipboardDocumentList className='size-4 mr-1.5' />{' '}
                  See results
                </Link>
              </DropdownMenuItem>
            ) : null}
          </>
        ) : null
      }
      actionButton={
        <>
          {!passed ? (
            <>
              {!completed && examId ? (
                <Link
                  className={cn(
                    buttonVariants({ size: 'sm' }),
                    'min-w-[150px]'
                  )}
                  href={{
                    pathname: `/exam/${examId}`,
                    query: {
                      pathId,
                      moduleId,
                      activityId: String(_id),
                    },
                  }}
                >
                  {completed ? 'Re-take exam' : 'Go to exam'}
                </Link>
              ) : (
                <Button
                  size='sm'
                  variant={completed ? 'secondary' : 'default'}
                  onClick={() =>
                    createExam({
                      pathId,
                      moduleId,
                      difficulty,
                      activityId: String(_id),
                      type: examType,
                    })
                  }
                  disabled={isPending}
                  className='min-w-[150px]'
                >
                  {!isPending ? (
                    <>Generate exam</>
                  ) : (
                    <>
                      <LuLoader2 className='size-4 mr-1.5 animate-spin' />
                      Generating...
                    </>
                  )}
                </Button>
              )}
            </>
          ) : (
            <Link
              className={cn(
                buttonVariants({ size: 'sm', variant: 'secondary' }),
                'min-w-[150px]'
              )}
              href={`/exam/${examId}/results?pathId=${pathId}&moduleId=${moduleId}`}
            >
              See results
            </Link>
          )}
        </>
      }
    />
  );
};

export default ExamCard;
