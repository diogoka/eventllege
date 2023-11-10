'use client';
import { Box, Button, Stack } from '@mui/material'
import { Event, Tag } from '@/app/events/page'
import EventItem from '@/components/events/eventItem';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';

type Props = {
  events: Event[];
  tags: Tag[];
  setEvents: (events: Event[]) => void;
  user: {
    id: string | undefined;
    role: string | undefined;
  };
  attendance: [number, boolean][];
};

function EventList({ events, tags, user, setEvents, attendance}: Props) {

  const eventsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const deleteEvent = async (id: number) => {
    const newEvents = await events.filter((event) => event.id_event !== id);
    setEvents(newEvents)
  }
  const checkAttendance = (id: number) => {
    for (let i = 0; i < attendance.length; i++) {
      if (attendance[i][0] === id) {
        return true;
      }
    }
    return false;
  }

  return (
    <Stack spacing={2} sx={{alignItems: 'center', marginTop: '0', width: '100%'}}>
      {currentEvents.map((event, index) => {
        const eventTags = tags.filter((tag) => tag.id_event === event.id_event);
        const attending = checkAttendance(event.id_event);
        return <EventItem event={event} key={index} tags={eventTags} user={user} deleteEvent={deleteEvent} attending={attending}/>;
      })}
      <Pagination
        count={Math.ceil(events.length / eventsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        sx={{ display: 'flex', justifyContent: 'center' }}
      />
    </Stack>
  );
}

export default EventList;
