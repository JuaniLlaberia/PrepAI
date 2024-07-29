'use client';

import {
  HiMiniArrowLongRight,
  HiOutlineClock,
  HiPaperAirplane,
} from 'react-icons/hi2';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { LuLoader2 } from 'react-icons/lu';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useMultiStepForm } from '@/hooks/useMultistepForm';
import { cn } from '@/lib/utils';
import { formatNumber, formatTimer } from '@/lib/helpers';
import { useTimer } from '@/hooks/useTimer';
import { updateExamAttempt } from '@/actions/examAttempt';
import { IExamAttemptDocument } from '@/db/models/ExamAttempt';
import { finishExamAttemptForModule } from '@/actions/modules';

const AnswerExamComponent = ({
  examId,
  attemptId,
  questions,
  moduleId,
  pathId,
}: {
  examId: string;
  attemptId: string;
  questions: { question: string; options: string[]; correctAnswer: number }[];
  moduleId?: string;
  pathId?: string;
}) => {
  const { timer } = useTimer();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<
    {
      answer: number;
      isCorrect: boolean;
    }[]
  >([]);

  const { mutate: submitExamAttempt, isPending } = useMutation({
    mutationKey: ['submit-exam-attempt'],
    mutationFn: moduleId ? finishExamAttemptForModule : updateExamAttempt,
    onSuccess: (passed: boolean) => {
      toast.success('Submitting answers', {
        description: 'You will be redirected automatically.',
      });

      if (moduleId) {
        if (passed) router.push(`/path/${pathId}/module/${moduleId}`);
        router.push(
          `/path/${pathId}/module/${moduleId}/exam/${examId}/results?attemptId=${attemptId}`
        );
      } else {
        router.push(`/exam/${examId}/results?attemptId=${attemptId}`);
      }
    },
    onError: () =>
      toast.error('Failed to submit exam answers. Please try again.'),
  });

  const { crrStep, crrIndex, isLastStep, nextStep } = useMultiStepForm(
    questions.map(question => (
      <motion.div
        key={question.question}
        initial={{ x: '50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-50%', opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <h1 className='text-lg font-medium text-center mb-4'>
          {question.question}
        </h1>
        <ul className='flex flex-col gap-2'>
          {question.options.map((option, i) => (
            <li
              key={i}
              className={cn(
                'border border-border rounded-lg p-2 cursor-pointer transition-colors',
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

  const nextQuestion = useCallback(() => {
    if (selectedOption == null) return;

    const answer = {
      answer: selectedOption,
      isCorrect: selectedOption === questions[crrIndex].correctAnswer,
    };

    setUserAnswers(prev => [...prev, answer]);
    setSelectedOption(null);

    nextStep();
  }, [nextStep, selectedOption, crrIndex, questions]);

  const finishExam = () => {
    const answers = [
      ...userAnswers,
      {
        answer: selectedOption!,
        isCorrect: selectedOption === questions[crrIndex].correctAnswer,
      },
    ];

    const data: Partial<IExamAttemptDocument> = {
      time: timer,
      answers,
    };

    submitExamAttempt({
      examId,
      attemptId,
      data,
      moduleId: moduleId as string,
    });
  };

  //Allow users to use keyboard to answer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      switch (key) {
        case '1':
          setSelectedOption(0);
          break;
        case '2':
          setSelectedOption(1);
          break;
        case '3':
          setSelectedOption(2);
          break;
        case '4':
          setSelectedOption(3);
          break;
        case 'Enter':
          if (isLastStep) break;
          nextQuestion();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nextQuestion, isLastStep]);

  // Show confirmation when refreshing/closing browser
  useEffect(() => {
    const unloadCallback = (event: Event) => {
      event.preventDefault();
      return '';
    };

    window.addEventListener('beforeunload', unloadCallback);
    return () => window.removeEventListener('beforeunload', unloadCallback);
  }, []);

  return (
    <div className='w-full flex flex-col items-center tracking-tight lg:mt-4'>
      <section className='my-3 w-full max-w-[600px] overflow-hidden'>
        <div className='flex items-end justify-between mb-3 lg:mb-4'>
          <p className='font-medium'>
            <span className='text-3xl text-primary'>
              {formatNumber(crrIndex + 1)}
            </span>
            /
            <span className='text-lg text-muted-foreground'>
              {questions.length}
            </span>
          </p>
          {/* Implement as separate component to avoid rerenders */}
          <p className='flex items-center gap-1.5 font-medium text-muted-foreground lg:text-lg'>
            <HiOutlineClock
              strokeWidth={2}
              className='size-5'
            />
            {formatTimer(timer)}
          </p>
        </div>
        {crrStep}
      </section>
      <div className='flex items-center w-full max-w-[600px] lg:justify-end'>
        {!isLastStep ? (
          <Button
            onClick={nextQuestion}
            className='w-full lg:w-auto'
          >
            Next question
            <HiMiniArrowLongRight className='size-4 ml-1.5' />
          </Button>
        ) : (
          <Button
            disabled={isPending}
            onClick={finishExam}
            className='w-full lg:w-auto'
          >
            {isPending ? (
              <LuLoader2 className='size-4 mr-1.5 animate-spin' />
            ) : null}
            Submit answers
            {!isPending ? <HiPaperAirplane className='size-4 ml-1.5' /> : null}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AnswerExamComponent;
