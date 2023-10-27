"use client"
import { useState, useEffect } from "react"
import axios from "axios";

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

export default function EventPage() {

  const [events, setEvents] = useState<Array<Event>>();
  const [tags, setTags] = useState<Array<Tag>>();

  const EVENT_ID = typeof window !== "undefined"? window.location.pathname.split("/events/")[1] : null

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/events/${EVENT_ID}`)
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
      <div style={{ border: "1px solid grey", margin: "5px" }}>
        <h3>Event Detail:</h3>
        {events?.map((elm:Event, key:number) => {
          return (
            <div key={key}>
              <div><b>id_event: </b>{elm.id_event}</div>
              <div><b>id_owner: </b>{elm.id_owner}</div>
              <div><b>name_event: </b>{elm.name_event}</div>
              <div><b>description_event: </b>{elm.description_event}</div>
              <div><b>date_event_start: </b>{elm.date_event_start}</div>
              <div><b>date_event_end: </b>{elm.date_event_end}</div>
              <div><b>location_event: </b>{elm.location_event}</div>
              <div><b>capacity_event: </b>{elm.capacity_event}</div>
              <div><b>price_event: </b>{elm.price_event}</div>
              <div><b>category_event: </b>{elm.category_event}</div>
              <div><b>tags: </b>

                {tags?.map((tag:Tag, key:number) => {
                  return <span key={key}>{tag.name_tag},&nbsp;</span>
                })}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}