import Link from 'next/link';
import {
  HiOutlineEllipsisHorizontal,
  HiOutlinePlus,
  HiOutlineTrash,
} from 'react-icons/hi2';
import { PiTreeStructureLight } from 'react-icons/pi';

import PinPathBtn from './(components)/PinPathBtn';
import PathFilters from './(components)/PathFilters';
import Badge from '@/components/ui/badge';
import DashboardCard from '../(components)/DashboardCard';
import DeletePathModal from './(components)/DeletePathModal';
import EmptyDashboardMsg from '@/components/EmptyDashboardMsg';
import { Button, buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Metadata } from 'next';
import { getUserPaths } from '@/access-data/paths';

export const metadata: Metadata = {
  title: 'PrepAI | Paths',
};

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
          <HiOutlinePlus className='size-4 mr-2' strokeWidth={2.5} /> New path
        </Link>
      </div>
      <div>
        <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5 py-4'>
          {paths.length > 0 ? (
            paths.map(
              ({
                _id,
                jobPosition,
                jobExperience,
                createdAt,
                completed,
                pinned,
                totalModules,
                completedModules,
              }) => (
                <DashboardCard
                  key={String(_id)}
                  title={jobPosition}
                  level={jobExperience}
                  createdAt={createdAt}
                  pinned={pinned}
                  totalModules={totalModules}
                  completedModules={completedModules}
                  link={`/path/${String(_id)}`}
                  dialog={
                    <Dialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className='absolute top-4 right-4'
                          asChild
                        >
                          <Button
                            size='icon'
                            variant='ghost'
                            className='size-8'
                            aria-label='path options dropdown'
                          >
                            <span className='sr-only'>Path options</span>
                            <HiOutlineEllipsisHorizontal className='size-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <PinPathBtn pathId={String(_id)} isPinned={pinned} />
                          <DropdownMenuItem asChild>
                            <Link href={`/path/${String(_id)}`}>
                              <PiTreeStructureLight className='size-4 mr-2' />
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
                        <DeletePathModal
                          pathId={String(_id)}
                          jobPosition={jobPosition}
                        />
                      </DialogContent>
                    </Dialog>
                  }
                  customBadges={
                    <>
                      {completed ? (
                        <Badge text='Completed' color='green' />
                      ) : (
                        <Badge text='In progress' color='orange' />
                      )}
                    </>
                  }
                />
              )
            )
          ) : (
            <EmptyDashboardMsg
              type='path'
              crrLink='/dashboard/paths'
              newPageLink='/path/new'
            />
          )}
        </ul>
      </div>
    </>
  );
};

export default PathsPage;
