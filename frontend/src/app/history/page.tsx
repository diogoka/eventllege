'use client'
import { useEffect, useState, useContext } from 'react'
import { Box } from '@mui/material'
import axios from 'axios'
import EventList from '@/components/events/eventList'
import SearchBar from '@/components/searchBar';
import { UserContext } from '@/context/userContext';

type Event={
  capacity_event: number,
  category_event: string,
  date_event_end: string,
  date_event_start: string,
  description_event: string,
  id_event: number,
  id_owner: string,
  image_event: string,
  location_event: string,
  name_event: string,
  price_event: number
}

type Tag={
  id_event: number,
  name_tag: string
}

export default function PastEvent() {
  

  const [events, setEvents] = useState<Array<Event>>([]);
  const [tags, setTags] = useState<Array<Tag>>([]);
  
  useEffect(() => {
    
    axios.get('http://localhost:3001/api/events/?past=true')
    .then((res) => {
      setEvents(res.data.events)
      setTags(res.data.tags)
  })
  },[])

  const searchEvents = (text: string) => {
    console.log(text)
  }


  return (
    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <SearchBar searchEvents={searchEvents}/>
      <EventList events={events} tags={tags}></EventList>
    </Box>
  )
}