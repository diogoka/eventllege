import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

const UsersBtns = [
  { label: 'Events', path: '/' },
  { label: 'My events', path: '/user/my-events' },
  { label: 'History', path: '/history' },
];

export default function UsersListItemPC() {
  const router = useRouter();
  const clickHandler = (path: string) => {
    router.push(path);
  };
  return (
    <>
      {UsersBtns.map((button, index) => (
        <Button
          key={index}
          onClick={() => clickHandler(button.path)}
          variant="text"
          color="primary"
          sx={{
            width: 'auto',
            margin: '0 .5rem',
          }}
        >
          {button.label}
        </Button>
      ))}
    </>
  );
}
