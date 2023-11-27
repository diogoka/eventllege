'use client';
import React, {
  createContext,
  ReactNode,
  useState,
  useReducer,
  Dispatch,
} from 'react';
import dayjs from 'dayjs';

export interface DateRange {
  dateStart: dayjs.Dayjs;
  dateEnd: dayjs.Dayjs;
}
const today = dayjs();
type Tag = {
  id_tag: number;
  name_tag: string;
};
export type EventData = {
  name_event: string;
  description_event: string;
  dates: DateRange[];
  capacity_event: number;
  location_event: string;
  price_event: number;
  selectedTags: Array<Tag>;
  category_event: string;
};

export type Image = File | null;

type EventContextProps = {
  addImage: Image | undefined;
  setAddImage: (addImage: Image) => void;
  createdEvent: EventData;
  dispatch: Dispatch<EventAction>;
};

type EventAction = {
  type: string;
  payload: EventData;
};

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

export const eventReducer = (state: EventData, action: EventAction) => {
  switch (action.type) {
    case 'UPDATE_TITLE':
      return { ...state, name_event: action.payload.name_event };
    case 'UPDATE_DESCRIPTION':
      return { ...state, description_event: action.payload.description_event };
    case 'UPDATE_DATES':
      return { ...state, dates: action.payload.dates };
    case 'UPDATE_LOCATION':
      return { ...state, location_event: action.payload.location_event };
    case 'UPDATE_PRICE':
      return { ...state, price_event: action.payload.price_event };
    case 'UPDATE_SPOTS':
      return { ...state, capacity_event: action.payload.capacity_event };
    case 'UPDATE_CATEGORY':
      return { ...state, category_event: action.payload.category_event };
    case 'UPDATE_SELECTED_TAGS':
      return { ...state, selectedTags: action.payload.selectedTags };
    case 'GET_WHOLE_DATA':
      return action.payload;
    default:
      return state;
  }
};
export const EventContext = createContext<EventContextProps>(
  {} as EventContextProps
);

export function EventContextProvider({ children }: { children: ReactNode }) {
  const [addImage, setAddImage] = useState<Image>(null);
  const [createdEvent, dispatch]: [EventData, Dispatch<EventAction>] =
    useReducer(eventReducer, initialState);
  console.log('test', createdEvent);

  return (
    <EventContext.Provider
      value={{ createdEvent, dispatch, addImage, setAddImage }}
    >
      {children}
    </EventContext.Provider>
  );
}
