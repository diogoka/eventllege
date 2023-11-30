'use client';
import { Stack } from '@mui/material';
import { Event, Tag } from '@/app/events/page';
import EventItem from '@/components/events/eventItem';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

type Props = {
  events: Event[];
  tags: Tag[];
  setEvents: (events: Event[]) => void;
  user: {
    id: string | undefined;
    role: string | undefined;
  };
  attendance: [number, boolean][];
  oldEvent?: boolean;
};

function EventList({
  events,
  tags,
  user,
  setEvents,
  attendance,
  oldEvent,
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const laptopQuery = useMediaQuery('(min-width:769px)');
  const eventsPerPage = laptopQuery ? 6 : 5;
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const deleteEvent = async (id: number) => {
    const newEvents = await events.filter((event) => event.id_event !== id);
    setEvents(newEvents);
  };
  const checkAttendance = (id: number) => {
    for (let i = 0; i < attendance.length; i++) {
      if (attendance[i][0] === id) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '0',
          width: '100%',
        }}
        direction={laptopQuery ? 'row' : 'column'}
        useFlexGap
        flexWrap='wrap'
      >
        {currentEvents.map((event, index) => {
          const eventTags = tags.filter(
            (tag) => tag.id_event === event.id_event
          );
          const attending = checkAttendance(event.id_event);
          return (
            <EventItem
              event={event}
              key={index}
              tags={eventTags}
              user={user}
              deleteEvent={deleteEvent}
              attending={attending}
              oldEvent={oldEvent}
            />
          );
        })}
      </Stack>
      {events.length > 6 && (
        <Pagination
          count={Math.ceil(events.length / eventsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant='outlined'
          shape='rounded'
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
        />
      )}
    </>
  );
}

export default EventList;
