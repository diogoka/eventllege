import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { Attendee } from '@/app/events/[id]/page';

type Props = {
  attendee: Attendee;
};

export default function AttendeesItem({ attendee }: Props) {
  return (
    <Box
      display='flex'
      alignItems='center'
      columnGap='1rem'
      minWidth='240px'
      width='48%'
    >
      <Avatar
        alt={attendee.name}
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/img/users/${attendee.id}`}
      />
      <Typography fontSize='1.125rem'>{attendee.name}</Typography>
    </Box>
  );
}
