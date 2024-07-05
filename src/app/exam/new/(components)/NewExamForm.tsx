'use client';

import { HiMiniArrowLongLeft, HiSparkles } from 'react-icons/hi2';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import InputWrapper from '@/components/InputWrapper';
import Radio from '@/components/ui/radio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ExamSchema } from '@/validators';
import { useMultiStepForm } from '@/hooks/useMultistepForm';
import { createExam as createExamAction } from '@/actions/exams';

const NewExamForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ExamSchema),
  });
  const { mutate: createExam, isPending } = useMutation({
    mutationKey: ['create-exam'],
    mutationFn: createExamAction,
    onSuccess: interviewId => {
      toast.success('Mock exam created successfully');
      router.push(`/exam/${interviewId}`);
    },
    onError: () => toast.error('Failed to create mock exam'),
  });

  const steps = [['subject'], ['difficulty']];

  const { crrIndex, crrStep, nextStep, prevStep, isLastStep } =
    useMultiStepForm([
      <motion.div
        initial={{ x: '50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-50%', opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        key='subject-step'
      >
        <p className='text-3xl font-medium tracking-tight mb-3 text-center'>
          What topic do you need to practice?
        </p>
        <InputWrapper
          inputId='subject'
          error={errors.subject?.message as string}
        >
          <Input
            id='subject'
            type='text'
            placeholder='Mock exam topic'
            {...register('subject')}
            className='h-12 lg:mt-4'
          />
        </InputWrapper>
        <div className='flex justify-end mt-3 md:mt-5'>
          <Button disabled={isPending} className='w-full md:w-auto px-6'>
            Next
          </Button>
        </div>
      </motion.div>,
      <motion.div
        initial={{ x: '50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-50%', opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        key='difficulty-step'
      >
        <p className='text-3xl font-medium tracking-tight mb-3 text-center'>
          What&apos;s the difficulty level?
        </p>
        <div className='text-center lg:pt-4 lg:text-start'>
          <InputWrapper
            inputId='difficulty'
            error={errors.difficulty?.message as string}
          >
            <Radio
              options={[
                { label: 'Easy', value: 'easy' },
                { label: 'Medium', value: 'medium' },
                { label: 'Hard', value: 'hard' },
              ]}
              fieldName='difficulty'
              register={register}
            />
          </InputWrapper>
        </div>
        <div className='mt-5 md:mt-7 flex flex-col gap-2 md:flex-row-reverse items-end'>
          <Button disabled={isPending} className='w-full md:w-auto px-6'>
            {isPending ? (
              <LuLoader2
                strokeWidth={2}
                className='animate-spin size-4 mr-1.5'
              />
            ) : (
              <HiSparkles className='size-4 mr-1.5' />
            )}
            Create with AI
          </Button>
          <Button
            onClick={e => prevStep(e)}
            variant='ghost'
            className='w-full md:w-auto px-6'
          >
            <HiMiniArrowLongLeft className='size-4 mr-1.5' />
            Go back
          </Button>
        </div>
      </motion.div>,
    ]);

  return (
    <form
      onSubmit={
        isLastStep
          ? handleSubmit(data =>
              createExam({ subject: data.subject, difficulty: data.difficulty })
            )
          : async e => {
              e.preventDefault();

              const fields = steps[crrIndex];
              const isValid = await trigger(fields);

              if (!isValid) return;

              nextStep();
            }
      }
      className='flex flex-col gap-2'
    >
      {crrStep}
    </form>
  );
};

export default NewExamForm;
