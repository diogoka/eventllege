'use client';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '@/context/userContext';
import axios from 'axios';
import EventList from '@/components/events/eventList';
import SearchBar from '@/components/searchBar';
import { Typography, Box } from '@mui/material';

type Event = {
  capacity_event: number;
  category_event: string;
  date_event_end: string;
  date_event_start: string;
  description_event: string;
  id_event: number;
  id_owner: string;
  image_event: string;
  location_event: string;
  name_event: string;
  price_event: number;
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

function UserEvents() {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState<Array<Event>>([]);
  const [tags, setTags] = useState<Array<Tag>>([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [eventsOfUser, setEventsOfUser] = useState<Array<[number, boolean]>>(
    []
  );
  const [hasEvents, setHasEvents] = useState<HasEvents>({} as HasEvents);

  const currentUser: CurrentUser = {
    id: user!.id,
    role: user!.roleName,
  };

  const getEvents = async () => {
    const attendingEvents: [number, boolean][] = [];
    await axios
      .get(`http://localhost:3001/api/events/user/${currentUser.id}`)
      .then((res) => {
        if (res.data.events.length === 0) {
          console.log('res.data.events', res.data.events.length);
          setHasEvents({
            eventFound: false,
            message: 'You have not attended any events yet',
          });
        } else {
          setHasEvents({
            eventFound: true,
            message: '',
          });
        }
        setEvents(res.data.events);
        setTags(res.data.tags);
        res.data.events.map((event: Event) => {
          let attendingEvent: [number, boolean] = [event.id_event, true];
          attendingEvents.push(attendingEvent);
        });
      });
    setEventsOfUser(attendingEvents);
  };

  useEffect(() => {
    getEvents();
  }, []);

  const searchEvents = (text: string) => {
    axios
      .get(
        `http://localhost:3001/api/events/user/${currentUser.id}/?search=${text}`
      )
      .then((res) => {
        if (res.data.events.length === 0) {
          setHasEvents({
            eventFound: false,
            message: 'No events found',
          });
        } else {
          setHasEvents({
            eventFound: true,
            message: '',
          });
        }
        setEvents(res.data.events);
        setTags(res.data.tags);
        if (res.data.events.length === 0) {
          setAlertOpen(true);
        }
      });
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
      {!hasEvents.eventFound ? (
        <Typography
          sx={{
            position: 'relative',
            top: '16.3125rem',
            color: 'white',
            backgroundColor: '#2b3467',
            padding: '1rem',
            borderRadius: '5px',
          }}
        >
          {hasEvents.message}
        </Typography>
      ) : (
        <EventList
          events={events}
          tags={tags}
          user={currentUser}
          setEvents={setEvents}
          attendance={eventsOfUser}
        ></EventList>
      )}
    </Box>
  );
}

export default UserEvents;
