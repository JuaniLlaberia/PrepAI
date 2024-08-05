import { HiCheckCircle, HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2';

import PageHeader from '@/components/PageHeader';
import { getModuleProject } from '@/access-data/modules';
import { Button } from '@/components/ui/button';

const ModuleProjectPage = async ({
  params: { pathId, moduleSlug },
}: {
  params: { pathId: string; moduleSlug: string };
}) => {
  const projectData = await getModuleProject({ pathId, moduleSlug });
  const { title, content, steps, references } = projectData;

  console.log(projectData);

  return (
    <>
      <PageHeader text='Go to path' link={`/path/${pathId}/${moduleSlug}`} />
      <div>
        <h1 className='text-2xl font-medium mb-1'>{title}</h1>
        <p className='text-muted-foreground'>{content}</p>
      </div>

      <div className='mt-6'>
        <h2 className='text-sm lg:text-base xl:text-lg font-semibold mb-1'>
          Steps to follow
        </h2>
        <ul className='flex flex-col gap-2'>
          {steps.map((step, i) => (
            <li key={i}>
              #{i + 1} {step}
            </li>
          ))}
        </ul>
      </div>
      <div className='mt-6'>
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
      </div>
      <div className='mt-5'>
        <Button className='w-full'>
          <HiCheckCircle className='size-4 mr-1.5' />
          Mark as completed
        </Button>
      </div>
    </>
  );
};

export default ModuleProjectPage;
