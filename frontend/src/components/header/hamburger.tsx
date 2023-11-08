import React from 'react';
import UsersListItem from './usersListItem';
import LogoutBtn from './logoutBtn';
import OrganizerListItem from './organizerListItem';
import { Box, IconButton, List, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  toggleMenu: (isMenuOpen: boolean) => void;
};

export default function Hamburger({ toggleMenu }: Props) {
  return (
    <Box sx={{ width: '375px', position: 'relative' }}>
      <IconButton
        onClick={() => toggleMenu(false)}
        sx={{ position: 'absolute', top: '0.375rem', right: '1.3125rem', bgcolor: 'red' }}
      >
        <CloseIcon />
      </IconButton>
      <List
        sx={{
          width: '80%',
          m: '3.125rem auto',
          bgcolor: 'green',
        }}
      >
        <UsersListItem />
        <OrganizerListItem />
        <LogoutBtn />
      </List>
    </Box>
  );
}
