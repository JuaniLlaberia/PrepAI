import { HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2';

import PageHeader from '@/components/PageHeader';
import CompleteActivityBtn from '../(components)/CompleteActivityBtn';
import { getModuleRevision } from '@/access-data/modules';

const ModuleRevisionPage = async ({
  params: { pathId, moduleId },
}: {
  params: { pathId: string; moduleId: string };
}) => {
  const revisionData = await getModuleRevision({ moduleId });
  const { title, description, references, _id, completed } = revisionData;

  return (
    <>
      <PageHeader link={`/path/${pathId}/module/${moduleId}`} />
      <div className='flex flex-col items-center mt-2'>
        <section className='w-full max-w-[800px] bg-background-2 p-4 rounded-xl border-[1px] border-b-[3.5px] border-[#ebebeb] dark:border-accent'>
          <h1 className='text-2xl font-medium mb-2'>{title}</h1>
          <p className='text-muted-foreground'>{description}</p>
        </section>
        <section className='w-full max-w-[800px] mt-6'>
          <h2 className='text-sm lg:text-base xl:text-lg font-semibold mb-1'>
            References
          </h2>
          <ul className='flex flex-col gap-2.5'>
            {references.map((ref, i) => (
              <li
                key={i}
                className='p-3 bg-background-2 rounded-xl border-[1px] border-b-[3.5px] border-[#ebebeb] dark:border-accent'
              >
                <a
                  target='_blank'
                  href={ref.link}
                  className='flex items-center justify-between font-medium'
                >
                  <span>{ref.label}</span>
                  <span>
                    <HiOutlineArrowTopRightOnSquare />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          {!completed ? (
            <div className='mt-5'>
              <CompleteActivityBtn pathId={pathId} activityId={String(_id)} />
            </div>
          ) : null}
        </section>
      </div>
    </>
  );
};

export default ModuleRevisionPage;
