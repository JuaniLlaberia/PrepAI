'use client';

import { HiOutlineStar } from 'react-icons/hi2';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useServerActionMutation } from '@/hooks/server-action-hooks';
import { updateInterviewAction } from '@/actions/interview';

const PinInterviewBtn = ({
  interviewId,
  isPinned,
}: {
  interviewId: string;
  isPinned: boolean;
}) => {
  const { mutate: updateInterview, isPending } = useServerActionMutation(
    updateInterviewAction,
    {
      mutationKey: ['pin-interview'],
    }
  );

  const togglePin = () => {
    updateInterview({ interviewId, interview: { pinned: !isPinned } });
  };

  return (
    <DropdownMenuItem disabled={isPending} onClick={togglePin}>
      <HiOutlineStar className='size-4 mr-2' />
      {isPinned ? 'Unpin interview' : 'Pin interview'}
    </DropdownMenuItem>
  );
};

export default PinInterviewBtn;
