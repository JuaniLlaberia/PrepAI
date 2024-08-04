import Link from 'next/link';
import {
  HiMiniArrowLongRight,
  HiOutlineClipboardDocumentList,
  HiOutlineEllipsisHorizontal,
  HiOutlinePlay,
  HiOutlinePlus,
  HiOutlineTrash,
} from 'react-icons/hi2';
import { PiArrowClockwiseLight } from 'react-icons/pi';

import DifficultyBadge from './(components)/DifficultyBadge';
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
import { cn } from '@/lib/utils';
import { getUserExams } from '@/access-data/exams';

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
                id,
                subject,
                difficulty,
                createdAt,
                taken,
                pinned,
                passed,
              }) => (
                <li
                  key={id}
                  className='relative p-4 bg-background rounded-xl shadow dark:bg-background-2'
                >
                  <Link
                    href={taken ? `/exam/${id}/results` : `/exam/${id}`}
                    className='flex flex-col gap-4'
                  >
                    <div className='flex items-center gap-2'>
                      <DifficultyBadge difficulty={difficulty} />
                      <Badge
                        text={taken ? 'Taken' : 'New'}
                        color={taken ? 'gray' : 'orange'}
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
                      <DropdownMenuTrigger className='absolute top-4 right-4'>
                        <Button size='icon' variant='ghost' className='size-8'>
                          <HiOutlineEllipsisHorizontal className='size-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <PinExamBtn isPinned={pinned} examId={id} />
                        {!taken ? (
                          <DropdownMenuItem asChild>
                            <Link href={`/exam/${id}`}>
                              <HiOutlinePlay className='size-4 mr-2' />
                              Start now
                            </Link>
                          </DropdownMenuItem>
                        ) : (
                          <>
                            <DropdownMenuItem asChild>
                              <Link href={`/exam/${id}`}>
                                <PiArrowClockwiseLight className='size-4 mr-2' />
                                Re-take
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/exam/${id}/results`}>
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
                      <DeleteExamModal examId={id} subject={subject} />
                    </DialogContent>
                  </Dialog>
                </li>
              )
            )
          ) : (
            <div className='flex flex-col col-span-full gap-2 justify-center items-center py-6 text-muted-foreground'>
              <p>No exams found</p>
              <Link
                className={cn(buttonVariants({ variant: 'default' }), 'group')}
                href='/exam/new'
              >
                New mock exam
                <HiMiniArrowLongRight className='size-4 ml-2 group-hover:translate-x-1 transition-transform' />
              </Link>
            </div>
          )}
        </ul>
      </div>
    </>
  );
};

export default ExamsPage;
