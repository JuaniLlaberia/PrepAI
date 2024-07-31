import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HiOutlineBookOpen } from 'react-icons/hi2';

import AnimatedProgress from '@/components/AnimatedProgress';
import Badge from '@/components/ui/badge';
import PageHeader from '@/components/PageHeader';
import { getPathById } from '@/access-data/paths';
import { getModules } from '@/access-data/modules';

const PathPage = async ({
  params: { pathId },
}: {
  params: { pathId: string };
}) => {
  const [[path, passedModules], modules] = await Promise.all([
    getPathById({ pathId: pathId }),
    getModules({ pathId: pathId }),
  ]);

  if (!path || !modules) return notFound();

  const { jobPosition, jobExperience, completed, modules: modulesCount } = path;

  return (
    <>
      <PageHeader text='Go to paths' link='/dashboard/paths' />
      <div className='flex flex-col items-center mt-2'>
        <section className='w-full max-w-[700px] overflow-x-hidden pb-3'>
          <div>
            <h1 className='text-lg font-medium mb-2'>{jobPosition} path</h1>
            <div className='flex gap-2'>
              <Badge text={`${jobExperience} level`} color='purple' />
              {completed ? (
                <Badge text='Completed' color='green' />
              ) : (
                <Badge text='In progress' color='orange' />
              )}
            </div>
            <div className='mt-4 flex flex-col'>
              <h2 className='text-sm lg:text-base xl:text-lg font-semibold mb-1'>
                Your progress
              </h2>
              <div className='flex justify-between items-center text-sm px-1 mb-1'>
                <p>
                  {Math.round((passedModules / modulesCount) * 100)} % completed
                </p>
                <p>
                  {passedModules}/{modulesCount}
                </p>
              </div>
              <AnimatedProgress value={(passedModules / modulesCount) * 100} />
            </div>
          </div>
          <div className='mt-5'>
            <h2 className='mb-2 text-sm lg:text-base xl:text-lg font-semibold'>
              Modules
            </h2>
            <ul className='flex flex-col gap-1.5'>
              {modules.map(module => (
                <li key={String(module._id)}>
                  <Link
                    href={`/path/${pathId}/module/${String(module._id)}`}
                    className='flex items-center justify-between border border-border p-3 rounded-lg'
                  >
                    <div className='flex items-center gap-2'>
                      <div className='p-2 bg-accent border border-boreder rounded-md'>
                        <HiOutlineBookOpen className='size-5' />
                      </div>
                      <h3>{module.title}</h3>
                    </div>
                    <p className='text-sm font-medium'>
                      {module.passedValue}/2
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default PathPage;
