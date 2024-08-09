'use client';

import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

const LogoutBtn = () => {
  return (
    <DropdownMenuItem
      asChild
      className='w-full text-red-500 hover:text-red-600 focus:text-red-600 active:text-red-600'
    >
      <LogoutLink>
        <HiOutlineArrowRightOnRectangle className='size-4 mr-1.5' />
        Log out
      </LogoutLink>
    </DropdownMenuItem>
  );
};

export default LogoutBtn;
