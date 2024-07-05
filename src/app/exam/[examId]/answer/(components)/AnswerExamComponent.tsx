'use client';

import { HiMiniArrowLongRight } from 'react-icons/hi2';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { useMultiStepForm } from '@/hooks/useMultistepForm';

const AnswerExamComponent = ({
  examId,
  questions = [],
}: {
  examId: string;
  questions: {}[];
}) => {
  const { mutate, isPending } = useMutation({});
  // const {} = useMultiStepForm(questions.map(question => <div key=''></div>));
  const { crrStep, crrIndex, nextStep, prevStep, isFirstStep, isLastStep } =
    useMultiStepForm([
      <motion.div
        key='1'
        initial={{ x: '50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-50%', opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <h1 className='text-lg font-medium text-center mb-6'>
          Which of the following methods can be used to display data in some
          form using Javascript?
        </h1>
        <ul className='flex flex-col gap-2'>
          <li className='border border-blue-500 bg-blue-200 rounded-lg p-2'>
            constant
          </li>
          <li className='border border-border rounded-lg p-2'>let</li>
          <li className='border border-border rounded-lg p-2'>var</li>
          <li className='border border-border rounded-lg p-2'>function</li>
        </ul>
      </motion.div>,
      <motion.div
        key='2'
        initial={{ x: '50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-50%', opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <h1 className='text-lg font-medium text-center mb-6'>bla bla bla</h1>
        <ul className='flex flex-col gap-2'>
          <li className='border border-blue-500 bg-blue-200 rounded-lg p-2'>
            constant
          </li>
          <li className='border border-border rounded-lg p-2'>let</li>
          <li className='border border-border rounded-lg p-2'>var</li>
          <li className='border border-border rounded-lg p-2'>function</li>
        </ul>
      </motion.div>,
    ]);

  return (
    <div className='w-full flex flex-col items-center tracking-tight'>
      <section className='my-3 w-full max-w-[600px]'>
        <p className='font-medium mb-1'>
          <span className='text-3xl text-primary'>0{crrIndex + 1}</span>/
          <span className='text-lg text-muted-foreground'>15</span>
        </p>
        {crrStep}
        {/* <h1 className='text-lg font-medium text-center mb-6'>
          Which of the following methods can be used to display data in some
          form using Javascript?
        </h1>
        <ul className='flex flex-col gap-2'>
          <li className='border border-blue-500 bg-blue-200 rounded-lg p-2'>
            constant
          </li>
          <li className='border border-border rounded-lg p-2'>let</li>
          <li className='border border-border rounded-lg p-2'>var</li>
          <li className='border border-border rounded-lg p-2'>function</li>
        </ul> */}
      </section>
      {/* <div className='w-full fixed bottom-4 left-[50%] translate-x-[-50%] px-4 md:px-0 max-w-[500px]'> */}
      <div className='flex flex-col gap-1 w-full'>
        <Button onClick={nextStep}>
          Next question
          <HiMiniArrowLongRight className='size-4 ml-1.5' />
        </Button>
        {!isFirstStep ? (
          <Button onClick={prevStep} variant='ghost'>
            Go back
          </Button>
        ) : null}
      </div>
      {/* </div> */}
    </div>
  );
};

export default AnswerExamComponent;
