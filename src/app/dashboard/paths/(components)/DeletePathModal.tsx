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
import { deletePathAction } from '@/actions/path';

const DeletePathModal = ({
  pathId,
  jobPosition,
}: {
  pathId: string;
  jobPosition: string;
}) => {
  const { mutate: removePath, isPending } = useServerActionMutation(
    deletePathAction,
    {
      mutationKey: ['delete-path'],
      onSuccess: () =>
        toast.success('Path has been deleted', {
          description: 'All data related to this path has been deleted.',
        }),
      onError: () =>
        toast.error('Failed to delete path', {
          description: 'We could not delate your path. Please try again.',
        }),
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(() => {
    removePath({ pathId });
  });

  return (
    <>
      <DialogTitle>Delete preparation path</DialogTitle>
      <DialogDescription>
        You are about to delete{' '}
        <span className='text-primary'>{jobPosition}</span> path. All data
        related will be deleted.
      </DialogDescription>
      <form onSubmit={onSubmit} className='flex flex-col gap-4'>
        <div>
          <label
            htmlFor='name'
            className='text-sm text-muted-foreground mb-1.5'
          >
            Enter the path position{' '}
            <span className='text-primary font-semibold'>{jobPosition}</span> to
            continue:
          </label>
          <Input
            id='name'
            type='text'
            {...register('name', {
              validate: {
                validator: fieldVal =>
                  fieldVal === jobPosition
                    ? true
                    : 'Please confirm path position',
              },
            })}
          />
          {errors.name?.message ? (
            <p className='text-sm text-red-500 px-1'>
              {errors.name?.message as string}
            </p>
          ) : null}
        </div>
        <div>
          <label
            htmlFor='confirm'
            className='text-sm text-muted-foreground mb-1.5'
          >
            To confirm, type{' '}
            <span className='text-primary font-semibold'>delete my path</span>{' '}
            below:
          </label>
          <Input
            id='confirm'
            type='text'
            {...register('confirm', {
              validate: {
                validator: fieldVal =>
                  fieldVal === 'delete my path'
                    ? true
                    : 'Please confirm in order to continue',
              },
            })}
          />
          {errors.confirm?.message ? (
            <p className='text-sm text-red-500 px-1'>
              {errors.confirm?.message as string}
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
          <Button disabled={isPending} size='sm'>
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

export default DeletePathModal;
