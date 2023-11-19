import React from 'react';
import { useRouter } from 'next/navigation';
import { useState, useContext } from 'react';
import { UserContext } from '@/context/userContext';
// import NavList from './navList';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';

const UsersBtns = [
  { label: 'Events', path: '/' },
  { label: 'My events', path: '/user/my-events' },
  { label: 'History', path: '/history' },
  // { label: 'My profile', path: '/user' },
];

const OrganizerBtns = [
  { label: 'Created Event', path: '/organizer-events' },
  { label: 'Create Event', path: '/events/new' },
];

export default function Navigation() {
  const [value, setValue] = useState(0);
  const router = useRouter();
  const { user } = useContext(UserContext);

  const clickHandler = (path: string) => {
    router.push(path);
  };

  return (
    <Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {UsersBtns.map((button, index) => (
          <BottomNavigationAction
            key={index}
            label={button.label}
            onClick={() => clickHandler(button.path)}
          />
        ))}
        {user?.roleName === 'organizer' ? (
          <div>
            {OrganizerBtns.map((button, index) => (
              <BottomNavigationAction
                key={index}
                label={button.label}
                onClick={() => clickHandler(button.path)}
              />
            ))}
          </div>
        ) : (
          <div></div>
        )}
        {/* <BottomNavigationAction
          label="My events"
          onClick={() => clickHandler('/user/my-events')}
        />
        <BottomNavigationAction label="History" /> */}
        {/* <BottomNavigationAction label="Created Event" />
        <BottomNavigationAction label="Create Event" /> */}
      </BottomNavigation>
    </Box>
  );
}
