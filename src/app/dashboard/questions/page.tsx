import Link from 'next/link';
import {
  HiOutlineEllipsisHorizontal,
  HiOutlineTrash,
  HiOutlinePlus,
} from 'react-icons/hi2';

import EmptyDashboardMsg from '@/components/EmptyDashboardMsg';
import QuestionsFilter from './(components)/QuestionsFilter';
import DashboardCard from '../(components)/DashboardCard';
import PinQuestionBtn from './(components)/PinQuestionBtn';
import Badge from '@/components/ui/badge';
import DeleteQuestionModal from './(components)/DeleteQuestionModal';
import { buttonVariants } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Metadata } from 'next';
import { getUserQuestions } from '@/access-data/question';

export const metadata: Metadata = {
  title: 'PrepAI | Questions',
};

const QuestionsBankPage = async ({
  searchParams,
}: {
  searchParams: {
    sortBy: 'createdAt' | 'name';
    filter: 'all' | 'behavioral' | 'technical' | 'analytical';
  };
}) => {
  const questions = await getUserQuestions({
    sort: searchParams.sortBy || 'createdAt',
    filter: searchParams.filter || 'all',
  });

  return (
    <>
      <div className='mb-3 flex items-center gap-2 justify-end'>
        <QuestionsFilter
          sortBy={searchParams.sortBy}
          filter={searchParams.filter}
        />
        <Link className={buttonVariants({ size: 'sm' })} href='/question/new'>
          <HiOutlinePlus className='size-4 mr-2' strokeWidth={2.5} /> New
          question
        </Link>
      </div>
      <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5 py-4'>
        {questions.length > 0 ? (
          questions.map(
            ({ _id, question, difficulty, type, createdAt, pinned }) => (
              <DashboardCard
                key={String(_id)}
                title={question}
                level={difficulty}
                createdAt={createdAt}
                pinned={pinned}
                link={`/question/${String(_id)}`}
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
                          aria-label='questions options dropdown'
                        >
                          <span className='sr-only'>Question options</span>
                          <HiOutlineEllipsisHorizontal className='size-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <PinQuestionBtn
                          questionId={String(_id)}
                          isPinned={pinned}
                        />
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
                      <DeleteQuestionModal questionId={String(_id)} />
                    </DialogContent>
                  </Dialog>
                }
                customBadges={<Badge text={type} color='purple' />}
              />
            )
          )
        ) : (
          <EmptyDashboardMsg
            type='question'
            crrLink='/dashboard/questions'
            newPageLink='/question/new'
          />
        )}
      </ul>
    </>
  );
};

export default QuestionsBankPage;
