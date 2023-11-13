import React from 'react'
import { Box, Avatar, Typography } from '@mui/material'
import { Attendee } from '@/app/events/[id]/page'

type Props = {
  attendee: Attendee;
}

export default function AttendeesItem({ attendee }: Props) {
  return (
    <Box display='flex' alignItems='center' columnGap='1rem'>
      <Avatar alt={attendee.name} src={`http://localhost:3001/img/users/${attendee.id}`} />
      <Typography fontSize='1.125rem'>{attendee.name}</Typography>
    </Box>
  )
}
