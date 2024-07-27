import PageHeader from '@/components/PageHeader';
import ExamCard from '../../../components/AssigmentPrevCard';
import StartExamBtn from './(components)/StartExamBtn';

const ExamPage = ({ params: { examId } }: { params: { examId: string } }) => {
  return (
    <>
      <PageHeader text='Go to exams' link='/dashboard/exams' />
      <ExamCard
        title="Let's start your mock exam"
        options={[
          'Answer 10-15 multiple choice questions',
          'Get your results feedback',
          'Score 60% or more to pass',
        ]}
        infoMessage="Once the mock exam has started, it can't be paused."
        startBtn={<StartExamBtn examId={examId} />}
      />
    </>
  );
};

export default ExamPage;
