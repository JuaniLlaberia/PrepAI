import { ReactElement, ReactNode } from 'react';
import {
  HiOutlineArrowUpCircle,
  HiOutlineDocumentText,
  HiOutlineSquares2X2,
} from 'react-icons/hi2';

import UserMenu from './(components)/UserMenu';
import DashboardTabs from './(components)/NavbarTabs';
import SidebarLinks from './(components)/Sidebar';
import { Button } from '@/components/ui/button';

export type NavigationLinksType = {
  id: string;
  label: string;
  link: string;
  icon: ReactElement;
};

const navigationLinks: NavigationLinksType[] = [
  {
    id: 'interviews',
    label: 'Interviews',
    link: '/dashboard',
    icon: <HiOutlineSquares2X2 strokeWidth={2} className='size-[1.1rem]' />,
  },
  {
    id: 'mock-exams',
    label: 'Mock exams',
    link: '/dashboard/exams',
    icon: <HiOutlineDocumentText strokeWidth={2} className='size-[1.1rem]' />,
  },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <nav className='flex flex-col justify-between items-center w-full border-b border-border px-4 md:px-16 lg:px-32 xl:px-56 pt-2 lg:hidden'>
        <div className='flex items-center justify-between w-full'>
          <h1>MockAI</h1>
          <UserMenu />
        </div>
        <DashboardTabs links={navigationLinks} />
      </nav>
      <div className='lg:flex lg:flex-row'>
        <aside className='p-3 w-[300px] border-r border-border hidden lg:flex flex-col'>
          <div className='flex-1'>
            <h1 className='text-center mb-6'>MockAI</h1>
            <h2 className='px-1 mb-1 text-xs font-medium text-muted-foreground'>
              Features
            </h2>
            <SidebarLinks links={navigationLinks} />
          </div>
          <div className='flex flex-col gap-4'>
            <Button
              size='sm'
              variant='outline'
              className='h-7 text-muted-foreground'
            >
              <HiOutlineArrowUpCircle
                strokeWidth={1.5}
                className='size-[1.1rem] mr-2'
              />
              Upgrade your plan
            </Button>
            <UserMenu />
          </div>
        </aside>
        <section className='w-full pt-4 lg:pt-8 px-4 md:px-16 lg:px-20 2xl:px-56 bg-background-2 dark:bg-background min-h-[calc(100vh-6.5rem-1px)] lg:min-h-screen'>
          {children}
        </section>
      </div>
    </>
  );
};

export default DashboardLayout;
