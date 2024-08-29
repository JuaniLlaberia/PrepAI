import Link from 'next/link';
import {
  HiOutlineEllipsisHorizontal,
  HiOutlineTrash,
  HiOutlinePlay,
  HiOutlineClipboardDocumentList,
  HiOutlinePlus,
} from 'react-icons/hi2';
import { PiArrowClockwiseLight } from 'react-icons/pi';

import DeleteInterviewModal from '../(components)/DeleteInterviewModal';
import DashboardCard from '../(components)/DashboardCard';
import InterviewsFilters from '../(components)/InterviewsFilter';
import EmptyDashboardMsg from '@/components/EmptyDashboardMsg';
import PinInterviewBtn from '../(components)/PinInterviewBtn';
import Badge from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getUserInterviews } from '@/access-data/interview';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PrepAI | Interviews',
};

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
        <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5 py-4'>
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
                <DashboardCard
                  key={String(_id)}
                  title={jobRole}
                  level={jobExperience}
                  createdAt={createdAt}
                  pinned={pinned}
                  link={
                    taken ? `/interview/${_id}/feedback` : `/interview/${_id}`
                  }
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
                            aria-label='interview options dropdown'
                          >
                            <span className='sr-only'>Interview options</span>
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
                  }
                  customBadges={
                    <Badge
                      text={passed ? 'Passed' : taken ? 'Taken' : 'New'}
                      color={passed ? 'green' : taken ? 'gray' : 'orange'}
                    />
                  }
                />
              )
            )
          ) : (
            <EmptyDashboardMsg
              type='interview'
              crrLink='/dashboard/interviews'
              newPageLink='/interview/new'
            />
          )}
        </ul>
      </div>
    </>
  );
};

export default InterviewsPage;
