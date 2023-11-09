'use client';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/userContext';
import Logo from '../header/logo';
import { Stack, Button } from '@mui/material';
import AvatarIcon from '../header/avatar';
import LoginIcon from '@mui/icons-material/Login';

export default function Header() {
  const { user } = useContext(UserContext);

  const router = useRouter();

  return (
    <>
      {user ? (
        <Stack
          direction='row'
          justifyContent='space-between'
          sx={{ width: '375px', height: '50px', m: '3.125rem auto 0' }}
        >
          <Logo />
          <AvatarIcon />
        </Stack>
      ) : (
        <Stack
          direction='row'
          justifyContent='space-between'
          sx={{ width: '90%', height: '3.125rem', m: '3.125rem auto 0' }}
        >
          <Logo />
          <Button
            onClick={() => router.push('/login')}
            variant='contained'
            color='primary'
            startIcon={<LoginIcon />}
            sx={{ width: '6.25rem', borderRadius: '5px' }}
          >
            Log in
          </Button>
        </Stack>
      )}
    </>
  );
}
