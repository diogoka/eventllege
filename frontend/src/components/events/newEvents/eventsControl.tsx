import React, { Dispatch } from 'react';
import dayjs from 'dayjs';
import { useContext, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { EventContext } from '@/context/eventContext';
import { Box, Button } from '@mui/material';
import useUploadImage from '@/services/imageInput';
import BasicInfo from './basic-info/basicInfo';
import DateList from './dateSchedule/dateList';
import DetailList from './detail-info/detailList';
import Location from './location/location';
import ImageContainer from '../newEvents/basic-info/imageContainer';

interface DateRange {
  dateStart: dayjs.Dayjs;
  dateEnd: dayjs.Dayjs;
}
const today = dayjs();

interface EventState {
  title: string;
  description: string;
  dates: DateRange[];
  price: number;
  spots: number;
  category: string;
  selectedTags: number[];
}

type EventAction = {
  type: string;
  payload: any;
};

const initialState = {
  title: '',
  description: '',
  dates: [{ dateStart: today, dateEnd: today }],
  price: 0,
  spots: 0,
  category: '',
  selectedTags: [],
};
const eventReducer = (state: EventState, action: EventAction) => {
  switch (action.type) {
    case 'UPDATE_TITLE':
      return { ...state, title: action.payload };
    case 'UPDATE_DESCRIPTION':
      return { ...state, description: action.payload };
    case 'UPDATE_DATES':
      return { ...state, dates: action.payload };
    case 'UPDATE_PRICE':
      return { ...state, price: action.payload };
    case 'UPDATE_SPOTS':
      return { ...state, spots: action.payload };
    case 'UPDATE_CATEGORY':
      return { ...state, category: action.payload };
    case 'UPDATE_SELECTED_TAGS':
      return { ...state, selectedTags: action.payload };
    default:
      return state;
  }
};

export default function EventsControl() {
  const router = useRouter();
  const { eventData, setEventData } = useContext(EventContext);

  const { image, warning, onFileInputChange } = useUploadImage(10, 0.1, 480);

  const [event, dispatch]: [EventState, Dispatch<EventAction>] = useReducer(
    eventReducer,
    initialState
  );

  const clickHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setEventData((prev) => ({ ...Prev, eventData, event }));
    router.push('http://localhost:3000/events/new/preview');
  };
  return (
    <Box component={'form'} onSubmit={clickHandler}>
      <BasicInfo
        title={event.title}
        setTitle={(title) => dispatch({ type: 'UPDATE_TITLE', payload: title })}
        description={event.description}
        setDescription={(description) =>
          dispatch({ type: 'UPDATE_DESCRIPTION', payload: description })
        }
      />
      <DateList
        dates={event.dates}
        setDates={(dates) => dispatch({ type: 'UPDATE_DATES', payload: dates })}
      />
      <Location />
      <DetailList
        price={event.price}
        setPrice={(price) => dispatch({ type: 'UPDATE_PRICE', payload: price })}
        spots={event.spots}
        setSpots={(spots) => dispatch({ type: 'UPDATE_SPOTS', payload: spots })}
        category={event.category}
        setCategory={(category) =>
          dispatch({ type: 'UPDATE_CATEGORY', payload: category })
        }
        selectedTags={event.selectedTags}
        setSelectedTags={(selectedTags) =>
          dispatch({ type: 'UPDATE_SELECTED_TAGS', payload: selectedTags })
        }
      />
      <ImageContainer warning={warning} onFileInputChange={onFileInputChange} />
      <Button type="submit">Go to preview</Button>
    </Box>
  );
}
