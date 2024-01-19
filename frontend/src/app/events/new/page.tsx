'use client';
import { useEffect, useContext } from 'react';
import { EventContext, initialState } from '@/context/eventContext';
import EventsControl from '@/components/events/newEvents/eventsControl';

export default function NewEventPage() {
  const { createdEvent, dispatch, setImage } = useContext(EventContext);

  useEffect(() => {
    dispatch({ type: 'RESET', payload: initialState });
    setImage(null);
  });
  return (
    <>
      <EventsControl eventId={-1} />
    </>
  );
}
