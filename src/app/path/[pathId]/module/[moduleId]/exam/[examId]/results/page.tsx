import PageHeader from '@/components/PageHeader';
import ResultsComponent from '@/app/exam/[examId]/results/(components)/ResultsComponent';

const ModuleExamResults = async ({
  params: { pathId, moduleId, examId },
  searchParams: { attemptId },
}: {
  params: { pathId: string; moduleId: string; examId: string };
  searchParams: { attemptId: string };
}) => {
  return (
    <>
      <PageHeader
        text='Go to module'
        link={`/path/${pathId}/module/${moduleId}`}
      />
      <ResultsComponent examId={examId} attemptId={attemptId} />
    </>
  );
};

export default ModuleExamResults;
