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
import { deleteInterviewAction } from '@/actions/interview';

const DeleteInterviewModal = ({
  interviewId,
  jobRole,
}: {
  interviewId: string;
  jobRole: string;
}) => {
  const { mutate: removeInterview, isPending } = useServerActionMutation(
    deleteInterviewAction,
    {
      mutationKey: ['delete-interview'],
      onSuccess: () =>
        toast.success('Interview has been deleted', {
          description: 'All data related to this interview has been deleted.',
        }),
      onError: () =>
        toast.error('Failed to delete interview', {
          description: 'We could not delate your interview. Please try again.',
        }),
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(() => {
    removeInterview({ interviewId });
  });

  return (
    <>
      <DialogTitle>Delete interview</DialogTitle>
      <DialogDescription>
        You are about to delete <span className='text-primary'>{jobRole}</span>{' '}
        interview. All data related will be deleted.
      </DialogDescription>
      <form onSubmit={onSubmit} className='flex flex-col gap-4'>
        <div>
          <label
            htmlFor='name'
            className='text-sm text-muted-foreground mb-1.5'
          >
            Enter the interview role{' '}
            <span className='text-primary font-semibold'>{jobRole}</span> to
            continue:
          </label>
          <Input
            id='name'
            type='text'
            {...register('name', {
              validate: {
                validator: fieldVal =>
                  fieldVal === jobRole ? true : 'Please confirm interview role',
              },
            })}
          />
          {errors.name?.message ? (
            <p className='text-sm text-red-500 px-1'>
              {errors.name?.message as string}
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

export default DeleteInterviewModal;
