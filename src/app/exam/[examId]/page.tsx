import PageHeader from '@/components/PageHeader';
import ExamCard from '../../../components/AssigmentPrevCard';
import StartExamBtn from './(components)/StartExamBtn';

const ExamPage = ({
  params: { examId },
  searchParams: { pathId, moduleId },
}: {
  params: { examId: string };
  searchParams: { pathId: string; moduleId: string };
}) => {
  return (
    <>
      <PageHeader
        link={
          moduleId ? `/path/${pathId}/module/${moduleId}` : '/dashboard/exams'
        }
      />
      <ExamCard
        title={
          moduleId ? "Let's start the assigment" : "Let's start your mock exam"
        }
        options={[
          'Answer 10-15 questions',
          'Get your results feedback',
          'Score 60% or more to pass',
        ]}
        infoMessage="Once the mock exam has started, it can't be paused."
        startBtn={
          <StartExamBtn examId={examId} moduleId={moduleId} pathId={pathId} />
        }
      />
    </>
  );
};

export default ExamPage;
