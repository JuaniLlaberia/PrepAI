'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';
import { HiMiniArrowLongRight } from 'react-icons/hi2';

import { createInterviewAttempt } from '@/actions/attemps';
import { Button } from '@/components/ui/button';

const StartIntBtn = ({ interviewId }: { interviewId: string }) => {
  const router = useRouter();

  const { mutate: createAttempt, isPending } = useMutation({
    mutationKey: ['create-attemp'],
    mutationFn: createInterviewAttempt,
    onSuccess: attemptId => {
      toast.success('Starting interview...');
      router.push(`/interview/${interviewId}/answer?attemptId=${attemptId}`);
    },
    onError: () => toast.error('Failed to start interview'),
  });

  return (
    <Button
      size='lg'
      className='w-full group'
      disabled={isPending}
      onClick={() => createAttempt({ interviewId })}
    >
      {isPending ? (
        <LuLoader2 strokeWidth={2} className='animate-spin size-4 mr-1.5' />
      ) : null}
      Start interview
      {!isPending ? (
        <HiMiniArrowLongRight className='size-4 ml-1.5 group-hover:translate-x-1 transition-transform' />
      ) : null}
    </Button>
  );
};

export default StartIntBtn;
