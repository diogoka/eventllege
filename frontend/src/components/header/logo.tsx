import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import Switcher from '../common/switcher';

export default function Logo() {
  const router = useRouter();
  return (
    <Switcher
      sp={
        <Button
          onClick={() => router.push('/')}
          sx={{ width: '3.125rem', height: '3.125rem' }}
        >
          <img
            src={'/eventllege_Icon.svg'}
            alt="eventllege logo"
            style={{ width: '2.5rem', height: '2.5rem' }}
          />
        </Button>
      }
      pc={
        <Button
          onClick={() => router.push('/')}
          sx={{ width: '9.5rem', height: '1.875rem' }}
        >
          <img
            src={'/eventllege_logoIcon.svg'}
            alt="eventllege logo"
            style={{ width: '100%', height: '100%' }}
          />
        </Button>
      }
    />
  );
}
