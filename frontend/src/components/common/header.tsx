'use client';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/userContext';
import Logo from '../header/logo';
import { Stack, Button, Box } from '@mui/material';
import AvatarIcon from '../header/avatar';
import LoginIcon from '@mui/icons-material/Login';

export default function Header() {
  const { user } = useContext(UserContext);

  const router = useRouter();

  return (
    <Box component={'header'} sx={{ width: '375px' }}>
      <Stack direction='row' justifyContent='space-between' sx={{ width: '90%', height: '50px', m: '0 auto' }}>
        <Logo />
        {user ? (
          <AvatarIcon />
        ) : (
          <Button
            onClick={() => router.push('/login')}
            variant='contained'
            color='primary'
            startIcon={<LoginIcon />}
            sx={{ width: '6.25rem', borderRadius: '5px' }}
          >
            Log in
          </Button>
        )}
      </Stack>
    </Box>
  );
}
