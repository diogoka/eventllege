'use client';
import { useState, useEffect, useContext } from 'react';
import { Stack } from '@mui/material';
import axios from 'axios';
import EventsControl from '@/components/events/newEvents/eventsControl';

type Params = {
  params: {
    id: number;
  };
};

type SelectedEvent = {
  id_event: number;
  id_owner: string;
  name_event: string;
  description_event: string;
  date_event_start: string;
  date_event_end: string;
  image_event: string;
  location_event: string;
  capacity_event: number;
  price_event: number;
  category_event: string;
};

type Tag = {
  id_tag: number;
  name_tag: string;
};

export default function EditEventPage({ params }: Params) {
  const [editEvent, setEditEvent] = useState<SelectedEvent>();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/events/${params.id}`)
      .then((res) => {
        setEditEvent(res.data.event);
        setSelectedTags(res.data.event.tags);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }, []);

  return (
    <Stack>
      <EventsControl editEvent={editEvent} selectedTags={selectedTags} />
    </Stack>
  );
}
