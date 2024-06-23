'use client';

import { HiOutlineMicrophone } from 'react-icons/hi2';

import CameraComponent from './Camera';
import { Button } from '@/components/ui/button';

type AnswerComponentPropsType = {};

const AnswerComponent = ({}: AnswerComponentPropsType) => {
  return (
    <div className='w-full flex flex-col items-center'>
      <section className='my-3 w-full max-w-[600px]'>
        <p className='uppercase text-muted-foreground text-sm text-center font-semibold mb-1'>
          Question #1
        </p>
        <p className='text-center text-lg font-medium'>
          Describe how woulds you implement server-side rendering in React.
        </p>
      </section>
      <section className='flex justify-center items-center max-w-[600px] w-full'>
        <CameraComponent />
      </section>
      <div className='w-full fixed bottom-4 left-[50%] translate-x-[-50%] px-4 md:px-0 max-w-[600px]'>
        <div className='flex items-center justify-between px-1 text-lg font-medium mb-2'>
          <p>Remaining time</p>
          <p>02:00</p>
        </div>
        <Button size='lg' className='w-full'>
          <HiOutlineMicrophone className='size-4 mr-1.5' /> Start recording
        </Button>
      </div>
    </div>
  );
};

export default AnswerComponent;
