import Link from 'next/link';
import { HiMiniArrowLongLeft } from 'react-icons/hi2';
import { ReactNode } from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type PageHeaderType = {
  link?: string;
  text?: string;
  withConfirmation?: boolean;
  confirmationModal?: ReactNode;
};

const PageHeader = ({
  link = '/',
  text = 'Go back',
  withConfirmation,
  confirmationModal,
}: PageHeaderType) => {
  return (
    <header className='flex items-center justify-between py-3'>
      {withConfirmation ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button className='group' size='sm' variant='ghost'>
              <HiMiniArrowLongLeft className='size-4 mr-1.5 group-hover:-translate-x-1 transition-transform' />
              {text}
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
          <HiMiniArrowLongLeft className='size-4 mr-1.5 group-hover:-translate-x-1 transition-transform' />
          {text}
        </Link>
      )}
      <h2>MockAI</h2>
    </header>
  );
};

export default PageHeader;
