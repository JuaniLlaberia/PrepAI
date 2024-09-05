import Link from 'next/link';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { notFound } from 'next/navigation';

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
import { getUserData } from '@/access-data/user';

const UserMenu = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return notFound();

  const userData = await getUserData(user?.id);
  const { name, email, profileImg } = userData;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label='user dropdown menu'>
        <div className='flex items-center gap-2 cursor-pointer lg:hover:bg-accent lg:p-2 lg:px-3.5 lg:rounded-lg lg:transition-colors'>
          <Avatar className='size-9 border border-border'>
            <AvatarFallback>{name.at(0) ?? email.at(0)}</AvatarFallback>
            <AvatarImage src={profileImg} alt='user profile photo' />
          </Avatar>
          <p className='hidden lg:flex lg:flex-col lg:items-start'>
            <span className='font-medium text-sm'>{name}</span>
            <span className='text-sm text-muted-foreground'>{email}</span>
          </p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='lg:w-[200px]'>
        <DropdownMenuLabel className='flex flex-col items-start lg:hidden'>
          <span>{name}</span>
          <span className='text-muted-foreground'>{email}</span>
        </DropdownMenuLabel>
        <DropdownMenuLabel className='hidden lg:flex'>
          My account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href='/settings/profile'>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className='lg:hidden'>
          <Link href='/settings/suscriptions'>Suscriptions</Link>
        </DropdownMenuItem>
        <ThemeMenu />
        <DropdownMenuSeparator />
        <LogoutBtn />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
