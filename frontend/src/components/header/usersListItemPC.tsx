import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

const UsersBtns = [
  { label: 'Home', path: '/' },
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
            width: '100%',
            m: '0 auto',
          }}
        >
          {button.label}
        </Button>
      ))}
    </>
  );
}
