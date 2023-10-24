"use client"
import { useState, useEffect } from "react"
import axios from "axios";

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
  type_event: string
}

export default function OrganizerEventsPage() {

  const [events, setEvents] = useState<Array<Event>>();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/organizer-events`)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((error) => {
        console.error(error.response.data);
      })
  }, []);
  
  return (
    <>
    <h3>Organizer-Events</h3>

    {events?.map((val:Event, key)=>{

      return (
      <div key={key} style={{border:"1px solid grey",margin: "5px"}}>

        <div><b>id_event:</b>{val.id_event}</div>
        <div><b>id_owner:</b>{val.id_owner}</div>
        <div><b>name_event:</b>{val.name_event}</div>
        <div><b>description_event:</b>{val.description_event}</div>
        <div><b>date_event_start:</b>{val.date_event_start}</div>
        <div><b>date_event_end:</b>{val.date_event_end}</div>
        <div><b>location_event:</b>{val.location_event}</div>
        <div><b>capacity_event:</b>{val.capacity_event}</div>
        <div><b>price_event:</b>{val.price_event}</div>
        <div><b>type_event:</b>{val.type_event}</div>
        <div><b>image_event:</b>{val.image_event}</div>

      </div>)
    })}
    
    </>
  )

}