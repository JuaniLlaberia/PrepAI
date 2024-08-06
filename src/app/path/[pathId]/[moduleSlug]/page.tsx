import { notFound } from 'next/navigation';

import ActivityCard from './(components)/ActivityCard';
import PageHeader from '@/components/PageHeader';
import { getModuleBySlug } from '@/access-data/modules';

const ModulePage = async ({
  params: { pathId, moduleSlug: slug },
}: {
  params: { pathId: string; moduleSlug: string };
}) => {
  const moduleData = await getModuleBySlug({ slug, pathId });
  if (!moduleData) return notFound();

  const { title, description, activities, order } = moduleData;

  return (
    <>
      <PageHeader text='Go to path' link={`/path/${pathId}`} />
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
        <ul className='flex flex-col gap-2'>
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
    </>
  );
};

export default ModulePage;
