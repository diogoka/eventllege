import React from 'react';
import AvatarIcon from './avatar';
import Navigation from './navigation';
import { useContext } from 'react';
import { UserContext } from '@/context/userContext';
import { Stack } from '@mui/material';

export default function MenuList() {
  const { user } = useContext(UserContext);
  return (
    <>
      {user?.roleName === 'student' ? (
        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
          spacing={1}
          width='52%'
          maxWidth='20.1rem'
        >
          <Navigation />
          <AvatarIcon />
        </Stack>
      ) : (
        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
          spacing={1}
          width='52%'
          maxWidth='37rem'
        >
          <Navigation />
          <AvatarIcon />
        </Stack>
      )}
    </>
  );
}
