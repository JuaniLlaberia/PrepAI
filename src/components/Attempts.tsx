'use client';

import { usePathname, useRouter } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { Label } from '@/components/ui/label';

const Attempts = ({
  attempts,
  crrAttempt,
}: {
  attempts: { _id: string }[];
  crrAttempt: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const createQueryString = useCreateQueryString();

  const setSeachParam = (name: string, value: string) => {
    router.push(pathname + '?' + createQueryString(name, value));
  };

  return (
    <>
      <Label className='sr-only'>Attempts</Label>
      <Select
        value={crrAttempt}
        onValueChange={val => setSeachParam('attemptId', val)}
      >
        <SelectTrigger className='max-w-[200px] m-1'>
          <SelectValue placeholder='Select attempt' />
        </SelectTrigger>
        <SelectContent>
          {attempts.map((attempt, i) => (
            <SelectItem key={attempt._id} value={attempt._id}>
              Attempt {i + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default Attempts;
