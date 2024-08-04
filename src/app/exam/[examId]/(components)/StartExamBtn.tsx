'use client';

import { usePathname, useRouter } from 'next/navigation';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';
import { HiMiniArrowLongRight } from 'react-icons/hi2';

import { Button } from '@/components/ui/button';
import { useServerActionMutation } from '@/hooks/server-action-hooks';
import { createExamAttemptAction } from '@/actions/examAttempt';

const StartExamBtn = ({
  examId,
  moduleId,
  pathId,
}: {
  examId: string;
  moduleId?: string;
  pathId?: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const { mutate: createAttempt, isPending } = useServerActionMutation(
    createExamAttemptAction,
    {
      mutationKey: ['create-attemp'],
      onSuccess: () => {
        toast.success(`Starting ${!moduleId ? 'mock' : ''} exam...`);
        if (moduleId)
          router.push(
            `${pathname}/answer?pathId=${pathId}&moduleId=${moduleId}`
          );
        else router.push(`${pathname}/answer`);
      },
      onError: () => toast.error('Failed to start mock exam'),
    }
  );

  return (
    <Button
      size='lg'
      className='w-full group'
      disabled={isPending}
      onClick={() => createAttempt({ examId })}
    >
      {isPending ? (
        <LuLoader2 strokeWidth={2} className='animate-spin size-4 mr-1.5' />
      ) : null}
      Start {!moduleId ? 'mock' : ''} exam
      {!isPending ? (
        <HiMiniArrowLongRight className='size-4 ml-1.5 group-hover:translate-x-1 transition-transform' />
      ) : null}
    </Button>
  );
};

export default StartExamBtn;
