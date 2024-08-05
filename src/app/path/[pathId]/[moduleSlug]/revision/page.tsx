import { getModuleRevision } from '@/access-data/modules';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import {
  HiCheckCircle,
  HiOutlineArrowTopRightOnSquare,
} from 'react-icons/hi2';

const ModuleRevisionPage = async ({
  params: { pathId, moduleSlug },
}: {
  params: { pathId: string; moduleSlug: string };
}) => {
  const revisionData = await getModuleRevision({ pathId, moduleSlug });
  const { title, description, references } = revisionData;

  return (
    <>
      <PageHeader text='Go to path' link={`/path/${pathId}/${moduleSlug}`} />
      <section>
        <h1 className='text-2xl font-medium mb-1'>{title}</h1>
        <p className='text-muted-foreground'>{description}</p>
      </section>
      <section className='mt-6'>
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
        <div className='mt-5'>
          <Button className='w-full'>
            <HiCheckCircle className='size-4 mr-1.5' />
            Mark as completed
          </Button>
        </div>
      </section>
    </>
  );
};

export default ModuleRevisionPage;
