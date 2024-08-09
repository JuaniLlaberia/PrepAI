import Link from 'next/link';
import { HiOutlineChevronLeft } from 'react-icons/hi2';
import { ReactNode } from 'react';

import Logo from './Logo';
import { Button, buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type PageHeaderType = {
  link: string;
  withConfirmation?: boolean;
  confirmationModal?: ReactNode;
};

const PageHeader = ({
  link,
  withConfirmation,
  confirmationModal,
}: PageHeaderType) => {
  return (
    <header className='flex items-center justify-between py-3'>
      {withConfirmation ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button className='group' size='sm' variant='ghost'>
              <HiOutlineChevronLeft className='size-4 mr-1.5 group-hover:-translate-x-1 transition-transform' />
              Go back
            </Button>
          </DialogTrigger>
          <DialogContent>{confirmationModal}</DialogContent>
        </Dialog>
      ) : (
        <Link
          href={link}
          className={cn(
            buttonVariants({ size: 'sm', variant: 'ghost' }),
            'group'
          )}
        >
          <HiOutlineChevronLeft className='size-4 mr-1.5 group-hover:-translate-x-1 transition-transform' />
          Go back
        </Link>
      )}
      <Logo />
    </header>
  );
};

export default PageHeader;
