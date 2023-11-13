import React from 'react'
import { Attendee } from '@/app/events/[id]/page'
import AttendeesItem from './attendees-item'
import { Stack } from '@mui/material'

type Props = {
  attendees: Attendee[];
}

export default function AttendeesList({ attendees }: Props) {
  return (
    <Stack rowGap='1rem' overflow='scroll'>
      {attendees.map((attendee: Attendee) => {
        return <AttendeesItem attendee={attendee} />
      })}
    </Stack>
  )
}
