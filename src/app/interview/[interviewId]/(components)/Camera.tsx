'use client';

import Webcam from 'react-webcam';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useState } from 'react';
import { LuWebcam } from 'react-icons/lu';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const CameraComponent = () => {
  const { user, isLoading } = useKindeBrowserClient();
  const [webcamEnabled, setWebcamEnabled] = useState<boolean>(false);

  return (
    <div className='w-full'>
      {webcamEnabled ? (
        <div className='flex justify-center'>
          <Webcam
            mirrored
            onUserMedia={() => setWebcamEnabled(true)}
            onUserMediaError={() => setWebcamEnabled(false)}
            className='rounded-lg h-[258px] md:h-[375px] lg:rounded-xl'
          />
        </div>
      ) : (
        <div>
          <div className='w-full mb-1 flex flex-col gap-2 items-center justify-center h-[258px] lg:h-[350px] lg:rounded-xl bg-background-2 border border-border rounded-lg'>
            {isLoading ? (
              <div className='size-20 bg-background rounded-full border border-border animate-pulse'></div>
            ) : (
              <>
                <Avatar className='size-16'>
                  <AvatarFallback>{user?.family_name?.[0]}</AvatarFallback>
                  <AvatarImage src={user?.picture!} alt='User profile photo' />
                </Avatar>
                <p className='text-sm text-muted-foreground'>
                  {user?.given_name} {user?.family_name}
                </p>
              </>
            )}
          </div>
          <Button
            variant='outline'
            onClick={() => setWebcamEnabled(true)}
            className='w-full'
          >
            <LuWebcam className='size-4 mr-1.5' />
            Enable camera
          </Button>
        </div>
      )}
    </div>
  );
};

export default CameraComponent;
