'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import DetailInfo from '@/components/event/detail-info';
import { Box, Stack, Typography } from '@mui/material';
import DetailContainer from '@/components/event/detail-container';

export type Attendee = {
  id: string;
  name: string;
}

export type Event = {
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
  attendees: Array<Attendee>;
};

export default function EventPage() {
  const [event, setEvent] = useState<Event>();
  const params = useParams();
  const router = useRouter();

  const EVENT_ID = params.id

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

  const deleteEvent = (id: number) => {
    console.log('delete', id);

    axios
      .delete(`http://localhost:3001/api/events/${id}`, {
        data: {
          id,
        },
      })
      .then((res: any) => {
        console.log('res', res.data.json);
      });
    router.push('/events');
  };

  const editEventHandler = (id: number) => {
    if (!id) {
      console.log('Id does not exist');
    } else {
      router.push(`/events/${id}/edit`);
    }
  };
  return (

    <Stack>
      
      <DetailContainer event={event}/>

      {event &&
        <DetailInfo
          price={event.price_event}
          maxSpots={event.capacity_event}
          attendees={event.attendees}
          tags={event.tags}
          category={event.category_event}
        />
      }

      <div>
        {event?.id_event ? (
          <button onClick={() => editEventHandler(event.id_event)}>Edit</button>
        ) : (
          <div>Id is not found</div>
        )}
      </div>
      <div>
        {event?.id_event ? (
          <button onClick={() => deleteEvent(event.id_event)}>Delete Event</button>
        ) : (
          <div>Id is not found</div>
        )}
      </div>

    </Stack>
  );
}
