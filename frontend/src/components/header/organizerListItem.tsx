import React from 'react';
import { useRouter } from 'next/navigation';
import { ListItemButton, ListItemText } from '@mui/material';

export default function OrganizerListItem() {
  const router = useRouter();
  return (
    <div>
      <ListItemButton
        onClick={() => router.push('/organizer-events')}
        sx={{
          width: '80%',
          height: '3.125rem',
          border: '1px solid black',
          margin: '0 auto 1.25rem',
          borderRadius: '5px',
        }}
      >
        <ListItemText
          primary='Created Event'
          primaryTypographyProps={{
            variant: 'body1',
            fontSize: '1.125rem',
          }}
          sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
        />
      </ListItemButton>
      <ListItemButton
        onClick={() => router.push('/events/new')}
        sx={{
          width: '80%',
          height: '3.125rem',
          border: '1px solid black',
          margin: '0 auto 1.25rem',
          borderRadius: '5px',
        }}
      >
        <ListItemText
          primary='Create Event'
          primaryTypographyProps={{
            variant: 'body1',
            fontSize: '1.125rem',
          }}
          sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
        />
      </ListItemButton>
    </div>
  );
}
