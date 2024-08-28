'use client';

import { HiOutlineStar } from 'react-icons/hi2';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useServerActionMutation } from '@/hooks/server-action-hooks';
import { updateQuestionAction } from '@/actions/question';

const PinQuestionBtn = ({
  questionId,
  isPinned,
}: {
  questionId: string;
  isPinned: boolean;
}) => {
  const { mutate: updateQuestion, isPending } = useServerActionMutation(
    updateQuestionAction,
    {
      mutationKey: ['pin-question'],
    }
  );

  const togglePin = () => {
    updateQuestion({ questionId, question: { pinned: !isPinned } });
  };

  return (
    <DropdownMenuItem disabled={isPending} onClick={togglePin}>
      <HiOutlineStar className='size-4 mr-2' />
      {isPinned ? 'Unpin question' : 'Pin question'}
    </DropdownMenuItem>
  );
};

export default PinQuestionBtn;
