'use client';
import { useEffect, useState, useContext } from 'react';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import axios from 'axios';
import EventList from '@/components/events/eventList';
import SearchBar from '@/components/searchBar';
import { UserContext } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import SwitchButtonOrganizer from '@/components/events/switchButtonOrganizer';

type Event = {
  id_event: number;
  id_owner: string;
  name_event: string;
  description_event: string;
  date_event_start: string;
  date_event_end: string;
  location_event: string;
  capacity_event: number;
  price_event: number;
  image_event: string;
  category_event: string;
};

type Tag = {
  id_event: number;
  name_tag: string;
};

type CurrentUser = {
  id: string;
  role: string;
};

interface HasEvents {
  eventFound: boolean;
  message: string;
}

export default function OrganizerEventsPage() {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState<Array<Event>>([]);
  const [tags, setTags] = useState<Array<Tag>>([]);
  const [eventsOfUser, setEventsOfUser] = useState<Array<[number, boolean]>>(
    []
  );
  const [hasEvents, setHasEvents] = useState<HasEvents>({} as HasEvents);
  const router = useRouter();
  const [switchButtonState, setSwitchButtonState] = useState<boolean>(false);

  const currentUser: CurrentUser = {
    id: user!.id,
    role: user!.roleName,
  };
  const laptopQuery = useMediaQuery('(min-width:769px)');

  useEffect(() => {
    console.log('switchButtonState', switchButtonState);
    let url = switchButtonState
      ? `http://localhost:3001/api/events/owner/${currentUser.id}?past=true`
      : `http://localhost:3001/api/events/owner/${currentUser.id}`;
    console.log('url', url);
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        if (res.data.events.length === 0) {
          setHasEvents({
            eventFound: false,
            message: 'You have not created events yet',
          });
        } else {
          setHasEvents({ eventFound: true, message: '' });
        }
        setEvents(res.data.events);
        setTags(res.data.tags);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
    const attendingEvents: [number, boolean][] = [];
    axios
      .get(`http://localhost:3001/api/events/user/${currentUser.id}`)
      .then((res) => {
        res.data.events.map((event: Event) => {
          let attendingEvent: [number, boolean] = [event.id_event, true];
          attendingEvents.push(attendingEvent);
        });
      });
    setEventsOfUser(attendingEvents);
  }, [switchButtonState]);

  const searchEvents = (text: string) => {
    console.log(text);
  };

  const handleCreateEvent = () => {
    router.push('/events/new');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <SearchBar searchEvents={searchEvents} />
      {laptopQuery && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '98%',
          }}
        >
          <SwitchButtonOrganizer setSwitchButtonState={setSwitchButtonState} />
          <Button
            type='submit'
            variant='outlined'
            onClick={handleCreateEvent}
            sx={{
              marginBottom: '1rem',
              color: 'rgba(56, 116, 203, 1)',
              paddingLeft: '1rem',
              paddingRight: '1rem',
              '&:hover': {
                backgroundColor: 'rgba(20,29,79)',
                color: 'white',
              },
            }}
          >
            Create an event
          </Button>
        </Box>
      )}
      {hasEvents.eventFound ? (
        <EventList
          events={events}
          tags={tags}
          user={currentUser}
          setEvents={setEvents}
          attendance={eventsOfUser}
        ></EventList>
      ) : (
        <Typography sx={{ position: 'relative', top: '16.3125rem' }}>
          {hasEvents.message}
        </Typography>
      )}
    </Box>
  );
}
