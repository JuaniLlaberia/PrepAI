import Link from 'next/link';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';

import LogoutBtn from './LogoutBtn';
import ThemeMenu from './ThemeMenu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const UserMenu = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className='flex items-center gap-2 cursor-pointer'>
          <Avatar className='size-9 border border-border'>
            <AvatarFallback>{user?.given_name?.at(0)}</AvatarFallback>
            <AvatarImage src={user?.picture ?? undefined} />
          </Avatar>
          <p className='hidden lg:flex lg:flex-col lg:items-start'>
            <span className='font-medium text-sm'>
              {user?.given_name} {user?.family_name}
            </span>
            <span className='text-sm text-muted-foreground'>{user?.email}</span>
          </p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href='/dashboard'>
            <HiOutlineSquares2X2 className='size-4 mr-1.5' />
            My interviews
          </Link>
        </DropdownMenuItem>
        <ThemeMenu />
        <DropdownMenuSeparator />
        <LogoutBtn />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
