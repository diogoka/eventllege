import React from 'react'
import { Attendee } from '@/app/events/[id]/page'
import AttendeesItem from './attendees-item'
import { Box } from '@mui/material'

type Props = {
  attendees: Attendee[];
}

export default function AttendeesList({ attendees }: Props) {
  return (
    <Box
      display='flex'
      rowGap='1rem'
      overflow='scroll'
      flexWrap='wrap'
      justifyContent='space-between'
    >
      {attendees.map((attendee: Attendee, index: number) => {
        return <AttendeesItem key={index} attendee={attendee} />
      })}
    </Box>
  )
}
