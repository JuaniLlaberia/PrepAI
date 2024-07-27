import { notFound } from 'next/navigation';

import PageHeader from '@/components/PageHeader';
import Assessments from './(components)/Assessments';
import { getModuleById } from '@/actions/path';

const ModulePage = async ({
  params: { pathId, moduleId },
}: {
  params: { pathId: string; moduleId: string };
}) => {
  const moduleData = await getModuleById({ moduleId: moduleId });
  if (!moduleData) return notFound();

  const { title, description, topics, interview, exam } = moduleData;

  return (
    <>
      <PageHeader text='Go to path' link={`/path/${pathId}`} />
      <div className='flex flex-col items-center mt-2'>
        <section className='w-full max-w-[700px] overflow-x-hidden pb-3'>
          <div>
            <h1 className='text-2xl font-medium mb-1'>{title}</h1>
            <p className='text-muted-foreground'>{description}</p>
          </div>
          <div className='mt-4'>
            <h2 className='text-sm lg:text-base xl:text-lg font-semibold mb-1'>
              Topics to learn
            </h2>
            <ul className='flex flex-col gap-1 tracking-tight'>
              {topics.map((topic, i) => (
                <li
                  key={i}
                  className='text-lg flex items-center gap-2 underline'
                >
                  <div className='size-1.5 min-w-[6px] rounded-full bg-blue-600' />
                  <a href={topic.link} target='_blank'>
                    {topic.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <Assessments
            moduleId={moduleId}
            examData={exam}
            interviewData={interview}
          />
        </section>
      </div>
    </>
  );
};

export default ModulePage;
