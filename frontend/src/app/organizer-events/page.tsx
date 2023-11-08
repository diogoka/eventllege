'use client';
import { useEffect, useState, useContext } from 'react'
import { Box } from '@mui/material'
import Alert from '@mui/material/Alert';
import axios from 'axios'
import EventList from '@/components/events/eventList'
import SearchBar from '@/components/searchBar';
import { UserContext } from '@/context/userContext';


type Event = {
  id_event: number,
  id_owner: string,
  name_event: string,
  description_event: string,
  date_event_start: string,
  date_event_end: string,
  location_event: string,
  capacity_event: number,
  price_event: number,
  image_event: string,
  category_event: string
}

type Tag = {
  id_event: number,
  name_tag: string
}

export default function OrganizerEventsPage() {


  const { user } = useContext(UserContext);
  const [events, setEvents] = useState<Array<Event>>([]);
  const [tags, setTags] = useState<Array<Tag>>([]);
  const [alertOpen, setAlertOpen] = useState(false);

  const userId = user!.id;

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/events/owner/${userId}`)
      .then((res) => {
        console.log('id', userId)
        console.log("owner", res.data);
        setEvents(res.data.events);
        setTags(res.data.tags);
      })
      .catch((error) => {
        console.error(error.response.data);
      })
  }, []);

      const searchEvents = (text: string) => {
        console.log(text);
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
      <EventList events={events} tags={tags}></EventList>
    </Box>
  )

}