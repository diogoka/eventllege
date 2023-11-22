import React from 'react';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext, LoginStatus } from '@/context/userContext';
import { getAuth, signOut } from 'firebase/auth';
import { Menu, MenuItem, Avatar, ListItemIcon, Divider } from '@mui/material';
import Logout from '@mui/icons-material/Logout';

type Props = {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
};

export default function Dropdown({ anchorEl, open, handleClose }: Props) {
  const { user, setUser, setLoginStatus } = useContext(UserContext);
  const router = useRouter();
  const clickHandler = () => {
    router.push('/user');
  };

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
    <Menu
      anchorEl={anchorEl}
      id='account-menu'
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem onClick={clickHandler}>
        <Avatar
          alt={user?.name}
          src={`http://localhost:3001/img/users/${
            user?.id
          }?${new Date().getTime()}`}
        />{' '}
        MY Profile
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize='small' />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
}
