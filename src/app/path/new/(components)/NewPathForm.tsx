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
import { PathSchema } from '@/validators';
import { useMultiStepForm } from '@/hooks/useMultistepForm';
import { createPath as createPathAction } from '@/actions/path';

const NewPathForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PathSchema),
  });
  const { mutate: createPath, isPending } = useMutation({
    mutationKey: ['create-path'],
    mutationFn: createPathAction,
    onSuccess: pathId => {
      toast.success('Path created successfully');
      router.push(`/path/${pathId}`);
    },
    onError: () => toast.error('Failed to create path'),
  });

  const steps = [['jobPosition'], ['jobExperience'], ['topics']];

  const { crrIndex, crrStep, nextStep, prevStep, isLastStep } =
    useMultiStepForm([
      <motion.div
        initial={{ x: '50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-50%', opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        key='position-step'
      >
        <p className='text-3xl font-medium mb-3 text-center'>
          What&apos;s the job position you want to prepare?
        </p>
        <InputWrapper
          inputId='role'
          error={errors.jobPosition?.message as string}
        >
          <Input
            id='position'
            type='text'
            placeholder='Position you are applying'
            {...register('jobPosition')}
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
        <p className='text-3xl font-medium mb-3 text-center'>
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
                { label: 'Ssr', value: 'ssr' },
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
        key='topics'
      >
        <p className='text-3xl font-medium mb-3 text-center'>
          Describe what topics you need to practice
        </p>
        <InputWrapper inputId='topics' error={errors.topics?.message as string}>
          <Textarea
            id='topics'
            placeholder='Topics you need to know'
            rows={7}
            className='resize-none lg:mt-4'
            {...register('topics')}
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
          ? handleSubmit(data => createPath({ data }))
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

export default NewPathForm;
