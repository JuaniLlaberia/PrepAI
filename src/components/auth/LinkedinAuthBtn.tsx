'use client';

import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs';
import { FaLinkedin } from 'react-icons/fa6';

import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';

const LinkedinAuthBtn = ({ className }: { className?: string }) => {
  return (
    <RegisterLink
      className={cn(
        buttonVariants({ variant: 'secondary' }),
        className,
        'text-black'
      )}
      authUrlParams={{
        connection_id: process.env
          .NEXT_PUBLIC_KINDE_CONNECTION_LINKEDIN as string,
      }}
    >
      <FaLinkedin className='size-5 mr-2 text-[#0e76a8]' />
      Continue with Linkedin
    </RegisterLink>
  );
};

export default LinkedinAuthBtn;
