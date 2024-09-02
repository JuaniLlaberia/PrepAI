'use client';

import { useRef } from 'react';
import { toast } from 'sonner';
import { LuLoader2 } from 'react-icons/lu';

import { updateUserAction } from '@/actions/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { IUserDocument } from '@/db/models/User';
import { useServerActionMutation } from '@/hooks/server-action-hooks';

const ProfileCards = ({ userData }: { userData: IUserDocument }) => {
  const { name, email, profileImg } = userData;

  const userNameInput = useRef<HTMLInputElement>(null);

  const { mutate: updateUser, isPending } = useServerActionMutation(
    updateUserAction,
    {
      mutationKey: ['update-user'],
      onSuccess: () => toast.success('Profile updated successfully'),
      onError: () =>
        toast.error('Failed to update your profile.', {
          description: 'Please try again.',
        }),
    }
  );

  return (
    <div className='grid gap-6'>
      <Card x-chunk='dashboard-04-chunk-1'>
        <CardHeader>
          <CardTitle>Full Name</CardTitle>
          <CardDescription>
            The name that will be display in your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            ref={userNameInput}
            className='bg-background dark:bg-background'
            placeholder='Your name'
            defaultValue={name}
          />
        </CardContent>
        <CardFooter className='border-t px-6 py-4'>
          <Button
            disabled={isPending}
            onClick={() => updateUser({ name: userNameInput.current?.value! })}
          >
            {isPending ? (
              <LuLoader2 className='size-4 mr-1.5 animate-spin' />
            ) : null}{' '}
            Save
          </Button>
        </CardFooter>
      </Card>
      <Card x-chunk='dashboard-04-chunk-1'>
        <CardHeader>
          <CardTitle>Email Address</CardTitle>
          <CardDescription>Your account authentication email.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            className='bg-background dark:bg-background'
            placeholder='Your email address'
            readOnly
            value={email}
          />
        </CardContent>
        <CardFooter className='border-t px-6 py-4'>
          <p className='text-sm text-muted-foreground'>
            Email address can&apos;t be modified
          </p>
        </CardFooter>
      </Card>
      {/* <Card x-chunk='dashboard-04-chunk-1'>
        <CardHeader>
          <div className='flex items-center justify-between gap-6'>
            <div>
              <CardTitle className='mb-2'>Profile Image</CardTitle>
              <CardDescription>
                Used to identify your store in the marketplace.
              </CardDescription>
            </div>
            <Avatar className='size-16 border border-boreder rounded-full shrink-0 capitalize'>
              <AvatarFallback>{name.at(0) ?? email.at(0)}</AvatarFallback>
              <AvatarImage src={profileImg} />
            </Avatar>
          </div>
        </CardHeader>
        <CardFooter className='border-t px-6 py-4'>
          <p className='text-sm text-muted-foreground'>
            The profile image is optional.
          </p>
        </CardFooter>
      </Card> */}
    </div>
  );
};

export default ProfileCards;
