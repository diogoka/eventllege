"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Event = {
  id_event: number;
  id_owner: string;
  name_event: string;
  description_event: string;
  date_event_start: string;
  date_event_end: string;
  location_event: string;
  capacity_event: number;
  price_event: number;
  image_event: string;
  category_event: string;
  tags: Array<string>;
  attendees: Array<string>;
};

export default function EventPage() {
  const [event, setEvent] = useState<Event>();
  const router = useRouter();

  const EVENT_ID = typeof window !== "undefined" ? window.location.pathname.split("/events/")[1] : null;

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/events/${EVENT_ID}`)
      .then((res) => {
        setEvent(res.data.event);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }, []);

  const editEventHandler = (id: number) => {
    if (!id) {
      console.log("Id does not exist");
    } else {
      router.push(`/events/${id}/edit`);
    }
  };
  return (
    <>
      <div style={{ border: "1px solid grey", margin: "5px" }}>
        <h3>Event Detail:</h3>
        <div>
          <b>ID: </b>
          {event?.id_event}
        </div>
        <div>
          <b>Owner: </b>
          {event?.id_owner}
        </div>
        <div>
          <b>Name: </b>
          {event?.name_event}
        </div>
        <div>
          <b>Description: </b>
          {event?.description_event}
        </div>
        <div>
          <b>Start: </b>
          {event?.date_event_start}
        </div>
        <div>
          <b>End: </b>
          {event?.date_event_end}
        </div>
        <div>
          <b>Location: </b>
          {event?.location_event}
        </div>
        <div>
          <b>Capacity: </b>
          {event?.capacity_event}
        </div>
        <div>
          <b>Price: </b>
          {event?.price_event}
        </div>
        <div>
          <b>Category: </b>
          {event?.category_event}
        </div>

        <div>
          <b>Tags: </b>
          {event?.tags.map((tag: string, key: number) => {
            return <span key={key}>{tag}, </span>;
          })}
        </div>

        <div>
          <b>Attendees: </b>
          {event?.attendees.map((att: string, key: number) => {
            return <span key={key}>{att}, </span>;
          })}
        </div>
        {event?.id_event ? (
          <button onClick={() => editEventHandler(event.id_event)}>Edit</button>
        ) : (
          <div>Id is not found</div>
        )}
      </div>
    </>
  );
}
