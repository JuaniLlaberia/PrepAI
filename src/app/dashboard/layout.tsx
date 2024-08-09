import { ReactElement, ReactNode } from 'react';
import { HiOutlineDocumentText, HiOutlineSquares2X2 } from 'react-icons/hi2';
import { PiTreeStructureLight } from 'react-icons/pi';

import UserMenu from './(components)/UserMenu';
import DashboardTabs from './(components)/NavbarTabs';
import SidebarLinks from './(components)/Sidebar';
import Logo from '@/components/Logo';

export type NavigationLinksType = {
  id: string;
  label: string;
  link: string;
  icon: ReactElement;
};

const navigationLinks: NavigationLinksType[] = [
  {
    id: 'paths',
    label: 'Preparation paths',
    link: '/dashboard/paths',
    icon: <PiTreeStructureLight strokeWidth={2} className='size-[1.1rem]' />,
  },
  {
    id: 'interviews',
    label: 'Mock interviews',
    link: '/dashboard/interviews',
    icon: <HiOutlineSquares2X2 strokeWidth={1.5} className='size-[1.1rem]' />,
  },
  {
    id: 'mock-exams',
    label: 'Mock exams',
    link: '/dashboard/exams',
    icon: <HiOutlineDocumentText strokeWidth={1.5} className='size-[1.1rem]' />,
  },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <nav className='flex flex-col justify-between items-center w-full border-b border-border px-4 md:px-16 lg:px-32 xl:px-56 pt-2 lg:hidden'>
        <div className='flex items-center justify-between w-full py-1 pb-2'>
          <Logo />
          <UserMenu />
        </div>
        <DashboardTabs links={navigationLinks} />
      </nav>
      <div className='lg:flex lg:flex-row h-screen'>
        <aside className='p-3 w-[300px] border-r border-border hidden lg:flex flex-col h-screen'>
          <div className='flex-1'>
            <div className='flex items-center justify-center mb-12'>
              <Logo />
            </div>
            <h2 className='px-1 mb-1 text-xs font-medium text-muted-foreground'>
              Features
            </h2>
            <SidebarLinks links={navigationLinks} />
          </div>
          <div className='flex flex-col gap-4'>
            <UserMenu />
          </div>
        </aside>
        <section className='w-full pt-4 lg:pt-8 px-4 md:px-16 lg:px-20 2xl:px-48 bg-background-2 dark:bg-background h-full lg:overflow-y-auto'>
          {children}
        </section>
      </div>
    </>
  );
};

export default DashboardLayout;
