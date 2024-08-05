'use client';

import Link from 'next/link';
import {
  HiOutlineClipboardDocumentList,
  HiOutlineMicrophone,
  HiOutlineRocketLaunch,
} from 'react-icons/hi2';
import { LuLoader2 } from 'react-icons/lu';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import Card from './Card';
import { createInterviewForModuleAction } from '@/actions/modules';
import { IInterviewActivity } from '@/db/models/Activity';
import { useServerActionMutation } from '@/hooks/server-action-hooks';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

type InterviewCardType = {
  interviewActivity: IInterviewActivity;
  pathId: string;
  moduleId: string;
};

const InterviewCard = ({
  interviewActivity,
  pathId,
  moduleId,
}: InterviewCardType) => {
  const router = useRouter();
  const { title, completed, type, _id, interviewId, passed } =
    interviewActivity;

  const { mutate: createInterview, isPending } = useServerActionMutation(
    createInterviewForModuleAction,
    {
      mutationKey: ['create-module-interview'],
      onSuccess: (interviewId: string) => {
        router.push(
          `/interview/${interviewId}?pathId=${pathId}&moduleId=${moduleId}`
        );
        toast.success('Interview was created successfully', {
          description: 'Redirecting...',
        });
      },
      onError: err => {
        console.log(err);
        toast.error('Something went wrong.', {
          description: 'We failed to create the interview. Please try again.',
        });
      },
    }
  );

  return (
    <Card
      title={title}
      type={type}
      completed={completed}
      comment='Interview • Final assesment'
      menuContent={
        <>
          <>
            {!passed ? (
              <DropdownMenuItem asChild>
                {interviewId ? (
                  <Link
                    href={{
                      pathname: `/interview/${interviewId}`,
                      query: {
                        pathId,
                        moduleId,
                        activityId: String(_id),
                      },
                    }}
                  >
                    <HiOutlineRocketLaunch className='size-4 mr-1.5' /> Go to
                    interview
                  </Link>
                ) : (
                  <button
                    disabled={isPending}
                    onClick={() =>
                      createInterview({
                        moduleId,
                        activityId: String(_id),
                      })
                    }
                  >
                    {!isPending ? (
                      <>
                        <HiOutlineRocketLaunch className='size-4 mr-1.5' />{' '}
                        Generate interview
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
            {/* <DropdownMenuItem
          onClick={() =>
            skipActivity({ pathId, moduleId, activityId: String(_id) })
          }
        >
          <HiOutlineCheckCircle className='size-4 mr-1.5' />
          Skip activity
        </DropdownMenuItem> */}
          </>
          {interviewId ? (
            <DropdownMenuItem asChild>
              <Link
                href={`/interview/${interviewId}/feedback?pathId=${pathId}&moduleId=${moduleId}`}
              >
                <HiOutlineClipboardDocumentList className='size-4 mr-1.5' /> See
                feedback
              </Link>
            </DropdownMenuItem>
          ) : null}
        </>
      }
      icon={<HiOutlineMicrophone className='size-5' strokeWidth={1.5} />}
    />
  );
};

export default InterviewCard;
