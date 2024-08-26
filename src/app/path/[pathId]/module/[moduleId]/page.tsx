import { notFound } from 'next/navigation';

import ActivityCard from './(components)/ActivityCard';
import PageHeader from '@/components/PageHeader';
import { getModuleById } from '@/access-data/modules';

const ModulePage = async ({
  params: { pathId, moduleId },
}: {
  params: { pathId: string; moduleId: string };
}) => {
  const moduleData = await getModuleById({ moduleId });
  if (!moduleData) return notFound();

  const { title, description, activities, order } = moduleData;

  return (
    <>
      <PageHeader link={`/path/${pathId}`} />
      <div className='flex flex-col items-center mt-2'>
        <section className='w-full max-w-[1000px] overflow-x-hidden pb-3'>
          <div className='bg-background-2 p-4 rounded-xl border-[1px] border-b-[3.5px] border-[#ebebeb] dark:border-accent'>
            <h1 className='font-semibold text-sm mb-1 text-muted-foreground'>
              STAGE {order}
            </h1>
            <h2 className='text-xl font-medium mb-3'>{title}</h2>
            <p className='text-muted-foreground'>{description}</p>
          </div>
          <div className='mt-6'>
            <h2 className='text-sm lg:text-base xl:text-lg font-semibold mb-1'>
              Activities
            </h2>
            <ul className='grid grid-cols-1 lg:grid-cols-3 gap-3'>
              {activities.map((activity, i) => (
                <ActivityCard
                  key={i}
                  activity={activity}
                  pathId={pathId}
                  moduleId={String(moduleData._id)}
                />
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default ModulePage;
