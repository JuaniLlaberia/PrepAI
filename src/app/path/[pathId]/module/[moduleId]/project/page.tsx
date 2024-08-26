import { HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2';

import PageHeader from '@/components/PageHeader';
import CompleteActivityBtn from '../(components)/CompleteActivityBtn';
import { getModuleProject } from '@/access-data/modules';

const ModuleProjectPage = async ({
  params: { pathId, moduleId },
}: {
  params: { pathId: string; moduleId: string };
}) => {
  const projectData = await getModuleProject({ moduleId });
  const { title, content, steps, references, completed, _id } = projectData;

  return (
    <>
      <PageHeader link={`/path/${pathId}/module/${moduleId}`} />
      <div className='flex flex-col items-center mt-2'>
        <div className='w-full max-w-[1000px] bg-background-2 p-4 rounded-xl border-[1px] border-b-[3.5px] border-[#ebebeb] dark:border-accent'>
          <h1 className='text-2xl font-medium mb-1'>{title}</h1>
          <p className='text-muted-foreground'>{content}</p>
        </div>

        <section className='w-full max-w-[1000px] mt-6'>
          <h2 className='text-sm lg:text-base xl:text-lg font-semibold mb-1'>
            Steps to follow
          </h2>
          <ul className='flex flex-col gap-2'>
            {steps.map((step, i) => (
              <li
                key={i}
                className='flex items-start lg:items-center gap-2.5 py-2 px-3 rounded-xl border-[1px] border-b-[3.5px] border-[#ebebeb] dark:border-accent'
              >
                <div className='flex items-center justify-center bg-primary text-primary-foreground rounded-full size-8 shrink-0'>
                  {i + 1}
                </div>
                {step}
              </li>
            ))}
          </ul>
        </section>
        <div className='mt-6 w-full max-w-[1000px]'>
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
                  <span className='text-violet-500'>
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
                moduleId={moduleId}
                activityId={String(_id)}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ModuleProjectPage;
