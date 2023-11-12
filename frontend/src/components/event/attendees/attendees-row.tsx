'use client'
import React from 'react'
import { Attendee } from '@/app/events/[id]/page';
import { useTheme, Avatar, AvatarGroup, Box, Link, Typography, Modal } from '@mui/material';
import AttendeesModal from './attendees-modal';

const MAX_DISPLAY_AVATARS = 6;

type Props = {
  attendees: Attendee[];
}

export default function AttendeesRow({ attendees }: Props) {

  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Typography>{attendees.length}</Typography>
        <Link
          color={theme.palette.info.main}
          component='button'
          sx={{
            fontSize: '1rem',
          }}
          onClick={handleOpen}
        >
          See All
        </Link>
        <AttendeesModal
          attendees={attendees}
          open={open}
          handleClose={handleClose}
        />
      </Box>
      <AvatarGroup
        total={attendees.length}
        sx={{
          '.MuiAvatarGroup-avatar': {
            width: '2rem',
            height: '2rem'
          }
        }} >
        {attendees.map((attendee: Attendee, index: number) => {
          if (index < MAX_DISPLAY_AVATARS) {
            return (
              <Avatar
                alt={attendee.name}
                src={`http://localhost:3001/img/users/${attendee.id}`}
              />
            )
          }
        })}
      </AvatarGroup>
    </>
  )
}
