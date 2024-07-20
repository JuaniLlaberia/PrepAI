import { notFound } from 'next/navigation';

import PageHeader from '@/components/PageHeader';
import { getModuleById } from '@/actions/path';
import { Button } from '@/components/ui/button';

const ModulePage = async ({
  params,
}: {
  params: { moduleId: string; pathId: string };
}) => {
  const moduleData = await getModuleById({ moduleId: params.moduleId });
  if (!moduleData) return notFound();

  const { title, description, topics } = moduleData;

  return (
    <>
      <PageHeader text='Go to path' link={`/path/${params.pathId}`} />
      <div>
        <h1 className='text-2xl font-medium mb-1'>{title}</h1>
        <p className='text-muted-foreground'>{description}</p>
      </div>
      <div className='mt-4'>
        <h2 className='text-sm lg:text-base xl:text-lg font-semibold mb-1'>
          Topics to learn
        </h2>
        <ul className='flex flex-col gap-1'>
          {topics.map((topic, i) => (
            <li key={i} className='text-lg flex items-center gap-2 underline'>
              <div className='size-1.5 rounded-full bg-blue-600' />
              <a href={topic.link} target='_blank'>
                {topic.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className='mt-4'>
        <h2 className='text-sm lg:text-base xl:text-lg font-semibold mb-1'>
          Assessments
        </h2>
        <div className='flex gap-6 items-center justify-between border border-border rounded-lg p-3'>
          <div>
            <h4 className='font-medium'>Ready for the exam?</h4>
            <p className='text-sm text-muted-foreground'>
              Take a mock exam to test what you know.
            </p>
          </div>
          <Button size='sm'>Start exam</Button>
        </div>
        <div className='flex gap-6 items-center justify-between border border-border rounded-lg p-3 mt-2'>
          <div>
            <h4 className='font-medium'>Ready for the interview?</h4>
            <p className='text-sm text-muted-foreground'>
              Take a mock interview to test what you know.
            </p>
          </div>
          <Button size='sm'>Start interview</Button>
        </div>
      </div>
    </>
  );
};

export default ModulePage;
