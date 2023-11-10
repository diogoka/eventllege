import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

export default function Logo() {
  const router = useRouter();
  return (
    <Button onClick={() => router.push('/')} sx={{ width: '3.125rem', height: '3.125rem' }}>
      <img src={'/eventllege_Icon.svg'} alt='eventllege logo' style={{ width: '3.125rem', height: '3.125rem' }} />
    </Button>
  );
}
