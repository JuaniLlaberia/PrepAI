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
import { deleteExamAction } from '@/actions/exams';

const DeleteExamModal = ({
  examId,
  subject,
}: {
  examId: string;
  subject: string;
}) => {
  const { mutate: deleteExam, isPending } = useServerActionMutation(
    deleteExamAction,
    {
      mutationKey: ['delete-exam'],
      onSuccess: () =>
        toast.success('Mock exam has been deleted', {
          description: 'All data related to this mock exam has been deleted.',
        }),
      onError: () =>
        toast.error('Failed to delete mock exam', {
          description: 'We could not delate your mock exam. Please try again.',
        }),
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(() => {
    deleteExam({ examId });
  });

  return (
    <>
      <DialogTitle>Delete mock exam</DialogTitle>
      <DialogDescription>
        You are about to delete <span className='text-primary'>{subject}</span>{' '}
        mock exam. All data related will be deleted.
      </DialogDescription>
      <form onSubmit={onSubmit} className='flex flex-col gap-4'>
        <div>
          <label
            htmlFor='subject'
            className='text-sm text-muted-foreground mb-1.5'
          >
            Enter the exam subject{' '}
            <span className='text-primary font-semibold'>{subject}</span> to
            continue:
          </label>
          <Input
            id='subject'
            type='text'
            {...register('subject', {
              validate: {
                validator: fieldVal =>
                  fieldVal === subject ? true : 'Please confirm exam subject',
              },
            })}
          />
          {errors.subject?.message ? (
            <p className='text-sm text-red-500 px-1'>
              {errors.subject?.message as string}
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

export default DeleteExamModal;
