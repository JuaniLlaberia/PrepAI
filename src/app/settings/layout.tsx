import type { ReactNode } from 'react';

import PageHeader from '@/components/PageHeader';
import SettingsLinks from './(components)/SettingsLinks';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className='px-4 md:px-16 lg:px-20 2xl:px-48'>
        <PageHeader link='/dashboard/paths' />
        <div className='flex w-full flex-col'>
          <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
            <div className='mx-auto grid w-full max-w-6xl gap-2'>
              <h1 className='text-2xl font-semibold'>Settings</h1>
            </div>
            <div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
              <SettingsLinks />
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
