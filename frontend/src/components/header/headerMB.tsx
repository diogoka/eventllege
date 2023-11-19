import React from 'react';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/userContext';
import Logo from './logo';
import PageTitle from './pageTitle';
import { Stack, Button, Box } from '@mui/material';
import AvatarIcon from './avatar';
import LoginIcon from '@mui/icons-material/Login';

export default function HeaderMB() {
  const { user } = useContext(UserContext);

  const router = useRouter();
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ width: '90%', height: '50px', m: '0 auto' }}
    >
      <Logo />
      {user ? (
        <>
          <PageTitle />
          <AvatarIcon />
        </>
      ) : (
        <Button
          onClick={() => router.push('/login')}
          variant="contained"
          color="primary"
          startIcon={<LoginIcon />}
          sx={{ width: '6.25rem', borderRadius: '5px' }}
        >
          Log in
        </Button>
      )}
    </Stack>
  );
}
