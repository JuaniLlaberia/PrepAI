import { HiOutlineInformationCircle } from 'react-icons/hi2';

import StartExamBtn from './(components)/StartExamBtn';
import PageHeader from '@/components/PageHeader';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

const ExamPage = ({ params }: { params: { examId: string } }) => {
  return (
    <>
      <PageHeader text='Go to exams' link='/dashboard/exams' />
      <section className='py-8 flex flex-col items-center w-full'>
        <h1 className='text-2xl lg:text-2xl mb-6 font-semibold text-center max-w-[600px]'>
          Let&apos;s start your mock exam
        </h1>
        <div className='flex flex-col justify-center bg-background-2 my-3 rounded-lg shadow w-full max-w-[600px]'>
          <h2 className='text-start text-xl font-semibold py-6 px-4 text-muted-foreground'>
            Before you start:
          </h2>
          <Separator />
          <ul className='py-6 px-4 flex flex-col gap-4'>
            <li className='font-medium flex items-center gap-2'>
              <div className='size-2 rounded-full bg-blue-600' />
              Answer 10-15 multiple choice questions
            </li>
            <li className='font-medium flex items-center gap-2'>
              <div className='size-2 rounded-full bg-blue-600' />
              Get your results feedback
            </li>
            <li className='font-medium flex items-center gap-2'>
              <div className='size-2 rounded-full bg-blue-600' />
              Score 60% or more to pass
            </li>
          </ul>
        </div>
        <Alert variant='information' className='max-w-[600px]'>
          <HiOutlineInformationCircle className='size-5' />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            Once the mock exam has started, it can&apos;t be paused.
          </AlertDescription>
        </Alert>
        <div className='w-full fixed bottom-4 left-[50%] translate-x-[-50%] px-4 md:px-0 max-w-[600px]'>
          <StartExamBtn examId={params.examId} />
        </div>
      </section>
    </>
  );
};

export default ExamPage;
