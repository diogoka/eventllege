'use client';
import { useEffect, useState, useContext, use } from 'react'
import { Box } from '@mui/material'
import Alert from '@mui/material/Alert';
import axios from 'axios'
import EventList from '@/components/events/eventList'
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
}


export default function EventsPage() {

  const { user } = useContext(UserContext);
  const [events, setEvents] = useState<Array<Event>>([]);
  const [tags, setTags] = useState<Array<Tag>>([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [eventsOfUser, setEventsOfUser] = useState<Array<[number, boolean]>>([]);

  const currentUser: CurrentUser = {
    id: user?.id,
    role: user?.roleName,
  }


  const getEvents = async () => {
    await axios.get('http://localhost:3001/api/events').then((res) => {
      setEvents(res.data.events);
      setTags(res.data.tags);
    });
    const attendingEvents : [number, boolean][] = [];
    await axios.get(`http://localhost:3001/api/events/user/${currentUser.id}`).then((res) => {
      res.data.events.map((event: Event) => {
        let attendingEvent: [number, boolean] = [event.id_event, true];
        attendingEvents.push(attendingEvent);
      })
      
      
    });
    setEventsOfUser(attendingEvents);
  }

  useEffect(() => {
    getEvents();
  }, []);


  const searchEvents = (text: string) => {
    axios.get('http://localhost:3001/api/events/search/?text=' + text).then((res) => {
      if (res.data.events.length === 0) {
        setAlertOpen(true);
        setTimeout(() => {
          setAlertOpen(false);
        }
          , 3000);
      } else {
        setEvents(res.data.events);
        setTags(res.data.tags);
      }

    });
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
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
      <EventList events={events} setEvents={setEvents} tags={tags} user={currentUser} attendance={eventsOfUser}></EventList>
    </Box>

  )

}
