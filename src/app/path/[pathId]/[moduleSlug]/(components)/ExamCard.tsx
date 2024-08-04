'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { LuLoader2 } from 'react-icons/lu';
import {
  HiOutlineClipboardDocumentList,
  HiOutlineDocumentText,
  HiOutlineRocketLaunch,
} from 'react-icons/hi2';

import Card from './Card';
import { IExamActivity } from '@/db/models/Activity';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useServerActionMutation } from '@/hooks/server-action-hooks';
import { createExamForModuleAction } from '@/actions/modules';

type ExamCardType = {
  examActivity: IExamActivity;
  pathId: string;
  moduleId: string;
};

const ExamCard = ({ examActivity, pathId, moduleId }: ExamCardType) => {
  const router = useRouter();

  const { title, completed, type, difficulty, _id, examId, passed } =
    examActivity;

  const { mutate: createExam, isPending: isPendingExam } =
    useServerActionMutation(createExamForModuleAction, {
      mutationKey: ['create-module-exam'],
      onSuccess: (examId: string) => {
        router.push(`/exam/${examId}?pathId=${pathId}&moduleId=${moduleId}`);
        toast.success('Exam was created successfully', {
          description: 'Redirecting...',
        });
      },
      onError: err => {
        console.log(err);
        toast.error('Something went wrong.', {
          description: 'We failed to create the exam. Please try again.',
        });
      },
    });

  return (
    <Card
      title={title}
      type={type}
      completed={completed}
      comment={`Exam • ${
        difficulty[0].toUpperCase() + difficulty.slice(1)
      } difficulty`}
      menuContent={
        <>
          {/* If it exist redirect, else generate exam */}
          {!passed ? (
            <DropdownMenuItem asChild>
              {examId ? (
                <Link
                  href={{
                    pathname: `/exam/${examId}`,
                    query: {
                      pathId,
                      moduleId,
                      activityId: String(_id),
                    },
                  }}
                >
                  <HiOutlineRocketLaunch className='size-4 mr-1.5' /> Go to exam
                </Link>
              ) : (
                <button
                  disabled={isPendingExam}
                  onClick={() =>
                    createExam({
                      moduleId,
                      difficulty,
                      activityId: String(_id),
                    })
                  }
                >
                  {!isPendingExam ? (
                    <>
                      <HiOutlineRocketLaunch className='size-4 mr-1.5' />{' '}
                      Generate exam
                    </>
                  ) : (
                    <>
                      <LuLoader2 className='size-4 animate-spin' />
                      Generating...
                    </>
                  )}
                </button>
              )}
            </DropdownMenuItem>
          ) : null}
          {/* To skip (mark as complete the activity) */}
          {/* {!completed && !passed ? (
            <DropdownMenuItem
              onClick={() =>
                skipActivity({ pathId, moduleId, activityId: String(_id) })
              }
            >
              <HiOutlineCheckCircle className='size-4 mr-1.5' />
              Skip activity
            </DropdownMenuItem>
          ) : null} */}
          {/* Takes us to the exam results */}
          {examId ? (
            <DropdownMenuItem asChild>
              <Link
                href={`/exam/${examId}/results?pathId=${pathId}&moduleId=${moduleId}`}
              >
                <HiOutlineClipboardDocumentList className='size-4 mr-1.5' /> See
                results
              </Link>
            </DropdownMenuItem>
          ) : null}
        </>
      }
      icon={<HiOutlineDocumentText className='size-5' strokeWidth={1.5} />}
    />
  );
};

export default ExamCard;
