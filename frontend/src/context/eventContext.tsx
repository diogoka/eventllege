'use client';
import React, { createContext, ReactNode, useState } from 'react';
import { DateRange } from '@/components/events/newEvents/eventsControl';
export type EventData = {
  title: string;
  description: string;
  dates: DateRange[];
  spots: number;
  location: string;
  price: number;
  image: string;
  selectedTags: number[];
  category: string;
  // tags: Array<string>;
  // categories: Array<string>;
};

type EventContextProps = {
  eventData: EventData | null;
  setEventData: (EventData: EventData | null) => void;
  // setEventData: React.Dispatch<React.SetStateAction<EventData | null>>;
  // updateProperty: (property: keyof EventData, value: string) => void;
};

export const EventContext = createContext<EventContextProps>(
  {} as EventContextProps
);

export function EventContextProvider({ children }: { children: ReactNode }) {
  const [eventData, setEventData] = useState<EventData | null>(null);

  // const updateProperty = (property: keyof EventData, value: string) => {
  //   setEventData((prev) => (prev ? { ...prev, [property]: value } : null));
  // };

  return (
    <EventContext.Provider value={{ eventData, setEventData }}>
      {children}
    </EventContext.Provider>
  );
}
