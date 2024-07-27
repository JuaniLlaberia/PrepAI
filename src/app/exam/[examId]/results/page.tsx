import PageHeader from '@/components/PageHeader';
import ResultsComponent from './(components)/ResultsComponent';

const ExamResultsPage = async ({
  params: { examId },
  searchParams: { attemptId },
}: {
  params: { examId: string };
  searchParams: { attemptId: string };
}) => {
  return (
    <>
      <PageHeader text='Go to exams' link='/dashboard/exams' />
      <ResultsComponent examId={examId} attemptId={attemptId} />
    </>
  );
};

export default ExamResultsPage;
