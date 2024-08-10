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
        <div className='w-full max-w-[800px] bg-background-2 p-4 rounded-xl border-[1px] border-b-[3.5px] border-[#ebebeb] dark:border-accent'>
          <h1 className='text-2xl font-medium mb-1'>{title}</h1>
          <p className='text-muted-foreground'>{content}</p>
        </div>

        <div className='w-full max-w-[800px] bg-background-2 mt-6 p-4 rounded-xl border-[1px] border-b-[3.5px] border-[#ebebeb] dark:border-accent'>
          <h2 className='text-sm lg:text-base xl:text-lg font-semibold mb-2'>
            Steps to follow
          </h2>
          <ul className='flex flex-col gap-2'>
            {steps.map((step, i) => (
              <li key={i} className='flex items-center gap-2'>
                <div className='size-2 shrink-0 rounded-full bg-violet-500' />
                {step}
              </li>
            ))}
          </ul>
        </div>
        <div className='mt-6 w-full max-w-[800px]'>
          <h2 className='text-sm lg:text-base xl:text-lg font-semibold mb-1'>
            References
          </h2>
          <ul className='flex flex-col gap-2.5'>
            {references.map((ref, i) => (
              <li key={i} className='p-3 bg-background-2 rounded-xl shadow'>
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
