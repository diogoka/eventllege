'use client';
import { useEffect, useState, useContext } from 'react';
import { Box, Alert, Typography, AlertColor } from '@mui/material';
import axios from 'axios';
import EventList from '@/components/events/eventList';
import SearchBar from '@/components/searchBar';
import { UserContext } from '@/context/userContext';
import { PageContext } from '@/context/pageContext';

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

interface AlertState {
  status: boolean;
  message: string;
  severity: AlertColor;
}

export default function EventsPage() {
  const { ready } = useContext(PageContext);
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState<Array<Event>>([]);
  const [tags, setTags] = useState<Array<Tag>>([]);
  const [eventsOfUser, setEventsOfUser] = useState<Array<[number, boolean]>>(
    []
  );

  const [alert, setAlert] = useState<AlertState>({
    status: false,
    message: '',
    severity: 'info',
  });

  const currentUser: CurrentUser = {
    id: user?.id,
    role: user?.roleName,
  };

  const getEvents = async () => {
    await axios.get('http://localhost:3001/api/events').then((res) => {
      setEvents(res.data.events);
      setTags(res.data.tags);
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
    ready();
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
          setAlert({
            status: true,
            message: 'No events found',
            severity: 'info',
          });
          setTimeout(() => {
            setAlert({
              status: false,
              message: '',
              severity: 'info',
            });
          }, 5000);
        } else {
          setEvents(res.data.events);
          setTags(res.data.tags);
          setAlert({
            status: true,
            message:
              res.data.events.length === 1
                ? `${res.data.events.length} event found`
                : `${res.data.events.length} events found`,
            severity: 'info',
          });
          setTimeout(() => {
            setAlert({
              status: false,
              message: '',
              severity: 'info',
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
        minHeight: '304px',
        position: 'relative',
      }}
    >
      {alert.status && (
        <Alert
          severity='info'
          variant='filled'
          onClose={() =>
            setAlert({ status: false, message: '', severity: 'info' })
          }
          sx={{ position: 'absolute', top: '10px', zIndex: 9999 }}
        >
          {alert.message}
        </Alert>
      )}
      <SearchBar searchEvents={searchEvents} />
      {events.length === 0 ? (
        <Typography
          sx={{
            position: 'absolute',
            top: '20rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            backgroundColor: '#141D4F',
            width: '50%',
            height: '5rem',
            padding: '1rem',
            borderRadius: '5px',
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
