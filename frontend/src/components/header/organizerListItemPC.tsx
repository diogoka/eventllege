import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

const OrganizerBtns = [
  { label: 'Created Event', path: '/organizer-events' },
  { label: 'Create Event', path: '/events/new' },
];

export default function OrganizerListItemPC() {
  const router = useRouter();

  const clickHandler = (path: string) => {
    router.push(path);
  };
  return (
    <>
      {OrganizerBtns.map((button, index) => (
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
