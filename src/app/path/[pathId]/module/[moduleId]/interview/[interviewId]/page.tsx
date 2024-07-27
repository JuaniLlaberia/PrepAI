import AssigmentPrevCard from '@/components/AssigmentPrevCard';
import StartIntBtn from '@/app/interview/[interviewId]/(components)/StartIntBtn';
import PageHeader from '@/components/PageHeader';

const ModuleInterviewPage = ({
  params: { pathId, moduleId, interviewId },
}: {
  params: { pathId: string; moduleId: string; interviewId: string };
}) => {
  return (
    <>
      <PageHeader
        text='Go to module'
        link={`/path/${pathId}/module/${moduleId}`}
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

export default ModuleInterviewPage;
