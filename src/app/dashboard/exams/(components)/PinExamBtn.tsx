'use client';

import { HiOutlineStar } from 'react-icons/hi2';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useServerActionMutation } from '@/hooks/server-action-hooks';
import { updateExamAction } from '@/actions/exams';

const PinExamBtn = ({
  examId,
  isPinned,
}: {
  examId: string;
  isPinned: boolean;
}) => {
  const { mutate: updateExam, isPending } = useServerActionMutation(
    updateExamAction,
    {
      mutationKey: ['pin-exam'],
    }
  );

  const togglePin = () => {
    updateExam({ examId, exam: { pinned: !isPinned } });
  };

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={togglePin}
    >
      <HiOutlineStar className='size-4 mr-2' />
      {isPinned ? 'Unpin mock exam' : 'Pin mock exam'}
    </DropdownMenuItem>
  );
};

export default PinExamBtn;
