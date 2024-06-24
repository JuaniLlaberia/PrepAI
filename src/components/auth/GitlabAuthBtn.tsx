'use client';

import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs';
import { FaGitlab } from 'react-icons/fa6';

import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';

const GitlabAuthBtn = ({ className }: { className?: string }) => {
  return (
    <RegisterLink
      className={cn(
        buttonVariants({}),
        'bg-white text-black border border-border hover:bg-[#f3f3f3] dark:bg-background-2 dark:text-primary dark:hover:bg-[#2b2b2b59] font-medium w-full',
        className
      )}
      authUrlParams={{
        connection_id: process.env
          .NEXT_PUBLIC_KINDE_CONNECTION_GITLAB as string,
      }}
    >
      <FaGitlab className='size-5 mr-2' />
      Continue with Gitlab
    </RegisterLink>
  );
};

export default GitlabAuthBtn;
