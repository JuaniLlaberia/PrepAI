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
import { deleteUserAction } from '@/actions/user';

const DeleteAccModal = () => {
  const { mutate: deleteUser, isPending } = useServerActionMutation(
    deleteUserAction,
    {
      mutationKey: ['delete-user'],
      onSuccess: () =>
        toast.success('You account was deleted successfully', {
          description: 'All data related has been deleted.',
        }),
      onError: () =>
        toast.error('Failed to your account', {
          description: 'We could not delate your account. Please try again.',
        }),
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(() => {
    deleteUser({});
  });

  return (
    <>
      <DialogTitle>Delete account</DialogTitle>
      <DialogDescription>
        You are about to delete{' '}
        <span className='text-primary font-medium'>your account</span>. All data
        related will be deleted.
      </DialogDescription>
      <form onSubmit={onSubmit} className='flex flex-col gap-4'>
        <div>
          <label
            htmlFor='subject'
            className='text-sm text-muted-foreground mb-1.5'
          >
            To verify, type{' '}
            <span className='text-primary font-semibold'>
              delete my account
            </span>
            :
          </label>
          <Input
            id='confirmation'
            type='text'
            {...register('confirmation', {
              validate: {
                validator: fieldVal =>
                  fieldVal === 'delete my account'
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

export default DeleteAccModal;
