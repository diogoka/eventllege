'use client';
import { useEffect, useContext } from 'react';
import { EventContext } from '@/context/eventContext';
import dayjs from 'dayjs';
import EventsControl from '@/components/events/newEvents/eventsControl';

interface DateRange {
  dateStart: dayjs.Dayjs;
  dateEnd: dayjs.Dayjs;
}
const today = dayjs();

type Tag = {
  id_tag: number;
  name_tag: string;
};
type EventData = {
  name_event: string;
  description_event: string;
  dates: DateRange[];
  capacity_event: number;
  location_event: string;
  price_event: number;
  selectedTags: Array<Tag>;
  category_event: string;
};
export default function NewEventPage() {
  const { createdEvent, dispatch } = useContext(EventContext);
  const initialState: EventData = {
    name_event: '',
    description_event: '',
    dates: [{ dateStart: today, dateEnd: today }],
    capacity_event: 0,
    location_event: '',
    price_event: 0,
    selectedTags: [],
    category_event: '',
  };
  useEffect(() => {
    dispatch({ type: 'RESET', payload: initialState });
  }, []);
  return (
    <>
      <EventsControl eventId={-1}/>
    </>
  );
}
