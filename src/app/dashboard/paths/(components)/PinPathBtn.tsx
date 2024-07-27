'use client';

import { HiOutlineStar } from 'react-icons/hi2';
import { useMutation } from '@tanstack/react-query';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { updatePath } from '@/actions/path';

const PinPathBtn = ({
  pathId,
  isPinned,
}: {
  pathId: string;
  isPinned: boolean;
}) => {
  const { mutate: togglePinPath, isPending } = useMutation({
    mutationKey: ['pin-path'],
    mutationFn: updatePath,
  });

  const togglePin = () => {
    togglePinPath({ pathId, data: { pinned: !isPinned } });
  };

  return (
    <DropdownMenuItem disabled={isPending} onClick={togglePin}>
      <HiOutlineStar className='size-4 mr-2' />
      {isPinned ? 'Unpin path' : 'Pin path'}
    </DropdownMenuItem>
  );
};

export default PinPathBtn;
