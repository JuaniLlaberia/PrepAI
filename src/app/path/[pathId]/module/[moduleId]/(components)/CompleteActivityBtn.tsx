'use client';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { LuLoader2 } from 'react-icons/lu';
import { HiCheckCircle } from 'react-icons/hi2';

import { Button } from '@/components/ui/button';
import { useServerActionMutation } from '@/hooks/server-action-hooks';
import { skipActivityAction } from '@/actions/modules';

type CompleteBtnType = {
  pathId: string;
  activityId: string;
};

const CompleteActivityBtn = ({
  pathId,
  activityId,
}: CompleteBtnType) => {
  const router = useRouter();
  const { mutate: completeActivity, isPending } = useServerActionMutation(
    skipActivityAction,
    {
      mutationKey: ['complete-activity'],
      onSuccess: () => {
        router.back();
      },
      onError: () => toast.error('Failed to complete activity'),
    }
  );

  return (
    <Button
      className='w-full'
      disabled={isPending}
      onClick={() => completeActivity({ pathId, activityId })}
    >
      {isPending ? (
        <LuLoader2 className='size-4 animate-spin' />
      ) : (
        <>
          <HiCheckCircle className='size-4 mr-1.5' />
          Mark as completed
        </>
      )}
    </Button>
  );
};

export default CompleteActivityBtn;
