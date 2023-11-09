'use client';
import { Box, Button, Stack } from '@mui/material'
import { Event, Tag } from '@/app/events/page'
import EventItem from '@/components/events/eventItem';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';

type Props = {
  events: Event[];
  tags: Tag[];
  user: {
    id: string;
    role: string;
  };
};

function EventList({ events, tags, user }: Props) {
  const eventsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Stack spacing={2} sx={{alignItems: 'center', marginTop: '0', width: '100%'}}>
      {currentEvents.map((event, index) => {
        const eventTags = tags.filter((tag) => tag.id_event === event.id_event);
        return <EventItem event={event} key={index} tags={eventTags} user={user}/>;
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
