import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HiMiniArrowLongLeft } from 'react-icons/hi2';
import { HiOutlineBookOpen } from 'react-icons/hi2';

import AnimatedProgress from '@/components/AnimatedProgress';
import Badge from '@/components/ui/badge';
import { getModules, getPathById } from '@/actions/path';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const PathPage = async ({ params }: { params: { pathId: string } }) => {
  const [path, modules] = await Promise.all([
    getPathById({ pathId: params.pathId }),
    getModules({ pathId: params.pathId }),
  ]);

  if (!path || !modules) return notFound();

  const { jobPosition, jobExperience, completed } = path;

  return (
    <div className='py-2 px-4 md:px-16 lg:px-32 xl:px-56'>
      <header className='flex items-center justify-between py-3'>
        <Link
          href='/dashboard/paths'
          className={cn(
            buttonVariants({ size: 'sm', variant: 'ghost' }),
            'group'
          )}
        >
          <HiMiniArrowLongLeft className='size-4 mr-1.5 group-hover:-translate-x-1 transition-transform' />
          Go to dashboard
        </Link>
        <h2>MockAI</h2>
      </header>
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
    </div>
  );
};

export default PathPage;
