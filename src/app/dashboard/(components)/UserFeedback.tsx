'use client';

import { HiOutlineCheck, HiOutlineXMark } from 'react-icons/hi2';
import { MdOutlineFeedback } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { LuLoader2 } from 'react-icons/lu';
import { useState } from 'react';

import InputWrapper from '@/components/InputWrapper';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useServerActionMutation } from '@/hooks/server-action-hooks';
import { FeedbackSchema } from '@/lib/validators';
import { sendUserFeedbackAction } from '@/actions/feedback';

const UserFeedbackBtn = ({ className }: { className?: string }) => (
  <Button variant='secondary' size='sm' className={cn('text-black', className)}>
    <MdOutlineFeedback className='size-4 mr-1.5' />
    Feedback
  </Button>
);

const UserFeedbackForm = () => {
  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);
  const { mutate: sendFeedback, isPending } = useServerActionMutation(
    sendUserFeedbackAction,
    {
      mutationKey: ['send-user-feedback'],
      onSuccess: () => {
        toast.success('Feedback sent successfully');
        setWasSubmitted(true);
      },
      onError: () => toast.error('Failed to send feedback'),
    }
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({ resolver: zodResolver(FeedbackSchema) });

  const onSubmit = handleSubmit(({ email, feedback }) => {
    sendFeedback({ email, feedback });
  });

  if (wasSubmitted)
    return (
      <div className='flex flex-col justify-center items-center p-4'>
        <div className='flex items-center justify-center size-10 rounded-full bg-violet-500 mb-3'>
          <HiOutlineCheck className='text-white' strokeWidth={2.5} />
        </div>
        <p>Your feedback has been received!</p>
        <p>Thank you for your help.</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-2 mt-4 lg:mt-0'>
      <div>
        <h2 className='font-semibold text-xl'>Feedback</h2>
        <p className='text-muted-foreground text-sm lg:text-base'>
          We value your feedback. How can we improve your experience?
        </p>
      </div>
      <InputWrapper
        inputId='email'
        label='Email address'
        error={errors.email?.message as string}
      >
        <Input
          id='email'
          {...register('email')}
          type='text'
          placeholder='Your email address'
        />
      </InputWrapper>
      <InputWrapper
        inputId='feedback'
        label='Feedback'
        error={errors.feedback?.message as string}
      >
        <Textarea
          id='feedback'
          {...register('feedback')}
          className='resize-none'
          placeholder='Your feedback...'
          rows={7}
        />
        <p className='text-end text-muted-foreground text-sm px-1'>
          {watch('feedback')?.length ?? 0}/300 characters
        </p>
      </InputWrapper>
      <div className='mt-3 flex justify-end items-center'>
        <Button className='w-full md:w-auto' disabled={isPending}>
          {isPending ? (
            <LuLoader2 className='size-4 mr-1.5 animate-spin' />
          ) : null}
          Send feedback
        </Button>
      </div>
    </form>
  );
};

const UserFeedback = () => {
  return (
    <>
      <Drawer>
        <DrawerTrigger className='flex lg:hidden'>
          <UserFeedbackBtn className='lg:hidden' />
        </DrawerTrigger>
        <DrawerContent className='p-3'>
          <DrawerHeader className='relative'>
            <DrawerClose asChild className='absolute top-0 right-0'>
              <Button size='icon' variant='ghost'>
                <HiOutlineXMark className='size-4' />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <UserFeedbackForm />
        </DrawerContent>
      </Drawer>

      <Dialog>
        <DialogTrigger className='hidden lg:flex'>
          <UserFeedbackBtn className='lg:flex w-full' />
        </DialogTrigger>
        <DialogContent>
          <UserFeedbackForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserFeedback;
