'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { HiMiniArrowLongRight } from 'react-icons/hi2';

import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import { Skeleton } from './ui/skeleton';

const Navbar = () => {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);

  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  useMotionValueEvent(scrollY, 'change', y => {
    const difference = y - lastYRef.current;

    if (Math.abs(difference) > 50) {
      setIsHidden(difference > 0);

      lastYRef.current = y;
    }
  });

  return (
    <motion.div
      animate={isHidden ? 'hidden' : 'visible'}
      whileHover='visible'
      onFocusCapture={() => setIsHidden(true)}
      variants={{
        hidden: {
          y: '-90%',
        },
        visible: {
          y: '0%',
        },
      }}
      transition={{ duration: 0.2 }}
      className='fixed top-0 pt-3 px-2.5 z-10 flex w-full justify-center'
    >
      <nav className='flex items-center p-1 justify-between gap-3 rounded-full bg-secondary border border-border w-full max-w-[650px] shadow-sm'>
        <span className='px-5 font-bold tracking-tight text-foreground'>
          MockAI
        </span>
        <div className='flex items-center gap-4'>
          {isLoading ? (
            <Skeleton className='h-9 w-24 lg:w-32 rounded-full bg-gray-100 dark:bg-gray-400' />
          ) : !isAuthenticated ? (
            <>
              <Link
                href='/login'
                className='hidden md:flex'
              >
                Login
              </Link>
              <Link
                href='/signup'
                className={cn(
                  buttonVariants({}),
                  'rounded-full group bg-background-2 text-primary hover:bg-background'
                )}
              >
                Get started
                <HiMiniArrowLongRight className='size-4 ml-1.5 group-hover:translate-x-1 transition-transform' />
              </Link>
            </>
          ) : (
            <>
              <Link
                href='/dashboard'
                className={cn(
                  buttonVariants({}),
                  'rounded-full group bg-background-2 text-primary hover:bg-background'
                )}
              >
                My Interviews{' '}
                <HiMiniArrowLongRight className='size-4 ml-1.5 group-hover:translate-x-1 transition-transform' />
              </Link>
            </>
          )}
        </div>
      </nav>
    </motion.div>
  );
};

export default Navbar;
