'use client';

import Link from 'next/link';
import {
  HiOutlineClipboardDocumentList,
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
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type InterviewCardType = {
  interviewActivity: IInterviewActivity;
  pathId: string;
  moduleId: string;
  skipActivity: (activityId: string) => void;
};

const InterviewCard = ({
  interviewActivity,
  pathId,
  moduleId,
  skipActivity,
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
      onError: () =>
        toast.error('Something went wrong.', {
          description: 'We failed to create the interview. Please try again.',
        }),
    }
  );

  return (
    <Card
      title={title}
      type={type}
      completed={completed}
      comment='Final assesment'
      menuContent={
        !completed ? (
          <>
            {!passed ? (
              <DropdownMenuItem onClick={() => skipActivity(String(_id))}>
                <HiOutlineRocketLaunch className='size-4 mr-1.5' />
                Skip activity
              </DropdownMenuItem>
            ) : null}
            {interviewId ? (
              <DropdownMenuItem asChild>
                <Link
                  href={`/interview/${interviewId}/feedback?pathId=${pathId}&moduleId=${moduleId}`}
                >
                  <HiOutlineClipboardDocumentList className='size-4 mr-1.5' />{' '}
                  See feedback
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
              {!completed && interviewId ? (
                <Link
                  className={cn(
                    buttonVariants({ size: 'sm' }),
                    'min-w-[150px]'
                  )}
                  href={{
                    pathname: `/interview/${interviewId}`,
                    query: {
                      pathId,
                      moduleId,
                      activityId: String(_id),
                    },
                  }}
                >
                  {completed ? 'Re-take interview' : 'Go to interview'}
                </Link>
              ) : (
                <Button
                  size='sm'
                  variant={completed ? 'secondary' : 'default'}
                  onClick={() =>
                    createInterview({
                      pathId,
                      moduleId,
                      activityId: String(_id),
                    })
                  }
                  disabled={isPending}
                  className='min-w-[150px]'
                >
                  {!isPending ? (
                    <>Generate interview</>
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
              href={`/interview/${interviewId}/results?pathId=${pathId}&moduleId=${moduleId}`}
            >
              See feedback
            </Link>
          )}
        </>
      }
    />
  );
};

export default InterviewCard;
