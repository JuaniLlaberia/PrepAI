'use client';

import { HiMiniArrowLongRight } from 'react-icons/hi2';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { useMultiStepForm } from '@/hooks/useMultistepForm';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const AnswerExamComponent = ({
  examId,
  questions,
}: {
  examId: string;
  questions: { question: string; options: string[]; correctAnswer: number }[];
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState();

  const { mutate, isPending } = useMutation({});

  const { crrStep, crrIndex, nextStep } = useMultiStepForm(
    questions.map(question => (
      <motion.div
        key={question.question}
        initial={{ x: '50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-50%', opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <h1 className='text-lg font-medium text-center mb-6'>
          {question.question}
        </h1>
        <ul className='flex flex-col gap-2'>
          {question.options.map((option, i) => (
            <li
              key={i}
              className={cn(
                'border border-border rounded-lg p-2 cursor-pointer',
                selectedOption === i ? 'border-blue-500 bg-blue-100' : null
              )}
              onClick={() => setSelectedOption(i)}
            >
              {option}
            </li>
          ))}
        </ul>
      </motion.div>
    ))
  );

  const nextQuestion = () => {
    //Store answers

    setSelectedOption(null);
    nextStep();
  };
  const submitExam = () => {};

  //Show confirmation when refreshing/closing browser
  useEffect(() => {
    const unloadCallback = (event: Event) => {
      event.preventDefault();
      return '';
    };

    window.addEventListener('beforeunload', unloadCallback);
    return () => window.removeEventListener('beforeunload', unloadCallback);
  }, []);

  return (
    <div className='w-full flex flex-col items-center tracking-tight'>
      <section className='my-3 w-full max-w-[600px]'>
        <p className='font-medium mb-1'>
          <span className='text-3xl text-primary'>0{crrIndex + 1}</span>/
          <span className='text-lg text-muted-foreground'>
            {questions.length}
          </span>
        </p>
        {crrStep}
      </section>
      <div className='flex flex-col gap-1 w-full'>
        <Button onClick={nextQuestion}>
          Next question
          <HiMiniArrowLongRight className='size-4 ml-1.5' />
        </Button>
      </div>
    </div>
  );
};

export default AnswerExamComponent;
