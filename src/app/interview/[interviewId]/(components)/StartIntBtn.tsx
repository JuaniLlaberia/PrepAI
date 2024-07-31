'use client';

import { useRouter } from 'next/navigation';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';
import { HiMiniArrowLongRight } from 'react-icons/hi2';

import { Button } from '@/components/ui/button';
import { useServerActionMutation } from '@/hooks/server-action-hooks';
import { createInterviewAttemptAction } from '@/actions/interviewAttempt';

const StartIntBtn = ({
  interviewId,
  moduleId,
  pathId,
}: {
  interviewId: string;
  moduleId?: string;
  pathId?: string;
}) => {
  const router = useRouter();

  const { mutate: createInterviewAttempt, isPending } = useServerActionMutation(
    createInterviewAttemptAction,
    {
      mutationKey: ['create-attemp'],
      onSuccess: (attemptId: string) => {
        toast.success(`Starting ${!moduleId ? 'mock' : ''} interview...`);
        if (moduleId)
          router.push(
            `/interview/${interviewId}/answer?attemptId=${attemptId}&pathId=${pathId}&moduleId=${moduleId}`
          );
        else
          router.push(
            `/interview/${interviewId}/answer?attemptId=${attemptId}`
          );
      },
      onError: () => toast.error('Failed to start interview'),
    }
  );

  return (
    <Button
      size='lg'
      className='w-full group'
      disabled={isPending}
      onClick={() => createInterviewAttempt({ interviewId })}
    >
      {isPending ? (
        <LuLoader2 strokeWidth={2} className='animate-spin size-4 mr-1.5' />
      ) : null}
      Start {!moduleId ? 'mock' : ''} interview
      {!isPending ? (
        <HiMiniArrowLongRight className='size-4 ml-1.5 group-hover:translate-x-1 transition-transform' />
      ) : null}
    </Button>
  );
};

export default StartIntBtn;
