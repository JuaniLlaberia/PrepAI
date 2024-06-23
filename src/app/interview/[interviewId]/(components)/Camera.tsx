'use client';

import Webcam from 'react-webcam';
import { useState } from 'react';
import { LuWebcam } from 'react-icons/lu';
import { PiWebcamSlashLight } from 'react-icons/pi';

import { Button } from '@/components/ui/button';

const CameraComponent = () => {
  const [webcamEnabled, setWebcamEnabled] = useState<boolean>(false);

  return (
    <div className='my-3 w-full'>
      {webcamEnabled ? (
        <div className='flex justify-center'>
          <Webcam
            mirrored
            onUserMedia={() => setWebcamEnabled(true)}
            onUserMediaError={() => setWebcamEnabled(false)}
            className='rounded-lg h-[258px] lg:h-[390px] lg:rounded-xl'
          />
        </div>
      ) : (
        <div>
          <div className='w-full mb-1 flex flex-col gap-2 items-center justify-center h-[258px] lg:h-[350px] lg:rounded-xl bg-background-2 border border-border rounded-lg'>
            <PiWebcamSlashLight className='size-12 text-muted-foreground' />
            <p className='text-sm text-muted-foreground'>Camera not enabled</p>
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
