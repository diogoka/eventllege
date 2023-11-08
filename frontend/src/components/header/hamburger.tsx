import React from 'react';
import ListItem from './usersListItem';
import OrganizerListItem from './organizerListItem';
import { useContext } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { UserContext, LoginStatus } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import { Box, IconButton, List, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  toggleMenu: (isMenuOpen: boolean) => void;
};

export default function Hamburger({ toggleMenu }: Props) {
  const router = useRouter();
  const { user, setUser, setLoginStatus } = useContext(UserContext);

  const handleLogout = async () => {
    signOut(getAuth())
      .then(() => {
        setUser(null);
        setLoginStatus(LoginStatus.LoggedOut);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
        <ListItem />
        <OrganizerListItem />
      </List>
      <Button
        onClick={handleLogout}
        variant='outlined'
        sx={{
          display: 'block',
          width: '80%',
          height: '3.125rem',
          border: '1px solid black',
          m: '0 auto 1.25rem',
          borderRadius: '5px',
        }}
      >
        Log out
      </Button>
    </Box>
  );
}
