import AssigmentPrevCard from '@/components/AssigmentPrevCard';
import StartExamBtn from '@/app/exam/[examId]/(components)/StartExamBtn';
import PageHeader from '@/components/PageHeader';

const ModuleExamPage = async ({
  params: { pathId, moduleId, examId },
}: {
  params: { pathId: string; moduleId: string; examId: string };
}) => {
  return (
    <>
      <PageHeader
        text='Go to module'
        link={`/path/${pathId}/module/${moduleId}`}
      />
      <AssigmentPrevCard
        title="Let's start the assigment"
        options={[
          'Answer 10 multiple choice questions',
          'Get your feedback',
          'Score 60% or more to pass',
        ]}
        infoMessage="Once the exam has started, it can't be resumed after."
        startBtn={
          <StartExamBtn examId={examId} pathId={pathId} moduleId={moduleId} />
        }
      />
    </>
  );
};

export default ModuleExamPage;
