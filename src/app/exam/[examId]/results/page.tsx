import PageHeader from '@/components/PageHeader';
import ResultsComponent from './(components)/ResultsComponent';

const ExamResultsPage = async ({
  params: { examId },
  searchParams: { attemptId, moduleId, pathId },
}: {
  params: { examId: string };
  searchParams: { attemptId: string; pathId: string; moduleId: string };
}) => {
  return (
    <>
      <PageHeader
        text={moduleId ? 'Go to module' : 'Go to exams'}
        link={
          moduleId ? `/path/${pathId}/module/${moduleId}` : '/dashboard/exams'
        }
      />
      <ResultsComponent
        examId={examId}
        attemptId={attemptId}
      />
    </>
  );
};

export default ExamResultsPage;
