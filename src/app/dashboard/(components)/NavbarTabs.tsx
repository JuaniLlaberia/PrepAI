'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { NavigationLinksType } from '../layout';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const DashboardTabs = ({ links }: { links: NavigationLinksType[] }) => {
  const pathname = usePathname();

  return (
    <div className='overflow-hidden w-full'>
      <ScrollArea>
        <ul
          className='flex items-center flex-row w-full -mb-px text-sm font-medium text-center'
          role='tablist'
        >
          {links.map(link => (
            <li key={link.id} className='me-2' role='presentation'>
              <Link
                href={link.link}
                className={cn(
                  'inline-block text-nowrap px-4 py-2 rounded-t-lg hover:text-muted-foreground transition-colors',
                  pathname === link.link ? 'border-b-2 border-primary' : null
                )}
                id='interview-tab'
                role='tab'
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  );
};

export default DashboardTabs;
