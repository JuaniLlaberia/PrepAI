'use client';

import { useEffect, useState } from 'react';
import {
  HiMiniArrowLongRight,
  HiOutlineLightBulb,
  HiOutlineMicrophone,
} from 'react-icons/hi2';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { LuLoader2 } from 'react-icons/lu';

import CameraComponent from './Camera';
import { Button } from '@/components/ui/button';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { generateFeedback } from '@/actions/feedback';

type AnswerComponentPropsType = {
  interviewId: string;
  interviewAttemptId: string;
  questions: {
    id: string;
    question: string;
    hint: string;
    interviewId: string;
  }[];
};

const AnswerComponent = ({
  questions,
  interviewId,
  interviewAttemptId,
}: AnswerComponentPropsType) => {
  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  const [userAnswers, setUserAnswers] = useState<
    { question: string; answer: string; questionId: string }[]
  >([]);
  const [crrQuestion, setCrrQuestion] = useState<number>(0);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);

  const router = useRouter();

  const isLastQuestion = crrQuestion + 1 === questions.length;

  const { mutate: endInterview, isPending } = useMutation({
    mutationKey: ['finish-interview'],
    mutationFn: generateFeedback,
    onSuccess: () => {
      toast.success('Generating feedback', {
        description: 'You will be redirected automatically.',
      });
      router.push(
        `/interview/${interviewId}/feedback?attemptId=${interviewAttemptId}`
      );
    },
    onError: () => toast.error('Failed to submit interview'),
  });

  //Show confirmation when refreshing/closing browser
  useEffect(() => {
    const unloadCallback = (event: Event) => {
      event.preventDefault();
      return '';
    };

    window.addEventListener('beforeunload', unloadCallback);
    return () => window.removeEventListener('beforeunload', unloadCallback);
  }, []);

  const nextQuestion = () => {
    //Save crr question answer in object
    setUserAnswers(prev => [
      ...prev,
      {
        question: questions[crrQuestion].question,
        answer: transcript,
        questionId: questions[crrQuestion].id,
      },
    ]);
    //Reset transcript
    resetTranscript();
    setHasAnswered(false);
    //Show next question
    setCrrQuestion(prev => prev + 1);
  };

  const finishInterview = () => {
    const responses = [
      ...userAnswers,
      {
        question: questions[crrQuestion].question,
        answer: transcript,
        questionId: questions[crrQuestion].id,
      },
    ];

    endInterview({
      interviewId,
      attemptId: interviewAttemptId,
      userResponses: responses,
    });
  };

  return (
    <div className='w-full flex flex-col items-center'>
      <section className='my-3 w-full max-w-[600px]'>
        <p className='uppercase text-muted-foreground text-sm text-center font-semibold mb-1'>
          Question #{crrQuestion + 1}
        </p>
        <p className='text-center text-lg font-medium'>
          {questions[crrQuestion].question}
        </p>
      </section>
      <section className='flex flex-col justify-center items-center max-w-[600px] w-full'>
        <CameraComponent />
        <Alert variant='information'>
          <HiOutlineLightBulb className='size-5' />
          <AlertTitle>Hint</AlertTitle>
          <AlertDescription>{questions[crrQuestion].hint}</AlertDescription>
        </Alert>
      </section>
      <div className='w-full fixed bottom-4 left-[50%] translate-x-[-50%] px-4 md:px-0 max-w-[600px]'>
        {isListening && (
          <Button
            className='w-full'
            onClick={() => {
              setHasAnswered(true);
              stopListening();
            }}
          >
            <HiOutlineMicrophone className='size-4 mr-1.5' /> Stop recording
          </Button>
        )}

        {!isListening && !hasAnswered && (
          <Button className='w-full' onClick={startListening}>
            <HiOutlineMicrophone className='size-4 mr-1.5' /> Start recording
          </Button>
        )}

        {hasAnswered && !isListening && !isLastQuestion && (
          <Button className='w-full' onClick={nextQuestion}>
            Next question <HiMiniArrowLongRight className='size-4 ml-1.5' />
          </Button>
        )}

        {hasAnswered && !isListening && isLastQuestion && (
          <Button
            disabled={isPending}
            className='w-full'
            onClick={finishInterview}
          >
            {!isPending ? (
              <>
                Finish interview
                <HiMiniArrowLongRight className='size-4 ml-1.5' />
              </>
            ) : (
              <>
                <LuLoader2 className='size-4 mr-1.5 animate-spin' />
                Processing answers
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AnswerComponent;
