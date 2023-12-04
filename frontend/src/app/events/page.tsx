'use client';
import { useEffect, useState, useContext } from 'react';
import { Box, Alert, Typography, AlertColor } from '@mui/material';
import axios from 'axios';
import EventList from '@/components/events/eventList';
import SearchBar from '@/components/searchBar';
import { UserContext } from '@/context/userContext';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from 'next/navigation';

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
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState<Array<Event>>([]);
  const [tags, setTags] = useState<Array<Tag>>([]);
  const [justCreated, setJustCreated] = useState<boolean>(false);
  const [justUpdated, setJustUpdated] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [eventsOfUser, setEventsOfUser] = useState<Array<[number, boolean]>>(
    []
  );

  const searchParams = useSearchParams();

  const [alert, setAlert] = useState<AlertState>({
    status: false,
    message: '',
    severity: 'info',
  });

  const currentUser: CurrentUser = {
    id: user?.id,
    role: user?.roleName,
  };

  const pathname = usePathname();
  const router = useRouter();

  const getEvents = async () => {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    await axios.get(`${url}/api/events`).then((res) => {
      setEvents(res.data.events);
      setTags(res.data.tags);
      // console.log(res.data.events);
    });
    const attendingEvents: [number, boolean][] = [];
    await axios.get(`${url}/api/events/user/${currentUser.id}`).then((res) => {
      res.data.events.map((event: Event) => {
        let attendingEvent: [number, boolean] = [event.id_event, true];
        attendingEvents.push(attendingEvent);
      });
    });
    setEventsOfUser(attendingEvents);
  };

  useEffect(() => {
    if (searchParams.get('isPublished')) {
      setJustCreated(true);
      setShowAlert(true);
    }
    if (searchParams.get('isUpdated')) {
      setJustUpdated(true);
      setShowAlert(true);
    }
    if (searchParams.get('deletedEvent')) {
      setAlert({
        status: true,
        message: 'Event was deleted successfully.',
        severity: 'success',
      });
      setTimeout(() => {
        setAlert({
          status: false,
          message: '',
          severity: 'info',
        });
      }, 4000);
    }

    router.replace('/events', { scroll: false });
    getEvents();
  }, [justCreated, justUpdated, searchParams]);

  const searchEvents = (text: string) => {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    axios.get(`${url}/api/events/search/?text=` + text).then((res) => {
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
      }}
    >
      {showAlert && (
        <Alert
          severity='info'
          variant='filled'
          onClose={() => setShowAlert(false)}
          sx={{ position: 'absolute', top: '50px', zIndex: 9999 }}
        >
          {justCreated
            ? 'Event was created successfully.'
            : 'Event was updated successfully.'}
        </Alert>
      )}

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
