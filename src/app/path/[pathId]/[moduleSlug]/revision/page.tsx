import { HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2';

import PageHeader from '@/components/PageHeader';
import CompleteActivityBtn from '../(components)/CompleteActivityBtn';
import { getModuleRevision } from '@/access-data/modules';

const ModuleRevisionPage = async ({
  params: { pathId, moduleSlug },
}: {
  params: { pathId: string; moduleSlug: string };
}) => {
  const revisionData = await getModuleRevision({ pathId, moduleSlug });
  const { title, description, references, _id, completed } = revisionData;

  return (
    <>
      <PageHeader text='Go to path' link={`/path/${pathId}/${moduleSlug}`} />
      <section className='bg-background-2 p-4 rounded-xl border-[1px] border-b-[3.5px] border-[#ebebeb] dark:border-accent'>
        <h1 className='text-2xl font-medium mb-2'>{title}</h1>
        <p className='text-muted-foreground'>{description}</p>
      </section>
      <section className='mt-6'>
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
            <CompleteActivityBtn
              pathId={pathId}
              moduleSlug={moduleSlug}
              activityId={String(_id)}
            />
          </div>
        ) : null}
      </section>
    </>
  );
};

export default ModuleRevisionPage;
