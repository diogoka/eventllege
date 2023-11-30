'use client';
import { useState, useEffect, useContext } from 'react';
import { EventContext } from '@/context/eventContext';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import axios from 'axios';
import EventsControl from '@/components/events/newEvents/eventsControl';

type Params = {
  params: {
    id: number;
  };
};

dayjs.extend(CustomParseFormat);

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
  tags: Array<Tag>;
};

type Tag = {
  id_tag: number;
  name_tag: string;
};

type ReplaceDates = {
  dateStart: dayjs.Dayjs;
  dateEnd: dayjs.Dayjs;
};

type EventData = {
  name_event: string;
  description_event: string;
  dates: ReplaceDates[];
  capacity_event: number;
  location_event: string;
  price_event: number;
  selectedTags: Tag[];
  category_event: string;
};

export default function EditEventPage({ params }: Params) {
  const [editEvent, setEditEvent] = useState<SelectedEvent>();
  const { createdEvent, dispatch } = useContext(EventContext);

  const [ eventId, setEventId ] = useState<number>();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/events/${params.id}`)
      .then((res) => {
        setEditEvent(res.data.event);
        setEventId(res.data.event.id_event)
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }, [params.id]);

  useEffect(() => {
    if (editEvent) {
      const convertedStartDay = dayjs(
        editEvent?.date_event_start,
        'YYYY-MM-DD HH:mm:ss'
      );
      const convertedEndDay = dayjs(
        editEvent?.date_event_end,
        'YYYY-MM-DD HH:mm:ss'
      );
      const replaceDates: ReplaceDates[] = [];
      replaceDates.push({
        dateStart: convertedStartDay,
        dateEnd: convertedEndDay,
      });
      const newObj: EventData = {
        name_event: editEvent?.name_event,
        description_event: editEvent?.description_event,
        dates: replaceDates,
        capacity_event: editEvent?.capacity_event,
        location_event: editEvent?.location_event,
        price_event: editEvent?.price_event,
        selectedTags: editEvent?.tags,
        category_event: editEvent?.category_event,
      };
      console.log('replaceDate', replaceDates);
      console.log('newObj', newObj);

      dispatch({
        type: 'GET_WHOLE_DATA',
        payload: newObj,
      });
    }
  }, [editEvent, dispatch]);
  return (
    <Stack>
      <EventsControl eventId={eventId!}/>
    </Stack>
  );
}
