import React, { Dispatch, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useContext, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { EventContext } from '@/context/eventContext';
import { Box, Stack, Button } from '@mui/material';
import useUploadImage from '@/services/imageInput';
import BasicInfo from './basic-info/basicInfo';
import DateList from './dateSchedule/dateList';
import DetailList from './detail-info/detailList';
import Location from './location/location';
import ImageContainer from '../newEvents/basic-info/imageContainer';
export interface DateRange {
  dateStart: dayjs.Dayjs;
  dateEnd: dayjs.Dayjs;
}
const today = dayjs();

// interface EventData {
//   name_event: string;
//   description_event: string;
//   dates: DateRange[];
//   capacity_event: number;
//   location_event: string;
//   price_event: number;
//   selectedTags: Tag[];
//   category_event: string;
// }

// type EventAction = {
//   type: string;
//   payload: any;
// };

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

type Props = {
  editEvent?: SelectedEvent;
  selectedTags?: Tag[];
};

// const eventReducer = (state: EventData, action: EventAction) => {
//   switch (action.type) {
//     case 'UPDATE_TITLE':
//       return { ...state, title: action.payload };
//     case 'UPDATE_DESCRIPTION':
//       return { ...state, description: action.payload };
//     case 'UPDATE_DATES':
//       return { ...state, dates: action.payload };
//     case 'UPDATE_PRICE':
//       return { ...state, price: action.payload };
//     case 'UPDATE_SPOTS':
//       return { ...state, spots: action.payload };
//     case 'UPDATE_CATEGORY':
//       return { ...state, category: action.payload };
//     case 'UPDATE_SELECTED_TAGS':
//       return { ...state, selectedTags: action.payload };
//     default:
//       return state;
//   }
// };

export default function EventsControl({ editEvent, selectedTags }: Props) {
  const router = useRouter();
  const { setAddImage, createdEvent, dispatch } = useContext(EventContext);
  const [tempImage, setTempImage] = useState('');

  const { image, warning, onFileInputChange } = useUploadImage(10, 0.1, 480);
  // console.log('editEvent', editEvent);

  // const initialState = {
  //   title: editEvent ? editEvent.name_event : '',
  //   description: editEvent ? editEvent.description_event : '',
  //   dates: editEvent
  //     ? [
  //         {
  //           dateStart: dayjs(editEvent.date_event_start),
  //           dateEnd: dayjs(editEvent.date_event_end),
  //         },
  //       ]
  //     : [{ dateStart: today, dateEnd: today }],
  //   spots: editEvent ? editEvent.capacity_event : 0,
  //   location: editEvent ? editEvent.location_event : 'location',
  //   price: editEvent ? editEvent.price_event : 0,
  //   image: editEvent ? editEvent.image_event : 'images',
  //   selectedTags: selectedTags ? selectedTags : [],
  //   category: editEvent ? editEvent.category_event : '',

  // dates: [{ dateStart: today, dateEnd: today }],
  // spots: 0,
  // location: 'location',
  // price: 0,
  // image: 'images',
  // selectedTags: [],
  // category: '',
  // };

  // const [newEvent, dispatch]: [EventData, Dispatch<EventAction>] = useReducer(
  //   eventReducer,
  //   initialState
  // );
  // console.log('new event', newEvent);

  useEffect(() => {
    if (image) {
      setTempImage(URL.createObjectURL(image));
    }
  }, [image]);

  const clickHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setEventData(newEvent);
    setAddImage(image);
    router.push('http://localhost:3000/events/new/preview');
  };
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      component={'form'}
      onSubmit={clickHandler}
    >
      <BasicInfo
        title={createdEvent.name_event}
        setTitle={(title) =>
          dispatch({
            type: 'UPDATE_TITLE',
            payload: { ...createdEvent, name_event: title },
          })
        }
        description={createdEvent.description_event}
        setDescription={(description) =>
          dispatch({
            type: 'UPDATE_DESCRIPTION',
            payload: { ...createdEvent, description_event: description },
          })
        }
      />
      <DateList
        dates={createdEvent.dates}
        setDates={(dates) =>
          dispatch({
            type: 'UPDATE_DATES',
            payload: { ...createdEvent, dates },
          })
        }
      />
      <Location />
      <DetailList
        price={createdEvent.price_event}
        setPrice={(price) =>
          dispatch({
            type: 'UPDATE_PRICE',
            payload: { ...createdEvent, price_event: price },
          })
        }
        spots={createdEvent.capacity_event}
        setSpots={(spots) =>
          dispatch({
            type: 'UPDATE_SPOTS',
            payload: { ...createdEvent, capacity_event: spots },
          })
        }
        category={createdEvent.category_event}
        setCategory={(category) =>
          dispatch({
            type: 'UPDATE_CATEGORY',
            payload: { ...createdEvent, category_event: category },
          })
        }
        selectedTags={createdEvent.selectedTags}
        setSelectedTags={(selectedTags) =>
          dispatch({
            type: 'UPDATE_SELECTED_TAGS',
            payload: { ...createdEvent, selectedTags },
          })
        }
      />
      <img src={tempImage} alt="" />
      <ImageContainer warning={warning} onFileInputChange={onFileInputChange} />
      <Button type="submit" variant="outlined" color="primary" fullWidth>
        Go to preview
      </Button>
    </Stack>
  );
}
