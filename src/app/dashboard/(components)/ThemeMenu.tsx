'use client';

import { useTheme } from 'next-themes';
import { PiPalette } from 'react-icons/pi';

import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const ThemeMenu = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <PiPalette className='size-4 mr-1.5' />
        Theme
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className='flex flex-col gap-1'>
        <DropdownMenuItem
          className={cn(theme === 'light' ? 'bg-accent' : '')}
          onClick={() => setTheme('light')}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(theme === 'dark' ? 'bg-accent' : '')}
          onClick={() => setTheme('dark')}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(theme === 'system' ? 'bg-accent' : '')}
          onClick={() => setTheme('system')}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};

export default ThemeMenu;
