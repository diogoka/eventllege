'use client';
import { useEffect, useState, useContext } from 'react'
import { Box } from '@mui/material'
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

export default function EventsPage() {

  const { user } = useContext(UserContext);
  const [events, setEvents] = useState<Array<Event>>([]);
  const [tags, setTags] = useState<Array<Tag>>([]);
  
  
  useEffect(() => {
    axios.get('http://localhost:3001/api/events').then((res) => {
      setEvents(res.data.events);
      setTags(res.data.tags);
    });
  }, []);

  const searchEvents = (text: string) => {
    axios.get('http://localhost:3001/api/events/search/?text='+text).then((res) => {
      if(res.data.events.length == 0){
        alert('No events found');
      } else {
        setEvents(res.data.events);
        setTags(res.data.tags);
      }
      
    });
  }

  return (
    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <SearchBar searchEvents={searchEvents}/>
      <EventList events={events} tags={tags}></EventList>
    </Box>
    
  )

}
