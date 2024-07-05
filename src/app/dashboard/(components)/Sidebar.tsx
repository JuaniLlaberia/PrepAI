'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavigationLinksType } from '../layout';
import { cn } from '@/lib/utils';

const SidebarLinks = ({ links }: { links: NavigationLinksType[] }) => {
  const pathname = usePathname();

  return (
    <ul className='flex flex-col gap-1'>
      {links.map(link => (
        <li>
          <Link
            href={link.link}
            key={link.id}
            className={cn(
              'flex items-center gap-2 py-1.5 px-3 rounded-lg font-medium cursor-pointer text-muted-foreground hover:bg-muted/70 transition-colors',
              pathname === link.link ? 'text-primary bg-muted/70' : null
            )}
          >
            {link.icon}
            <p className='text-sm'>{link.label}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarLinks;
