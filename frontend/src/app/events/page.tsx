'use client';
import { useEffect,useState } from 'react'
import { Container, Stack, Typography, Box } from '@mui/material'
import axios from 'axios'
import ModalRating from '@/components/modal'
import EventList from '@/components/events/eventList'
import { UserContext, FirebaseAccount } from '@/context/userContext';
import { useContext } from 'react';
import SearchBar from '@/components/searchBar';


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

  return (
    <Box>
    <SearchBar />
    <EventList events={events} tags={tags}></EventList>
    
    </Box>
    
  )

}
