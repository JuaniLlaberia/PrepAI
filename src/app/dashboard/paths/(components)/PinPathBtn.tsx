'use client';

import { HiOutlineStar } from 'react-icons/hi2';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useServerActionMutation } from '@/hooks/server-action-hooks';
import { updatePathAction } from '@/actions/path';

const PinPathBtn = ({
  pathId,
  isPinned,
}: {
  pathId: string;
  isPinned: boolean;
}) => {
  const { mutate: updatePath, isPending } = useServerActionMutation(
    updatePathAction,
    {
      mutationKey: ['pin-path'],
    }
  );

  const togglePin = () => {
    updatePath({ pathId, path: { pinned: !isPinned } });
  };

  return (
    <DropdownMenuItem disabled={isPending} onClick={togglePin}>
      <HiOutlineStar className='size-4 mr-2' />
      {isPinned ? 'Unpin path' : 'Pin path'}
    </DropdownMenuItem>
  );
};

export default PinPathBtn;
