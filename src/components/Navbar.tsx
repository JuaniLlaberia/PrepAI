import Link from 'next/link';
import { HiMiniArrowLongRight } from 'react-icons/hi2';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

const Navbar = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isAuth = await isAuthenticated();

  return (
    <nav className='fixed top-0 left-0 flex items-center justify-between w-full h-16 bg-background border-b border-border px-4 md:px-16 lg:px-20 2xl:px-48 z-[1000]'>
      <span className='px-4 font-bold'>MockAI</span>
      <div className='flex items-center gap-3'>
        {!isAuth ? (
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
        )}
      </div>
    </nav>
  );
};

export default Navbar;
