import React from 'react';
import AvatarIcon from './avatar';
import Navigation from './navigation';
import { Stack } from '@mui/material';

export default function MenuList() {
  return (
    <Stack
      direction='row'
      justifyContent='center'
      alignItems='center'
      spacing={1}
      width='52%'
    >
      <Navigation />
      <AvatarIcon />
    </Stack>
  );
}
