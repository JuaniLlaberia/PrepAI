import PageHeader from '@/components/PageHeader';
import FeedbackComponent from './(components)/FeedbackComponent';

const FeedbackPage = async ({
  params: { interviewId },
  searchParams: { attemptId },
}: {
  params: { interviewId: string };
  searchParams: { attemptId: string };
}) => {
  return (
    <>
      <PageHeader text='Go to interviews' link='/dashboard/interviews' />
      <FeedbackComponent interviewId={interviewId} attemptId={attemptId} />
    </>
  );
};

export default FeedbackPage;
