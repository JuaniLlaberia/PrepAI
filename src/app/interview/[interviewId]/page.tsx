import PageHeader from '@/components/PageHeader';
import StartIntBtn from './(components)/StartIntBtn';
import AssigmentPrevCard from '@/components/AssigmentPrevCard';

const InterviewPage = async ({
  params: { interviewId },
  searchParams: { pathId, moduleId },
}: {
  params: { interviewId: string };
  searchParams: { pathId: string; moduleId: string };
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
      <AssigmentPrevCard
        title="Let's start the interview"
        options={[
          'Answer 5 questions',
          'Record & submit your answers',
          'Receive AI feedback',
          'Score 60% or more to pass',
        ]}
        infoMessage="Once the interview has started, it can't be stopped."
        startBtn={
          <StartIntBtn
            interviewId={interviewId}
            pathId={pathId}
            moduleId={moduleId}
          />
        }
      />
    </>
  );
};

export default InterviewPage;
