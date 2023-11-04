'use client';
import { Box, Button, Stack, } from "@mui/material"
import { Event, Tag } from "@/app/events/page"
import EventItem from "@/components/events/eventItem";

type Props = {
  events: Event[];
  tags: Tag[];
};

function eventList({ events, tags }: Props) {

  return (

    <Stack spacing={2}>
      {
        events.map((event, index) => {
          const eventsTags = tags.filter((tag) => tag.id_event === event.id_event)
          return <EventItem event={event} key={index} tags={eventsTags}/>
        })
      }
    </Stack>
  )

}


export default eventList