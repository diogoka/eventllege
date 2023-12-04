'use client';
import { useEffect, useState, useContext } from 'react';
import { Box, Alert, Typography } from '@mui/material';
import axios from 'axios';
import EventList from '@/components/events/eventList';
import SearchBar from '@/components/searchBar';
import { PageContext } from "@/context/pageContext";
import { UserContext } from '@/context/userContext';

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

export default function PastEvent() {
  const { ready } = useContext(PageContext);
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState<Array<Event>>([]);
  const [tags, setTags] = useState<Array<Tag>>([]);
  const [eventsOfUser, setEventsOfUser] = useState<Array<[number, boolean]>>(
    []
  );
  const [alertSearchBar, setAlertSearchBar] = useState({
    status: false,
    message: '',
  });
  const oldEvent = true;

  const currentUser: CurrentUser = {
    id: user!.id,
    role: user!.roleName,
  };

  const getEvents = async () => {
    await axios
      .get('http://localhost:3001/api/events/?past=true')
      .then((res) => {
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
      .get(`http://localhost:3001/api/events/search/?text=${text}&past=true`)
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
          }, 3000);
        } else {
          setEvents(res.data.events);
          setTags(res.data.tags);
          setAlertSearchBar({
            status: true,
            message:
              res.data.events.length === 1
                ? `${res.data.events.length} event found`
                : `${res.data.events.length} events found`,
          });
          setTimeout(() => {
            setAlertSearchBar({
              status: false,
              message: '',
            });
          }, 3000);
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
          tags={tags}
          user={currentUser}
          setEvents={setEvents}
          attendance={eventsOfUser}
          oldEvent={oldEvent}
        ></EventList>
      )}
    </Box>
  );
}
