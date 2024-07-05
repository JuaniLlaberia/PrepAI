'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DashboardTabs = () => {
  const pathname = usePathname();

  return (
    <div className=' overflow-hidden w-full'>
      <ul
        className='flex items-center flex-row gap-3 overflow-x-auto w-full -mb-px text-sm font-medium text-center'
        role='tablist'
      >
        <li className='me-2' role='presentation'>
          <Link
            href='/dashboard'
            className={cn(
              'inline-block p-4 rounded-t-lg hover:text-muted-foreground transition-colors',
              pathname === '/dashboard' ? 'border-b-2 border-primary' : null
            )}
            id='interview-tab'
            role='tab'
          >
            Interviews
          </Link>
        </li>
        <li className='me-2' role='presentation'>
          <Link
            href='/dashboard/exams'
            className={cn(
              'inline-block p-4 rounded-t-lg hover:text-muted-foreground transition-colors',
              pathname === '/dashboard/exams'
                ? 'border-b-2 border-primary'
                : null
            )}
            id='exams-tab'
            role='tab'
          >
            Mock Exams
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardTabs;
