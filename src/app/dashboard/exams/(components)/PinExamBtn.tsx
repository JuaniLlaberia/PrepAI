'use client';

import { HiOutlineStar } from 'react-icons/hi2';
import { useMutation } from '@tanstack/react-query';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { updateExam } from '@/actions/exams';

const PinExamBtn = ({
  examId,
  isPinned,
}: {
  examId: string;
  isPinned: boolean;
}) => {
  const { mutate: togglePinExam, isPending } = useMutation({
    mutationKey: ['pin-exam'],
    mutationFn: updateExam,
  });

  const togglePin = () => {
    togglePinExam({ examId, data: { pinned: !isPinned } });
  };

  return (
    <DropdownMenuItem disabled={isPending} onClick={togglePin}>
      <HiOutlineStar className='size-4 mr-2' />
      {isPinned ? 'Unpin mock exam' : 'Pin mock exam'}
    </DropdownMenuItem>
  );
};

export default PinExamBtn;
