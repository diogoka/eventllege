'use client';
import React, { createContext, ReactNode, useState } from 'react';
import { DateRange } from '@/components/events/newEvents/eventsControl';

type Tag = {
  id_tag: number;
  name_tag: string;
};
export type EventData = {
  title: string;
  description: string;
  dates: DateRange[];
  spots: number;
  location: string;
  price: number;
  selectedTags: Tag[];
  category: string;
};

export type Image = File | null;

type EventContextProps = {
  eventData: EventData | null;
  setEventData: (EventData: EventData | null) => void;
  addImage: Image | undefined;
  setAddImage: (addImage: Image) => void;
};

export const EventContext = createContext<EventContextProps>(
  {} as EventContextProps
);

export function EventContextProvider({ children }: { children: ReactNode }) {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [addImage, setAddImage] = useState<Image>(null);
  console.log('eventContext', eventData);
  console.log('eventContext images', addImage);

  return (
    <EventContext.Provider
      value={{ eventData, setEventData, addImage, setAddImage }}
    >
      {children}
    </EventContext.Provider>
  );
}
