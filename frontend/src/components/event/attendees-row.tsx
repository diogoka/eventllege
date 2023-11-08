import React from 'react'
import { Attendee } from '@/app/events/[id]/page';
import { Avatar, AvatarGroup } from '@mui/material';

const MAX_DISPLAY_AVATARS = 6;

type Props = {
  attendees: Attendee[];
}

export default function AttendeesRow({ attendees }: Props) {

  return (
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
  )
}
