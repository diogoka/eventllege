'use client';
import { useEffect, useState, useContext } from 'react';
import { Box, Alert, Typography } from '@mui/material';
import axios from 'axios';
import EventList from '@/components/events/eventList';
import SearchBar from '@/components/searchBar';
import { UserContext } from '@/context/userContext';

export type Event = {
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

export type Tag = {
  id_event: number;
  name_tag: string;
};

type CurrentUser = {
  id: string | undefined;
  role: string | undefined;
};

export default function EventsPage() {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState<Array<Event>>([]);
  const [tags, setTags] = useState<Array<Tag>>([]);
  const [eventsOfUser, setEventsOfUser] = useState<Array<[number, boolean]>>(
    []
  );
  const [alertSearchBar, setAlertSearchBar] = useState({
    status: true,
    message: '',
  });

  const currentUser: CurrentUser = {
    id: user?.id,
    role: user?.roleName,
  };

  const getEvents = async () => {
    await axios.get('http://localhost:3001/api/events').then((res) => {
      setEvents(res.data.events);
      setTags(res.data.tags);
      console.log(res.data.events);
    });
    const attendingEvents: [number, boolean][] = [];
    await axios
      .get(`http://localhost:3001/api/events/user/${currentUser.id}`)
      .then((res) => {
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
      .get('http://localhost:3001/api/events/search/?text=' + text)
      .then((res) => {
        if (res.data.events.length === 0) {
          setEvents([]);
          setAlertSearchBar({
            status: true,
            message: 'No events found',
          });
          setTimeout(() => {
            setAlertSearchBar({
              status: false,
              message: '',
            });
          }, 5000);
        } else {
          setEvents(res.data.events);
          setTags(res.data.tags);
          setAlertSearchBar({
            status: true,
            message: `${res.data.events.length} events found`,
          });
          setTimeout(() => {
            setAlertSearchBar({
              status: false,
              message: '',
            });
          }, 5000);
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
      {alertSearchBar.status && (
        <Alert
          severity='info'
          variant='filled'
          onClose={() => setAlertSearchBar({ status: false, message: '' })}
          sx={{ position: 'absolute', top: '10px', zIndex: 9999 }}
        >
          {alertSearchBar.message}
        </Alert>
      )}
      <SearchBar searchEvents={searchEvents} />
      {events.length === 0 ? (
        <Typography
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#141D4F',
            color: 'white',
            width: '50%',
            height: '5rem',
            borderRadius: '5px',
            padding: '1rem',
          }}
        >
          No events found
        </Typography>
      ) : (
        <EventList
          events={events}
          setEvents={setEvents}
          tags={tags}
          user={currentUser}
          attendance={eventsOfUser}
        ></EventList>
      )}
    </Box>
  );
}
