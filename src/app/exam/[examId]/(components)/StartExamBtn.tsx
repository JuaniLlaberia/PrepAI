'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';
import { HiMiniArrowLongRight } from 'react-icons/hi2';

import { Button } from '@/components/ui/button';
import { createExamAttempt } from '@/actions/examAttempt';

const StartExamBtn = ({ examId }: { examId: string }) => {
  const router = useRouter();

  const { mutate: createAttempt, isPending } = useMutation({
    mutationKey: ['create-attemp'],
    mutationFn: createExamAttempt,
    onSuccess: attemptId => {
      toast.success('Starting mock exam...');
      router.push(`/exam/${examId}/answer?attemptId=${attemptId}`);
    },
    onError: () => toast.error('Failed to start mock exam'),
  });

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
      Start mock exam{' '}
      {!isPending ? (
        <HiMiniArrowLongRight className='size-4 ml-1.5 group-hover:translate-x-1 transition-transform' />
      ) : null}
    </Button>
  );
};

export default StartExamBtn;
