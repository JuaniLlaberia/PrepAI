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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Filters = ({
  filter = 'all',
  sortBy = 'createdAt',
}: {
  filter: 'all' | 'taken' | 'new';
  sortBy: 'createdAt' | 'name';
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
          <Separator className='my-3' />
          <ul>
            <DrawerClose asChild aria-label='filter button'>
              <li
                onClick={() => setSeachParam('filter', 'all')}
                className='py-3 px-2 flex justify-between items-center hover:bg-accent rounded-md'
              >
                All interviews
                <HiOutlineCheck
                  className={cn(
                    'size-4',
                    filter === 'all' ? 'block' : 'hidden'
                  )}
                />
              </li>
            </DrawerClose>
            <DrawerClose asChild aria-label='filter button'>
              <li
                onClick={() => setSeachParam('filter', 'new')}
                className='py-3 px-2 flex justify-between items-center hover:bg-accent rounded-md'
              >
                New interviews
                <HiOutlineCheck
                  className={cn(
                    'size-4',
                    filter === 'new' ? 'block' : 'hidden'
                  )}
                />
              </li>
            </DrawerClose>
            <DrawerClose asChild aria-label='filter button'>
              <li
                onClick={() => setSeachParam('filter', 'taken')}
                className='py-3 px-2 flex justify-between items-center hover:bg-accent rounded-md'
              >
                Taken interviews
                <HiOutlineCheck
                  className={cn(
                    'size-4',
                    filter === 'taken' ? 'block' : 'hidden'
                  )}
                />
              </li>
            </DrawerClose>
          </ul>
        </DrawerContent>
      </Drawer>
      <Tabs
        className='hidden md:flex'
        onValueChange={val => {
          setSeachParam('filter', val);
        }}
        defaultValue={filter}
      >
        <TabsList>
          <TabsTrigger value='all'>All</TabsTrigger>
          <TabsTrigger value='new'>New</TabsTrigger>
          <TabsTrigger value='taken'>Taken</TabsTrigger>
        </TabsList>
      </Tabs>
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
    </>
  );
};

export default Filters;
