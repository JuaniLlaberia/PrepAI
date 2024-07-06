'use client';

import { HiOutlineStar } from 'react-icons/hi2';
import { useMutation } from '@tanstack/react-query';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { updateInterview } from '@/actions/interview';

const PinInterviewBtn = ({
  interviewId,
  isPinned,
}: {
  interviewId: string;
  isPinned: boolean;
}) => {
  const { mutate: togglePinInterview, isPending } = useMutation({
    mutationKey: ['pin-interview'],
    mutationFn: updateInterview,
  });

  const togglePin = () => {
    togglePinInterview({ interviewId, data: { pinned: !isPinned } });
  };

  return (
    <DropdownMenuItem disabled={isPending} onClick={togglePin}>
      <HiOutlineStar className='size-4 mr-2' />
      {isPinned ? 'Unpin interview' : 'Pin interview'}
    </DropdownMenuItem>
  );
};

export default PinInterviewBtn;
