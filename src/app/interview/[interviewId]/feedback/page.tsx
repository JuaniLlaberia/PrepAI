import PageHeader from '@/components/PageHeader';
import FeedbackComponent from './(components)/FeedbackComponent';

const FeedbackPage = async ({
  params: { interviewId },
  searchParams: { attemptId, pathId, moduleId },
}: {
  params: { interviewId: string };
  searchParams: { attemptId: string; pathId: string; moduleId: string };
}) => {
  return (
    <>
      <PageHeader
        text={moduleId ? 'Go to module' : 'Go to interviews'}
        link={
          moduleId
            ? `/path/${pathId}/module/${moduleId}`
            : '/dashboard/interviews'
        }
      />
      <FeedbackComponent
        interviewId={interviewId}
        attemptId={attemptId}
      />
    </>
  );
};

export default FeedbackPage;
