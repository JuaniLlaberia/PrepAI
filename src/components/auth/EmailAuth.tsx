'use client';

import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs';
import { useState } from 'react';
import { HiMiniArrowLongRight } from 'react-icons/hi2';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';

const EmailAuth = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  return (
    <div>
      <Label htmlFor='email'>Email</Label>
      <Input
        id='email'
        name='email'
        type='email'
        placeholder='Enter your email address'
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      {error && <p className='text-sm text-red-500 px-1'>{error}</p>}
      <RegisterLink
        className={cn(buttonVariants({}), 'w-full mt-2.5 group')}
        authUrlParams={{
          connection_id: process.env
            .NEXT_PUBLIC_KINDE_CONNECTION_EMAIL as string,
          login_hint: email,
        }}
        onClick={e => {
          if (
            !email ||
            !email.match(
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            )
          ) {
            setError('Missing email address');
            return e.preventDefault();
          }
          setError('');
        }}
      >
        Continue{' '}
        <HiMiniArrowLongRight className='size-5 ml-1.5 group-hover:translate-x-1 transition-transform' />
      </RegisterLink>
    </div>
  );
};

export default EmailAuth;
