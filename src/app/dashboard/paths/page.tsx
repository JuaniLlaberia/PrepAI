import Link from 'next/link';
import {
  HiMiniArrowLongRight,
  HiOutlineEllipsisHorizontal,
  HiOutlinePlay,
  HiOutlinePlus,
  HiOutlineTrash,
} from 'react-icons/hi2';

import PinPathBtn from './(components)/PinPathBtn';
import PathFilters from './(components)/PathFilters';
import Badge from '@/components/ui/badge';
import DeletePathModal from './(components)/DeletePathModal';
import { Button, buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { getUserPaths } from '@/access-data/paths';

const PathsPage = async ({
  searchParams: { sortBy, filter },
}: {
  searchParams: {
    sortBy: 'createdAt' | 'name';
    filter: 'progress' | 'completed';
  };
}) => {
  const paths = await getUserPaths({ sort: sortBy, filter });

  return (
    <>
      <div className='mb-3 flex items-center gap-2 justify-end'>
        <PathFilters sortBy={sortBy} filter={filter} />
        <Link className={buttonVariants({ size: 'sm' })} href='/path/new'>
          <HiOutlinePlus className='size-4 mr-2' /> New path
        </Link>
      </div>
      <div>
        <h2 className='mb-2 text-sm lg:text-base xl:text-lg font-medium'>
          Your paths
        </h2>
        <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5 pb-4'>
          {paths.length > 0 ? (
            paths.map(
              ({
                id,
                jobPosition,
                jobExperience,
                createdAt,
                completed,
                pinned,
              }) => (
                <li
                  key={id}
                  className='relative bg-background dark:bg-background-2 p-4 border border-border rounded-lg shadow'
                >
                  <Link href={`/path/${id}`}>
                    <h3 className='text-base lg:text-lg font-medium line-clamp-2 mb-2'>
                      {jobPosition}
                    </h3>
                    <div className='flex items-center gap-2'>
                      <Badge text={`${jobExperience} level`} color='purple' />
                      {completed ? (
                        <Badge text='Completed' color='green' />
                      ) : (
                        <Badge text='In progress' color='orange' />
                      )}
                      {pinned ? <Badge text='Pinned' color='blue' /> : null}
                    </div>
                    <p className='text-muted-foreground text-sm text-end mt-3'>
                      {createdAt.toDateString()}
                    </p>
                    <div className='flex items-center mt-4'>
                      <Button
                        variant='outline'
                        size='sm'
                        className='w-full group'
                      >
                        View modules
                        <HiMiniArrowLongRight className='size-4 ml-2 group-hover:translate-x-1 transition-transform' />
                      </Button>
                    </div>
                  </Link>
                  <Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger className='absolute top-4 right-4'>
                        <Button size='icon' variant='ghost' className='size-8'>
                          <HiOutlineEllipsisHorizontal className='size-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <PinPathBtn pathId={id} isPinned={pinned} />
                        <DropdownMenuItem asChild>
                          <Link href={`/exam/${id}`}>
                            <HiOutlinePlay className='size-4 mr-2' />
                            Go to path
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          asChild
                          className='w-full text-red-500 hover:text-red-600 focus:text-red-600 active:text-red-600'
                        >
                          <DialogTrigger>
                            <HiOutlineTrash className='size-4 mr-2' />
                            Delete
                          </DialogTrigger>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                      <DeletePathModal pathId={id} jobPosition={jobPosition} />
                    </DialogContent>
                  </Dialog>
                </li>
              )
            )
          ) : (
            <div className='flex flex-col col-span-full gap-2 justify-center items-center py-6 text-muted-foreground'>
              <p>No paths found</p>
              <Link
                className={cn(buttonVariants({ variant: 'default' }), 'group')}
                href='/path/new'
              >
                New preparation path
                <HiMiniArrowLongRight className='size-4 ml-2 group-hover:translate-x-1 transition-transform' />
              </Link>
            </div>
          )}
        </ul>
      </div>
    </>
  );
};

export default PathsPage;
