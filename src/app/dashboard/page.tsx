import Link from 'next/link';
import {
  HiOutlineEllipsisHorizontal,
  HiOutlineTrash,
  HiOutlinePlay,
  HiOutlineClipboardDocumentList,
  HiMiniArrowLongRight,
  HiOutlinePlus,
} from 'react-icons/hi2';
import { PiArrowClockwiseLight } from 'react-icons/pi';

import DeleteInterviewModal from './(components)/DeleteInterviewModal';
import Badge from '@/components/ui/badge';
import PinBtn from './(components)/PinBtn';
import InterviewsFilters from './(components)/InterviewsFilter';
import { getUserInterviews } from '@/actions/interview';
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

const DashboardPage = async ({
  searchParams,
}: {
  searchParams: {
    sortBy: 'createdAt' | 'name';
    filter: 'all' | 'taken' | 'new';
  };
}) => {
  const interviews = await getUserInterviews({
    sort: searchParams.sortBy || 'createdAt',
    filter: searchParams.filter || 'all',
  });

  return (
    <>
      <div className='mb-3 flex items-center gap-2 justify-end'>
        <InterviewsFilters
          sortBy={searchParams.sortBy}
          filter={searchParams.filter}
        />
        <Link className={buttonVariants({ size: 'sm' })} href='/interview/new'>
          <HiOutlinePlus className='size-4 mr-2' /> New interview
        </Link>
      </div>
      <div>
        <h2 className='mb-2 text-sm lg:text-base xl:text-lg font-medium'>
          Your interviews
        </h2>
        <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5 pb-4'>
          {interviews.length > 0 ? (
            interviews.map(
              ({ id, jobExperience, jobRole, createdAt, taken, pinned }) => (
                <li
                  key={id}
                  className='relative bg-background dark:bg-background-2 p-4 border border-border rounded-lg shadow'
                >
                  <Link
                    href={
                      taken ? `/interview/${id}/feedback` : `/interview/${id}`
                    }
                  >
                    <h3 className='text-base lg:text-lg font-medium tracking-tight line-clamp-2 mb-2'>
                      {jobRole}
                    </h3>
                    <div className='flex items-center gap-2'>
                      <Badge text={`${jobExperience} level`} color='purple' />
                      <Badge
                        text={taken ? 'Taken' : 'New'}
                        color={taken ? 'gray' : 'orange'}
                      />
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
                        {taken ? 'See feedback' : 'Start interview'}
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
                        <PinBtn interviewId={id} isPinned={pinned} />
                        {!taken ? (
                          <DropdownMenuItem asChild>
                            <Link href={`/interview/${id}`}>
                              <HiOutlinePlay className='size-4 mr-2' />
                              Start now
                            </Link>
                          </DropdownMenuItem>
                        ) : (
                          <>
                            <DropdownMenuItem asChild>
                              <Link href={`/interview/${id}`}>
                                <PiArrowClockwiseLight className='size-4 mr-2' />
                                Re-take
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/interview/${id}/feedback`}>
                                <HiOutlineClipboardDocumentList className='size-4 mr-2' />
                                Feedback
                              </Link>
                            </DropdownMenuItem>
                          </>
                        )}
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
                      <DeleteInterviewModal
                        interviewId={id}
                        jobRole={jobRole}
                      />
                    </DialogContent>
                  </Dialog>
                </li>
              )
            )
          ) : (
            <div className='flex flex-col gap-2 justify-center items-center py-6 text-muted-foreground'>
              <p>No interviews found</p>
              <Link
                className={cn(buttonVariants({ variant: 'default' }), 'group')}
                href='/interview/new'
              >
                New interview
                <HiMiniArrowLongRight className='size-4 ml-2 group-hover:translate-x-1 transition-transform' />
              </Link>
            </div>
          )}
        </ul>
      </div>
    </>
  );
};

export default DashboardPage;
