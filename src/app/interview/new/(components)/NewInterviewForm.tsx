'use client';

import { HiMiniArrowLongLeft, HiSparkles } from 'react-icons/hi2';
import { useForm } from 'react-hook-form';
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
import { createInterviewAction } from '@/actions/interview';
import { useMultiStepForm } from '@/hooks/useMultistepForm';
import { InterviewSchema } from '@/lib/validators';
import { useServerActionMutation } from '@/hooks/server-action-hooks';

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

  const { mutate: createInterview, isPending } = useServerActionMutation(
    createInterviewAction,
    {
      mutationKey: ['create-interview'],
      onSuccess: interviewId => {
        toast.success('Interview created successfully');
        router.push(`/interview/${interviewId}`);
      },
      onError: () => toast.error('Failed to create interview'),
    }
  );

  const steps = [['jobRole'], ['jobExperience'], ['jobDescription']];

  const { crrIndex, crrStep, nextStep, prevStep, isLastStep } =
    useMultiStepForm([
      <motion.div
        initial={{ x: '50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-50%', opacity: 0 }}
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
        <div className='mt-5 md:mt-7 flex flex-col gap-2 md:flex-row-reverse items-end'>
          <Button disabled={isPending} className='w-full md:w-auto px-6'>
            Next
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
      <motion.div
        initial={{ x: '50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-50%', opacity: 0 }}
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
        <div className='mt-3 md:mt-5 flex flex-col gap-2 md:flex-row-reverse items-end'>
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
          ? handleSubmit(({ jobRole, jobExperience, jobDescription }) =>
              createInterview({ jobRole, jobDescription, jobExperience })
            )
          : async e => {
              e.preventDefault();

              const fields = steps[crrIndex];
              const isValid = await trigger(fields);

              if (!isValid) return;

              nextStep();
            }
      }
      className='flex flex-col gap-2 overflow-hidden px-1 pb-4'
    >
      {crrStep}
    </form>
  );
};

export default NewInterviewForm;
