'use client'
import { useState, useEffect } from 'react'
import axios from 'axios';

// For now, display info of the user whose ID is A
// Use ID of the logged-in user later

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

  const [events, setEvents] = useState<Array<Event>>();
  const [tags, setTags] = useState<Array<Tag>>();

  const SAMPLE_USER_ID = 'A';

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/events/organizer-events', {
        params: { id_organizer : SAMPLE_USER_ID }
      })
      .then((res) => {
        setEvents(res.data.events);
        setTags(res.data.tags);
      })
      .catch((error) => {
        console.error(error.response.data);
      })
  }, []);
  
  return (
    <>
    <h3>Organizer-Events</h3>

    {events?.map((val:Event, key:number)=>{

      return (
      <div key={key} style={{border:'1px solid grey',margin: '5px'}}>

        <div><b>id_event:</b>{val.id_event}</div>
        <div><b>id_owner:</b>{val.id_owner}</div>
        <div><b>name_event:</b>{val.name_event}</div>
        <div><b>description_event:</b>{val.description_event}</div>
        <div><b>date_event_start:</b>{val.date_event_start}</div>
        <div><b>date_event_end:</b>{val.date_event_end}</div>
        <div><b>location_event:</b>{val.location_event}</div>
        <div><b>capacity_event:</b>{val.capacity_event}</div>
        <div><b>price_event:</b>{val.price_event}</div>
        <div><b>category_event:</b>{val.category_event}</div>
        <div><b>image_event:</b>{val.image_event}</div>
        <div><b>tags:</b>
        
        {tags?.map((tag:Tag, key:number) => {
          return tag.id_event==val.id_event? <span key={key}>{tag.name_tag},&nbsp;</span> : null
          })}
        
        </div>

      </div>)
    })}
    
    </>
  )

}