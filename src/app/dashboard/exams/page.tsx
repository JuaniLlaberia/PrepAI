import Link from 'next/link';
import {
  HiOutlineClipboardDocumentList,
  HiOutlineEllipsisHorizontal,
  HiOutlinePlay,
  HiOutlinePlus,
  HiOutlineTrash,
} from 'react-icons/hi2';
import { PiArrowClockwiseLight } from 'react-icons/pi';

import DifficultyBadge from './(components)/DifficultyBadge';
import EmptyDashboardMsg from '@/components/EmptyDashboardMsg';
import Badge from '@/components/ui/badge';
import PinExamBtn from './(components)/PinExamBtn';
import DeleteExamModal from './(components)/DeleteExamModal';
import ExamFilters from './(components)/ExamsFilters';
import { Button, buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getUserExams } from '@/access-data/exams';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PrepAI | Exams',
};

const ExamsPage = async ({
  searchParams,
}: {
  searchParams: {
    sortBy: 'createdAt' | 'name';
    filter: 'all' | 'easy' | 'medium' | 'hard';
  };
}) => {
  const exams = await getUserExams({
    filter: searchParams.filter || 'all',
    sort: searchParams.sortBy || 'createdAt',
  });

  return (
    <>
      <div className='mb-3 flex items-center gap-2 justify-end'>
        <ExamFilters
          sortBy={searchParams.sortBy}
          filter={searchParams.filter}
        />
        <Link className={buttonVariants({ size: 'sm' })} href='/exam/new'>
          <HiOutlinePlus className='size-4 mr-2' strokeWidth={2.5} /> New mock
          exam
        </Link>
      </div>
      <div>
        <h2 className='mb-2 text-sm lg:text-base xl:text-lg font-medium'>
          Your exams
        </h2>
        <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5 pb-4'>
          {exams.length > 0 ? (
            exams.map(
              ({
                _id,
                subject,
                difficulty,
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
                    href={taken ? `/exam/${_id}/results` : `/exam/${_id}`}
                    className='flex flex-col gap-4'
                  >
                    <div className='flex items-center gap-2'>
                      <DifficultyBadge difficulty={difficulty} />
                      <Badge
                        text={passed ? 'Passed' : taken ? 'Taken' : 'New'}
                        color={passed ? 'green' : taken ? 'gray' : 'orange'}
                      />
                      {pinned ? <Badge text='Pinned' color='blue' /> : null}
                    </div>
                    <h3 className='text-xl font-medium mb-2'>{subject}</h3>
                    <p className='text-muted-foreground text-sm text-start mt-3'>
                      {createdAt.toDateString()}
                    </p>
                  </Link>
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
                          aria-label='exam options dropdown'
                        >
                          <span className='sr-only'>Exam options</span>
                          <HiOutlineEllipsisHorizontal className='size-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <PinExamBtn isPinned={pinned} examId={String(_id)} />
                        {!taken ? (
                          <DropdownMenuItem asChild>
                            <Link href={`/exam/${_id}`}>
                              <HiOutlinePlay className='size-4 mr-2' />
                              Start now
                            </Link>
                          </DropdownMenuItem>
                        ) : (
                          <>
                            <DropdownMenuItem asChild>
                              <Link href={`/exam/${_id}`}>
                                <PiArrowClockwiseLight className='size-4 mr-2' />
                                Re-take
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/exam/${_id}/results`}>
                                <HiOutlineClipboardDocumentList className='size-4 mr-2' />
                                Results
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
                      <DeleteExamModal examId={String(_id)} subject={subject} />
                    </DialogContent>
                  </Dialog>
                </li>
              )
            )
          ) : (
            <EmptyDashboardMsg
              type='exam'
              crrLink='/dashboard/exams'
              newPageLink='/exam/new'
            />
          )}
        </ul>
      </div>
    </>
  );
};

export default ExamsPage;
