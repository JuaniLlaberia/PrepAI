'use client';

import { Experience } from '@prisma/client';
import { HiSparkles } from 'react-icons/hi2';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import InputWrapper from '@/components/InputWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { InterviewSchema } from '@/validators';
import { createInterview as createInterviewAction } from '@/actions/interview';

const NewInterviewForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
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

  const experienceLevels = Object.values(Experience);

  return (
    <form
      onSubmit={handleSubmit(data => createInterview({ data }))}
      className='flex flex-col gap-2'
    >
      <InputWrapper
        inputId='role'
        label='Role'
        error={errors.jobRole?.message as string}
      >
        <Input
          id='role'
          type='text'
          placeholder='Job role'
          {...register('jobRole')}
        />
      </InputWrapper>
      <InputWrapper
        inputId='experience'
        label='Experience level'
        error={errors.jobExperience?.message as string}
      >
        <Select onValueChange={val => setValue('jobExperience', val)}>
          <SelectTrigger
            id='experience'
            className='capitalize'
          >
            <SelectValue
              {...register('jobExperience')}
              placeholder='Select needed experience'
              className='hover:bg-background-2'
            />
          </SelectTrigger>
          <SelectContent id='experience'>
            {experienceLevels.map(level => (
              <SelectItem
                value={level}
                key={level}
                className='capitalize'
              >
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </InputWrapper>
      <InputWrapper
        inputId='description'
        label='Description'
        error={errors.jobDescription?.message as string}
      >
        <Textarea
          id='description'
          placeholder='Job description and what you need to know'
          rows={7}
          className='resize-none'
          {...register('jobDescription')}
        />
      </InputWrapper>
      <div className='mt-1 md:flex md:items-center md:justify-end'>
        <Button
          disabled={isPending}
          className='w-full md:w-auto'
        >
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
      </div>
    </form>
  );
};

export default NewInterviewForm;
