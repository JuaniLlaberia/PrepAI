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
import { Textarea } from '@/components/ui/textarea';
import { InterviewSchema } from '@/validators';
import { createInterview as createInterviewAction } from '@/actions/interview';
import { useMultiStepForm } from '@/hooks/useMultistepForm';

const NewInterviewForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(InterviewSchema),
  });
  const { mutate: createInterview, isPending } = useMutation({
    mutationKey: ['create-interview'],
    mutationFn: createInterviewAction,
    onSuccess: interviewId => {
      toast.success('Interview created successfully');
      router.push(`/interview/${interviewId}`);
    },
    onError: () => toast.error('Failed to create interview'),
  });

  const steps = [['jobRole'], ['jobExperience'], ['jobDescription']];

  const { crrIndex, crrStep, nextStep, prevStep, isFirstStep, isLastStep } =
    useMultiStepForm([
      <motion.div
        initial={{ x: '50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        key='role-step'
      >
        <p className='text-3xl font-medium tracking-tight mb-3 text-center'>
          What&apos;s the job role?
        </p>
        <InputWrapper inputId='role' error={errors.jobRole?.message as string}>
          <Input
            id='role'
            type='text'
            placeholder='Role you are applying'
            {...register('jobRole')}
            className='h-12 lg:mt-4'
          />
        </InputWrapper>
      </motion.div>,
      <motion.div
        initial={{ x: '50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        key='experience-step'
      >
        <p className='text-3xl font-medium tracking-tight mb-3 text-center'>
          What&apos;s the required experience level?
        </p>
        <div className='text-center lg:pt-4 lg:text-start'>
          <InputWrapper
            inputId='experience'
            error={errors.jobExperience?.message as string}
          >
            <Radio
              options={[
                { label: 'Intership', value: 'intership' },
                { label: 'Junior', value: 'junior' },
                { label: 'Srr', value: 'ssr' },
                { label: 'Senior', value: 'senior' },
                { label: 'Leader', value: 'lead' },
              ]}
              fieldName='jobExperience'
              register={register}
            />
          </InputWrapper>
        </div>
      </motion.div>,
      <motion.div
        initial={{ x: '50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        key='description-step'
      >
        <p className='text-3xl font-medium tracking-tight mb-3 text-center'>
          Describe what you need for this role
        </p>
        <InputWrapper
          inputId='description'
          error={errors.jobDescription?.message as string}
        >
          <Textarea
            id='description'
            placeholder='Job description and what you need to know'
            rows={7}
            className='resize-none lg:mt-4'
            {...register('jobDescription')}
          />
        </InputWrapper>
      </motion.div>,
    ]);

  return (
    <form
      onSubmit={
        isLastStep
          ? handleSubmit(data => createInterview({ data }))
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
      <motion.div
        initial={{ x: '50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className='mt-3 flex flex-col gap-2 md:flex-row-reverse md:justify-between'
      >
        <Button disabled={isPending} className='w-full md:w-auto' size='lg'>
          {isPending ? (
            <LuLoader2 strokeWidth={2} className='animate-spin size-4 mr-1.5' />
          ) : isLastStep ? (
            <HiSparkles className='size-4 mr-1.5' />
          ) : null}
          {!isLastStep ? 'Next' : 'Create with AI'}
        </Button>
        {!isFirstStep && (
          <Button
            onClick={e => prevStep(e)}
            variant='ghost'
            size='lg'
            className='w-full md:w-auto'
          >
            <HiMiniArrowLongLeft className='size-4 mr-1.5' />
            Go back
          </Button>
        )}
      </motion.div>
    </form>
  );
};

export default NewInterviewForm;
