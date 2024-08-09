import PageHeader from '@/components/PageHeader';
import FeedbackComponent from './(components)/FeedbackComponent';

const FeedbackPage = async ({
  params: { interviewId },
  searchParams: { pathId, moduleId },
}: {
  params: { interviewId: string };
  searchParams: { pathId: string; moduleId: string };
}) => {
  return (
    <>
      <PageHeader
        link={
          moduleId
            ? `/path/${pathId}/module/${moduleId}`
            : '/dashboard/interviews'
        }
      />
      <FeedbackComponent interviewId={interviewId} />
    </>
  );
};

export default FeedbackPage;
