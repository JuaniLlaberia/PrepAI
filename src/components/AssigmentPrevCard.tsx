import { HiOutlineInformationCircle } from 'react-icons/hi2';
import type { ReactNode } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

type AssigmentPrevCardType = {
  title: string;
  options: string[];
  infoMessage: string;
  startBtn: ReactNode;
};

const AssigmentPrevCard = ({
  title,
  options,
  infoMessage,
  startBtn,
}: AssigmentPrevCardType) => {
  return (
    <section className='py-8 flex flex-col items-center w-full'>
      <h1 className='text-2xl lg:text-2xl mb-6 font-semibold text-center max-w-[600px]'>
        {title}
      </h1>
      <div className='flex flex-col justify-center bg-background-2 my-3 rounded-xl border-[1px] border-b-[3.5px] border-[#ebebeb] dark:border-accent w-full max-w-[600px]'>
        <h2 className='text-start text-xl font-semibold py-6 px-4 text-muted-foreground'>
          Before you start:
        </h2>
        <Separator />
        <ul className='py-6 px-4 flex flex-col gap-4'>
          {options.map((option, i) => (
            <li key={i} className='font-medium flex items-center gap-2'>
              <div className='size-2 rounded-full shrink-0 bg-violet-500' />
              {option}
            </li>
          ))}
        </ul>
      </div>
      <Alert variant='information' className='max-w-[600px]'>
        <HiOutlineInformationCircle className='size-5' />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>{infoMessage}</AlertDescription>
      </Alert>
      <div className='w-full fixed bottom-4 left-[50%] translate-x-[-50%] px-4 md:px-0 max-w-[600px]'>
        {startBtn}
      </div>
    </section>
  );
};

export default AssigmentPrevCard;
