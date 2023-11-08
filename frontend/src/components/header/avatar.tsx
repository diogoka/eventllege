import React from 'react';
import { useState } from 'react';
import { Box } from '@mui/system';
import { Avatar, IconButton, Drawer } from '@mui/material';

import Hamburger from './hamburger';

export default function AvatarIcon() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (isMenuOpen: boolean) => {
    setMenuOpen(isMenuOpen);
  };

  return (
    <Box sx={{ bgcolor: 'red', position: 'relative', right: '0.8125rem' }}>
      <IconButton edge='start' onClick={() => toggleMenu(true)} sx={{ m: 0 }}>
        <Avatar>H</Avatar>
      </IconButton>
      <Drawer anchor='right' open={isMenuOpen} onClose={() => toggleMenu(false)}>
        <Hamburger toggleMenu={toggleMenu} />
      </Drawer>
    </Box>
  );
}
