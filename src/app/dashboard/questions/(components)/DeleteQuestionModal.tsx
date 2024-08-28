'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { LuLoader2 } from 'react-icons/lu';
import { HiOutlineExclamationCircle } from 'react-icons/hi2';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useServerActionMutation } from '@/hooks/server-action-hooks';
import { deleteQuestionAction } from '@/actions/question';

const DeleteQuestionModal = ({ questionId }: { questionId: string }) => {
  const { mutate: deleteQuestion, isPending } = useServerActionMutation(
    deleteQuestionAction,
    {
      mutationKey: ['delete-question'],
      onSuccess: () => toast.success('You question was deleted successfully'),
      onError: () => toast.error('Failed to your question. Please try again'),
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(() => {
    deleteQuestion({ questionId });
  });

  return (
    <>
      <DialogTitle>Delete question</DialogTitle>
      <DialogDescription>
        You are about to delete{' '}
        <span className='text-primary font-medium'>this question</span>. All
        data related will be deleted.
      </DialogDescription>
      <form onSubmit={onSubmit} className='flex flex-col gap-4'>
        <div>
          <label
            htmlFor='subject'
            className='text-sm text-muted-foreground mb-1.5'
          >
            To verify, type{' '}
            <span className='text-primary font-semibold'>
              delete my question
            </span>
            :
          </label>
          <Input
            id='confirmation'
            type='text'
            {...register('confirmation', {
              validate: {
                validator: fieldVal =>
                  fieldVal === 'delete my question'
                    ? true
                    : 'Please confirm to continue',
              },
            })}
          />
          {errors.confirmation?.message ? (
            <p className='text-sm text-red-500 px-1'>
              {errors.confirmation?.message as string}
            </p>
          ) : null}
        </div>
        <Alert variant='destructive'>
          <AlertTitle className='flex items-center gap-2 mb-0'>
            <HiOutlineExclamationCircle className='size-5' />
            Warning. This action is not reversible
          </AlertTitle>
        </Alert>
        <div className='flex justify-between mt-2'>
          <DialogClose asChild>
            <Button disabled={isPending} variant='outline' size='sm'>
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isPending} size='sm' variant='destructive'>
            {isPending ? (
              <LuLoader2 className='size-4 mr-1.5 animate-spin' />
            ) : null}
            Confirm
          </Button>
        </div>
      </form>
    </>
  );
};

export default DeleteQuestionModal;
