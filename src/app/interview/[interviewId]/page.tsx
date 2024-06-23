import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  HiMiniArrowLongLeft,
  HiOutlineInformationCircle,
} from 'react-icons/hi2';

import StartIntBtn from './(components)/StartIntBtn';
import { getInterviewById } from '@/actions/interview';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const InterviewPage = async ({
  params,
}: {
  params: { interviewId: string };
}) => {
  //   const interviewInfo = await getInterviewById({
  //     interviewId: params.interviewId,
  //   });

  //   if (!interviewInfo) return notFound();

  //   const { jobRole, jobExperience, jobDescription } = interviewInfo;

  return (
    <>
      <header className='flex items-center justify-between py-3'>
        <Dialog>
          <DialogTrigger>
            <Button className='group' size='sm' variant='ghost'>
              <HiMiniArrowLongLeft className='size-4 mr-1.5 group-hover:-translate-x-1 transition-transform' />
              Quit interview
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Quit interview</DialogTitle>
            <DialogDescription>
              You are about to leave this interview. You can&apos;t resume it
              after.{' '}
              <span className='font-medium text-primary'>
                Are you sure you want to leave?
              </span>
            </DialogDescription>
            <DialogFooter className='flex flex-row justify-end items-center gap-2 mt-2'>
              <DialogClose asChild>
                <Button variant='ghost'>Cancel</Button>
              </DialogClose>
              <Link href='/dashboard' className={buttonVariants({})}>
                Quit interview
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <h2>MockAI</h2>
      </header>
      <section className='py-8 flex flex-col items-center w-full'>
        <h1 className='text-2xl lg:text-2xl mb-6 font-semibold text-center max-w-[600px]'>
          Let&apos;s start the interview
        </h1>
        <div className='flex flex-col justify-center bg-background-2 my-3 rounded-lg shadow w-full max-w-[600px]'>
          <h2 className='text-start text-xl font-semibold py-6 px-4 text-muted-foreground'>
            Before you start:
          </h2>
          <Separator />
          <ul className='py-6 px-4 flex flex-col gap-4'>
            <li className='font-medium flex items-center gap-2'>
              <div className='size-2 rounded-full bg-blue-600' />
              Answer between 4-6 questions
            </li>
            <li className='font-medium flex items-center gap-2'>
              <div className='size-2 rounded-full bg-blue-600' />
              Record & submit your answers
            </li>
            <li className='font-medium flex items-center gap-2'>
              <div className='size-2 rounded-full bg-blue-600' />
              Receive AI feedback
            </li>
          </ul>
        </div>
        <Alert variant='information' className='max-w-[600px]'>
          <HiOutlineInformationCircle className='size-5' />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            Once the interview has started, it can&apos;t be stopped. video.
          </AlertDescription>
        </Alert>
        <div className='w-full fixed bottom-4 left-[50%] translate-x-[-50%] px-4 md:px-0 max-w-[600px]'>
          <StartIntBtn interviewId={params.interviewId} />
        </div>
      </section>
    </>
  );
};

export default InterviewPage;
