import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HiOutlineBookOpen } from 'react-icons/hi2';

import AnimatedProgress from '@/components/AnimatedProgress';
import Badge from '@/components/ui/badge';
import PageHeader from '@/components/PageHeader';
import { getModules, getPathById } from '@/actions/path';

const PathPage = async ({ params }: { params: { pathId: string } }) => {
  const [path, modules] = await Promise.all([
    getPathById({ pathId: params.pathId }),
    getModules({ pathId: params.pathId }),
  ]);

  if (!path || !modules) return notFound();

  const { jobPosition, jobExperience, completed } = path;

  return (
    <>
      <PageHeader text='Go to paths' link='/dashboard/paths' />
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
          <div className='flex justify-between items-center'>
            <h2 className='text-sm lg:text-base xl:text-lg font-semibold mb-1'>
              Your progress
            </h2>
            <p className='text-sm px-1'>2/10</p>
          </div>
          <AnimatedProgress value={20} />
        </div>
      </div>
      <div className='mt-5'>
        <h2 className='mb-2 text-sm lg:text-base xl:text-lg font-semibold'>
          Modules
        </h2>
        <ul className='flex flex-col gap-1.5'>
          {modules.map(module => (
            <li key={module.id}>
              <Link
                href={`/path/${params.pathId}/module/${module.id}`}
                className='flex items-center justify-between border border-border p-3 rounded-lg'
              >
                <div className='flex items-center gap-2'>
                  <div className='p-2 bg-accent border border-boreder rounded-md'>
                    <HiOutlineBookOpen className='size-5' />
                  </div>
                  <h3>{module.title}</h3>
                </div>
                <p className='text-sm font-medium'>0/2</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PathPage;
