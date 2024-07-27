import FeedbackComponent from '@/app/interview/[interviewId]/feedback/(components)/FeedbackComponent';
import PageHeader from '@/components/PageHeader';

const ModuleInterviewFeedback = async ({
  params: { pathId, moduleId, interviewId },
  searchParams: { attemptId },
}: {
  params: { pathId: string; moduleId: string; interviewId: string };
  searchParams: { attemptId: string };
}) => {
  return (
    <>
      <PageHeader
        text='Go to module'
        link={`/path/${pathId}/module/${moduleId}`}
      />
      <FeedbackComponent interviewId={interviewId} attemptId={attemptId} />
    </>
  );
};

export default ModuleInterviewFeedback;
