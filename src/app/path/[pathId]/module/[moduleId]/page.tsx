import { notFound } from 'next/navigation';

import PageHeader from '@/components/PageHeader';
import { getModuleById } from '@/access-data/modules';

import ActivityCard from './(components)/ActivityCard';

const ModulePage = async ({
  params: { pathId, moduleId },
}: {
  params: { pathId: string; moduleId: string };
}) => {
  const moduleData = await getModuleById({ moduleId: moduleId });
  if (!moduleData) return notFound();

  const { title, description, activities } = moduleData;

  return (
    <>
      <PageHeader
        text='Go to path'
        link={`/path/${pathId}`}
      />
      <div>
        <h1 className='text-2xl font-medium mb-1'>{title}</h1>
        <p className='text-muted-foreground'>{description}</p>
      </div>
      <div className='mt-6'>
        <h2 className='text-sm lg:text-base xl:text-lg font-semibold mb-1'>
          Activities
        </h2>
        <ul className='flex flex-col gap-2'>
          {activities.map((activity, i) => (
            <ActivityCard
              key={i}
              activity={activity}
              pathId={pathId}
              moduleId={moduleId}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default ModulePage;
