'use client'
import React, { createContext, ReactNode, useState } from 'react';

  type EventData = {
    title: string;
    description: string;
    dates: Array<Date>;
    spots: string;
    location: string;
    price: string;
    image: string;
    tagId: number;
    category: string;
    tags: Array<number>;
    categories: Array<string>;
  }

type EventContextProps = {
  eventData: EventData | null,
  setEventData: (EventData: EventData | null) => void
}

export const EventContext = createContext<EventContextProps>({} as EventContextProps);

export function EventContextProvider({ children }: { children: ReactNode }) {
  
  const [eventData, setEventData] = useState<EventData | null>(null);

  return (
    <EventContext.Provider
      value={{ eventData, setEventData }}
    >
      {children}
    </EventContext.Provider>
  );
}