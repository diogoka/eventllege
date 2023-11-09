import React from 'react';
import { useState, useContext } from 'react';
import { UserContext } from '@/context/userContext';
import { Box } from '@mui/system';
import { Avatar, IconButton, Drawer } from '@mui/material';

import Hamburger from './hamburger';

export default function AvatarIcon() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(UserContext);
  const toggleMenu = (isMenuOpen: boolean) => {
    setMenuOpen(isMenuOpen);
  };
  console.log(user?.name);

  return (
    <Box sx={{ bgcolor: 'red', position: 'relative', right: '0.8125rem' }}>
      <IconButton edge='start' onClick={() => toggleMenu(true)} sx={{ m: 0 }}>
        <Avatar alt={user?.name} src={`http://localhost:3001/img/users/${user?.id}`}></Avatar>
      </IconButton>
      <Drawer anchor='right' open={isMenuOpen} onClose={() => toggleMenu(false)}>
        <Hamburger toggleMenu={toggleMenu} />
      </Drawer>
    </Box>
  );
}
