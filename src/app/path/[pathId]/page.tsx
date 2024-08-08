import { notFound } from 'next/navigation';
import { HiCheckCircle } from 'react-icons/hi2';

import AnimatedProgress from '@/components/AnimatedProgress';
import Badge from '@/components/ui/badge';
import ConfettiComponent from '@/components/Confetti';
import PageHeader from '@/components/PageHeader';
import ModuleButton from './(components)/ModuleButton';
import { getPathById } from '@/access-data/paths';
import { getModules } from '@/access-data/modules';
import { cn } from '@/lib/utils';

const PathPage = async ({
  params: { pathId },
}: {
  params: { pathId: string };
}) => {
  const [path, modules] = await Promise.all([
    getPathById({ pathId }),
    getModules({ pathId }),
  ]);

  if (!path || !modules) return notFound();

  const { jobPosition, jobExperience, completed, totalModules } = path;
  const passedModules = modules.reduce(
    (prev, module) => (module.completed ? prev + 1 : prev),
    0
  );

  return (
    <>
      {path.completed ? <ConfettiComponent /> : null}
      <PageHeader link='/dashboard/paths' />
      <div className='flex flex-col items-center mt-2'>
        <section className='w-full max-w-[800px] overflow-x-hidden pb-3'>
          <div>
            <h1 className='text-xl font-medium mb-2 xl:text-2xl'>
              {jobPosition} path
            </h1>
            <div className='flex gap-2'>
              <Badge text={`${jobExperience} level`} color='purple' />
              {completed ? (
                <Badge text='Completed' color='green' />
              ) : (
                <Badge text='In progress' color='orange' />
              )}
            </div>
            <div className='mt-6 flex flex-col bg-background-2 rounded-xl p-4 border-[1px] border-b-[3.5px] border-[#ebebeb] dark:border-accent'>
              <h2 className='text-base xl:text-lg font-semibold mb-1'>
                Your progress
              </h2>
              <div className='flex justify-between items-center text-sm px-1 mb-1'>
                <p>
                  {Math.round((passedModules / totalModules) * 100)} % completed
                </p>
                <p>
                  {passedModules}/{totalModules}
                </p>
              </div>
              <AnimatedProgress
                value={(passedModules / totalModules) * 100}
                className='h-4'
              />
            </div>
          </div>
          <div className='mt-5'>
            <h2 className='mb-2 text-sm lg:text-base xl:text-lg font-semibold'>
              Stages
            </h2>
            <ul className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
              {modules.map(
                (
                  {
                    _id,
                    completed,
                    inProgress,
                    completedActivities,
                    title,
                    order,
                    activitiesLength,
                  },
                  i
                ) => (
                  <li
                    key={String(_id)}
                    className={cn(
                      'flex flex-col gap-4 p-5 rounded-xl border-[1px] border-b-[3.5px]',
                      inProgress && !completed
                        ? 'bg-violet-200 border-violet-300 dark:bg-violet-400 dark:border-violet-600'
                        : completed
                        ? 'bg-green-100 border-green-200 dark:bg-green-400 dark:border-green-600'
                        : 'bg-background-2 border-[#ebebeb] dark:border-accent'
                    )}
                  >
                    <div
                      className={cn(
                        'mb-1',
                        !inProgress || completed
                          ? 'text-muted-foreground dark:text-white/80'
                          : null
                      )}
                    >
                      <h3 className='flex items-center gap-1 text-lg font-semibold mb-1.5'>
                        Stage {order} •
                        {inProgress ? (
                          <span>{completed ? 'Completed' : 'In progress'}</span>
                        ) : (
                          <span className='flex items-center gap-1 text-sm font-semibold'>
                            {activitiesLength} sections
                          </span>
                        )}
                      </h3>
                      <h4 className='font-medium'>{title}</h4>
                    </div>
                    {inProgress && !completed ? (
                      <div className='relative'>
                        <AnimatedProgress
                          value={(completedActivities / activitiesLength) * 100}
                          className='h-5 bg-background'
                        />
                        <p className='absolute left-1/2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium text-white mix-blend-difference'>
                          {completedActivities} / {activitiesLength}
                        </p>
                      </div>
                    ) : null}
                    <div className='flex items-center justify-between mt-5'>
                      {completed ? (
                        <div>
                          <p className='flex items-center gap-1.5 text-green-500 dark:text-green-50 font-semibold'>
                            <HiCheckCircle className='size-6' /> COMPLETED!
                          </p>
                        </div>
                      ) : (
                        <ModuleButton
                          pathId={pathId}
                          moduleId={String(_id)}
                          stageNum={i + 1}
                          inProgress={inProgress}
                        />
                      )}
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default PathPage;
