'use client';

import Link from 'next/link';
import { HiMiniArrowLongRight } from 'react-icons/hi2';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

import Logo from '../Logo';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

const Navbar = () => {
  const { isAuthenticated: isAuth, isLoading } = useKindeBrowserClient();

  return (
    <nav className='fixed top-0 left-0 flex items-center justify-between w-full h-16 bg-background border-b border-border px-4 md:px-20 lg:px:40 2xl:px-80 z-[1000]'>
      <Logo />
      <div className='flex items-center gap-3'>
        {!isLoading ? (
          !isAuth ? (
            <>
              <Link
                href='/login'
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'hidden md:flex'
                )}
              >
                Login
              </Link>
              <Link
                href='/signup'
                className={cn(
                  buttonVariants({ variant: 'call-to-action' }),
                  'group'
                )}
              >
                Get started
                <HiMiniArrowLongRight className='size-4 ml-1.5 group-hover:translate-x-1 transition-transform' />
              </Link>
            </>
          ) : (
            <>
              <Link
                href='/dashboard/paths'
                className={cn(
                  buttonVariants({ variant: 'call-to-action' }),
                  'group'
                )}
              >
                My dashboard{' '}
                <HiMiniArrowLongRight className='size-4 ml-1.5 group-hover:translate-x-1 transition-transform' />
              </Link>
            </>
          )
        ) : (
          <Skeleton className='h-9 w-32 bg-gray-200 rounded-xl' />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
