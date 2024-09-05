'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const SettingsLinks = () => {
  const pathname = usePathname();
  return (
    <nav
      className='grid gap-4 text-sm text-muted-foreground'
      x-chunk='dashboard-04-chunk-0'
    >
      <Link
        href='/settings/profile'
        className={cn(
          pathname === '/settings/profile' ? 'font-semibold text-primary' : null
        )}
      >
        General
      </Link>
      <Link
        href='/settings/suscriptions'
        className={cn(
          pathname === '/settings/suscriptions'
            ? 'font-semibold text-primary'
            : null
        )}
      >
        Suscriptions
      </Link>
      <Link
        href='/settings/advanced'
        className={cn(
          pathname === '/settings/advanced'
            ? 'font-semibold text-primary'
            : null
        )}
      >
        Advanced
      </Link>
    </nav>
  );
};

export default SettingsLinks;
