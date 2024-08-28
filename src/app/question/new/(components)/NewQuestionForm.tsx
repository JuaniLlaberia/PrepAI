'use client';

import { HiSparkles } from 'react-icons/hi2';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import InputWrapper from '@/components/InputWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QuestionSchema } from '@/lib/validators';
import { useServerActionMutation } from '@/hooks/server-action-hooks';
import { createQuestionWithAnswerAction } from '@/actions/question';

const NewQuestionForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(QuestionSchema),
  });

  const { mutate: createQuestion, isPending } = useServerActionMutation(
    createQuestionWithAnswerAction,
    {
      mutationKey: ['create-question'],
      onSuccess: (questionId: string) => {
        toast.success('Question created successfully');
        router.push(`/question/${questionId}`);
      },
      onError: error => {
        console.log(error);
        toast.error('Failed to create questiopn');
      },
    }
  );

  return (
    <form
      onSubmit={handleSubmit(data => {
        createQuestion({ question: data.question });
      })}
      className='flex flex-col gap-2 overflow-hidden px-1 pb-4'
    >
      <motion.div
        initial={{ x: '50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-50%', opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        key='type-step'
      >
        <p className='text-3xl font-medium tracking-tight mb-3 text-center'>
          What interview question do you need AI to answer?
        </p>
        <InputWrapper
          inputId='question'
          error={errors.question?.message as string}
        >
          <Input
            id='question'
            type='text'
            placeholder='Your interview question'
            {...register('question')}
            className='h-12 lg:mt-4'
          />
        </InputWrapper>
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
            Answer with AI
          </Button>
        </div>
      </motion.div>
    </form>
  );
};

export default NewQuestionForm;
