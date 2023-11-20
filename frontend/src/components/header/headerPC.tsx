import React from 'react';
import Logo from './logo';
import MenuList from './menuList';
import { Toolbar } from '@mui/material';

export default function HeaderPC() {
  return (
    <Toolbar
      disableGutters
      sx={{ justifyContent: 'space-between', width: '90%', margin: '0 auto' }}
    >
      <Logo />
      <MenuList />
    </Toolbar>
  );
}
