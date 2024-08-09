import PageHeader from '@/components/PageHeader';
import ResultsComponent from './(components)/ResultsComponent';

const ExamResultsPage = async ({
  params: { examId },
  searchParams: { moduleId, pathId },
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
      <ResultsComponent examId={examId} />
    </>
  );
};

export default ExamResultsPage;
