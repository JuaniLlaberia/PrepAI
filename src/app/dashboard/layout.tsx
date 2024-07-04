import { ReactNode } from 'react';

import UserMenu from './(components)/UserMenu';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <nav className='flex justify-between items-center w-full border-b border-border px-4 md:px-16 lg:px-32 xl:px-56 py-2 h-14'>
        <h1>MockAI</h1>
        <UserMenu />
      </nav>
      {children}
    </>
  );
};

export default DashboardLayout;
