'use client';

import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { LuLoader2 } from 'react-icons/lu';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useServerActionMutation } from '@/hooks/server-action-hooks';
import { startModuleAction } from '@/actions/modules';

const ModuleButton = ({
  pathId,
  moduleId,
  stageNum,
  inProgress,
}: {
  pathId: string;
  moduleId: string;
  stageNum: number;
  inProgress: boolean;
}) => {
  const router = useRouter();
  const { mutate: startModule, isPending } = useServerActionMutation(
    startModuleAction,
    {
      mutationKey: ['start-module'],
      onSuccess: () => router.push(`/path/${pathId}/module/${moduleId}`),
      onError: () =>
        toast.error('Failed to start module.', {
          description: "We could't start the module. Please try again!",
        }),
    }
  );

  return (
    <>
      {inProgress ? (
        <Link
          href={`/path/${pathId}/module/${moduleId}`}
          className={cn(buttonVariants({ size: 'lg' }))}
        >
          CONTINUE
          <HiOutlineArrowRight
            className='size-4 ml-2'
            strokeWidth={2}
          />
        </Link>
      ) : (
        <Button
          disabled={isPending}
          variant='outline'
          size='lg'
          className='border-2 min-w-[200px]'
          onClick={() => startModule({ pathId, moduleId })}
        >
          {isPending ? (
            <LuLoader2 className='size-4  animate-spin' />
          ) : (
            <>
              START STAGE {stageNum}
              <HiOutlineArrowRight
                className='size-4 ml-2'
                strokeWidth={2}
              />
            </>
          )}
        </Button>
      )}
    </>
  );
};

export default ModuleButton;
