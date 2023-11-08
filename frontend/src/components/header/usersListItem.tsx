import React from 'react';
import { useRouter } from 'next/navigation';
import { ListItemButton, ListItemText } from '@mui/material';

export default function ListItem() {
  const router = useRouter();
  return (
    <div>
      <ListItemButton
        onClick={() => router.push('/')}
        sx={{
          height: '3.125rem',
          border: '1px solid black',
          margin: '0 auto 1.25rem',
          borderRadius: '5px',
        }}
      >
        <ListItemText
          primary='Home'
          primaryTypographyProps={{
            variant: 'body1',
            fontSize: '1.125rem',
          }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        />
      </ListItemButton>
      <ListItemButton
        onClick={() => router.push('/events/user')}
        sx={{
          width: '80%',
          height: '3.125rem',
          border: '1px solid black',
          margin: '0 auto 1.25rem',
          borderRadius: '5px',
        }}
      >
        <ListItemText
          primary='Ticket'
          primaryTypographyProps={{
            variant: 'body1',
            fontSize: '1.125rem',
          }}
          sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
        />
      </ListItemButton>
      <ListItemButton
        onClick={() => router.push('/events/past')}
        sx={{
          width: '80%',
          height: '3.125rem',
          border: '1px solid black',
          margin: '0 auto 1.25rem',
          borderRadius: '5px',
        }}
      >
        <ListItemText
          primary='History'
          primaryTypographyProps={{
            variant: 'body1',
            fontSize: '1.125rem',
          }}
          sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
        />
      </ListItemButton>
      <ListItemButton
        onClick={() => router.push('/users/:id')}
        sx={{
          width: '80%',
          height: '3.125rem',
          border: '1px solid black',
          margin: '0 auto 1.25rem',
          borderRadius: '5px',
        }}
      >
        <ListItemText
          primary='My profile'
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
