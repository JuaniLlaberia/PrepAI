'use client';

import { HiOutlineCheck } from 'react-icons/hi2';
import { usePathname, useRouter } from 'next/navigation';
import { BsSortDown } from 'react-icons/bs';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const PathSorts = ({
  sortBy = 'createdAt',
  filter = 'progress',
}: {
  sortBy: 'createdAt' | 'name';
  filter: 'progress' | 'completed';
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const createQueryString = useCreateQueryString();

  const setSeachParam = (name: string, value: string) => {
    router.push(pathname + '?' + createQueryString(name, value));
  };

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild className='md:hidden'>
          <Button variant='ghost' size='sm' className='px-3 md:hidden'>
            <BsSortDown className='size-4 mr-1.5' /> Filter & Sort
          </Button>
        </DrawerTrigger>
        <DrawerContent className='p-4 text-primary transition-colors'>
          <ul>
            <DrawerClose asChild aria-label='filter button'>
              <li
                onClick={() => setSeachParam('sortBy', 'createdAt')}
                className='py-3 px-2 flex justify-between items-center hover:bg-accent rounded-md'
              >
                Sort by creation
                <HiOutlineCheck
                  className={cn(
                    'size-4',
                    sortBy === 'createdAt' ? 'block' : 'hidden'
                  )}
                />
              </li>
            </DrawerClose>
            <DrawerClose asChild aria-label='filter button'>
              <li
                onClick={() => setSeachParam('sortBy', 'name')}
                className='py-3 px-2 flex justify-between items-center hover:bg-accent rounded-md'
              >
                Sort by name
                <HiOutlineCheck
                  className={cn(
                    'size-4',
                    sortBy === 'name' ? 'block' : 'hidden'
                  )}
                />
              </li>
            </DrawerClose>
          </ul>
          <Separator />
          <ul>
            <DrawerClose asChild aria-label='filter button'>
              <li
                onClick={() => setSeachParam('filter', 'progress')}
                className='py-3 px-2 flex justify-between items-center hover:bg-accent rounded-md'
              >
                In progress
                <HiOutlineCheck
                  className={cn(
                    'size-4',
                    filter === 'progress' ? 'block' : 'hidden'
                  )}
                />
              </li>
            </DrawerClose>
            <DrawerClose asChild aria-label='filter button'>
              <li
                onClick={() => setSeachParam('filter', 'completed')}
                className='py-3 px-2 flex justify-between items-center hover:bg-accent rounded-md'
              >
                Completed
                <HiOutlineCheck
                  className={cn(
                    'size-4',
                    filter === 'completed' ? 'block' : 'hidden'
                  )}
                />
              </li>
            </DrawerClose>
          </ul>
        </DrawerContent>
      </Drawer>
      <Select
        value={sortBy}
        onValueChange={val => {
          setSeachParam('sortBy', val);
        }}
      >
        <SelectTrigger className='w-[240px] bg-background hidden md:flex'>
          <SelectValue placeholder='Sort by' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='createdAt'>Sorty by creation</SelectItem>
          <SelectItem value='name'>Sorty by name</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={filter}
        onValueChange={val => {
          setSeachParam('filter', val);
        }}
      >
        <SelectTrigger className='w-[240px] bg-background hidden md:flex'>
          <SelectValue placeholder='Filter by' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='progress'>Show in progress</SelectItem>
          <SelectItem value='completed'>Show completed</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default PathSorts;
