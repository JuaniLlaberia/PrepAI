import Link from 'next/link';
import {
  HiOutlineClipboardDocumentList,
  HiOutlineEllipsisHorizontal,
  HiOutlinePlay,
  HiOutlinePlus,
  HiOutlineTrash,
} from 'react-icons/hi2';
import { PiArrowClockwiseLight } from 'react-icons/pi';

import EmptyDashboardMsg from '@/components/EmptyDashboardMsg';
import PinExamBtn from './(components)/PinExamBtn';
import DeleteExamModal from './(components)/DeleteExamModal';
import DashboardCard from '../(components)/DashboardCard';
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
        <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5 py-4'>
          {exams.length > 0 ? (
            exams.map(
              ({
                _id,
                subject,
                difficulty,
                createdAt,
                taken,
                pinned,
                examType,
                passed,
              }) => (
                <DashboardCard
                  key={String(_id)}
                  title={subject}
                  level={difficulty}
                  createdAt={createdAt}
                  taken={taken}
                  pinned={pinned}
                  type={
                    examType === 'true-false'
                      ? 'True or False'
                      : 'Multiple Choice'
                  }
                  passed={passed}
                  link={taken ? `/exam/${_id}/results` : `/exam/${_id}`}
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
                        <DeleteExamModal
                          examId={String(_id)}
                          subject={subject}
                        />
                      </DialogContent>
                    </Dialog>
                  }
                />
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
