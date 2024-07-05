import { ReactNode } from 'react';

import UserMenu from './(components)/UserMenu';
import DashboardTabs from './(components)/Tabs';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <nav className='flex flex-col justify-between items-center w-full border-b border-border px-4 md:px-16 lg:px-32 xl:px-56 pt-2 lg:hidden'>
        <div className='flex items-center justify-between w-full'>
          <h1>MockAI</h1>
          <UserMenu />
        </div>
        <DashboardTabs />
      </nav>
      <div className='lg:flex lg:flex-row'>
        <section className='w-full pt-4 px-4 md:px-16 lg:px-32 xl:px-56 bg-background-2 dark:bg-background min-h-[calc(100vh-6.5rem-1px)] lg:min-h-screen'>
          {children}
        </section>
      </div>
    </>
  );
};

export default DashboardLayout;
