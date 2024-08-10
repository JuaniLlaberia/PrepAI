'use client';

import Link from 'next/link';
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
  subject,
}: {
  pathId: string;
  moduleId: string;
  subject: string;
  stageNum: number;
  inProgress: boolean;
}) => {
  const router = useRouter();
  const { mutate: startModule, isPending } = useServerActionMutation(
    startModuleAction,
    {
      mutationKey: ['start-module'],
      onSuccess: () => {
        toast.success('Module created successfully');
        router.push(`/path/${pathId}/module/${moduleId}`);
      },
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
          className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }))}
        >
          CONTINUE
        </Link>
      ) : (
        <Button
          disabled={isPending}
          size='lg'
          className='min-w-[200px]'
          onClick={() => startModule({ pathId, moduleId, subject })}
        >
          {isPending ? (
            <LuLoader2 className='size-4  animate-spin' />
          ) : (
            <>START STAGE {stageNum}</>
          )}
        </Button>
      )}
    </>
  );
};

export default ModuleButton;
