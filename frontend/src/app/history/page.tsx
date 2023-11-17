'use client';
import { useEffect, useState, useContext } from 'react';
import { Box } from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import EventList from '@/components/events/eventList';
import SearchBar from '@/components/searchBar';
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
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState<Array<Event>>([]);
  const [tags, setTags] = useState<Array<Tag>>([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [eventsOfUser, setEventsOfUser] = useState<Array<[number, boolean]>>(
    []
  );

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
          setAlertOpen(true);
          setTimeout(() => {
            setAlertOpen(false);
          }, 3000);
        } else {
          setEvents(res.data.events);
          setTags(res.data.tags);
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
      {alertOpen && (
        <Alert
          severity="info"
          variant="filled"
          onClose={() => setAlertOpen(false)}
          sx={{ position: 'absolute', top: '10px', zIndex: 9999 }}
        >
          No events found
        </Alert>
      )}
      <SearchBar searchEvents={searchEvents} />
      <EventList
        events={events}
        tags={tags}
        user={currentUser}
        setEvents={setEvents}
        attendance={eventsOfUser}
        oldEvent={oldEvent}
      ></EventList>
    </Box>
  );
}
