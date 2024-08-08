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

import DeleteInterviewModal from '../(components)/DeleteInterviewModal';
import Badge from '@/components/ui/badge';
import InterviewsFilters from '../(components)/InterviewsFilter';
import PinInterviewBtn from '../(components)/PinInterviewBtn';
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
import { getUserInterviews } from '@/access-data/interview';

const InterviewsPage = async ({
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
          <HiOutlinePlus className='size-4 mr-2' strokeWidth={2.5} /> New
          interview
        </Link>
      </div>
      <div>
        <h2 className='mb-2 text-sm lg:text-base xl:text-lg font-medium'>
          Your interviews
        </h2>
        <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5 pb-4'>
          {interviews.length > 0 ? (
            interviews.map(
              ({
                _id,
                jobExperience,
                jobRole,
                createdAt,
                taken,
                pinned,
                passed,
              }) => (
                <li
                  key={String(_id)}
                  className='relative p-4 bg-background rounded-xl border-[1px] border-b-[3.5px] border-[#ebebeb] dark:border-accent dark:bg-background-2 hover:border-[#cdcdcd] dark:hover:border-[#474747] transition-colors'
                >
                  <Link
                    href={
                      taken ? `/interview/${_id}/feedback` : `/interview/${_id}`
                    }
                    className='flex flex-col gap-4'
                  >
                    <div className='flex items-center gap-2'>
                      <Badge text={`${jobExperience} level`} color='purple' />
                      <Badge
                        text={passed ? 'Passed' : taken ? 'Taken' : 'New'}
                        color={passed ? 'green' : taken ? 'gray' : 'orange'}
                      />
                      {pinned ? <Badge text='Pinned' color='blue' /> : null}
                    </div>
                    <h3 className='text-xl font-medium mb-2'>{jobRole}</h3>
                    <p className='text-muted-foreground text-sm text-start mt-3'>
                      {createdAt.toDateString()}
                    </p>
                  </Link>
                  <Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger className='absolute top-4 right-4'>
                        <Button size='icon' variant='ghost' className='size-8'>
                          <HiOutlineEllipsisHorizontal className='size-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <PinInterviewBtn
                          interviewId={String(_id)}
                          isPinned={pinned}
                        />
                        {!taken ? (
                          <DropdownMenuItem asChild>
                            <Link href={`/interview/${_id}`}>
                              <HiOutlinePlay className='size-4 mr-2' />
                              Start now
                            </Link>
                          </DropdownMenuItem>
                        ) : (
                          <>
                            <DropdownMenuItem asChild>
                              <Link href={`/interview/${_id}`}>
                                <PiArrowClockwiseLight className='size-4 mr-2' />
                                Re-take
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/interview/${_id}/feedback`}>
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
                        interviewId={String(_id)}
                        jobRole={jobRole}
                      />
                    </DialogContent>
                  </Dialog>
                </li>
              )
            )
          ) : (
            <div className='flex flex-col col-span-full gap-2 justify-center items-center py-6 text-muted-foreground'>
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

export default InterviewsPage;
