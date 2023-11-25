import React, { Dispatch, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useContext, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { EventContext } from '@/context/eventContext';
import { Box, Stack, Button, useMediaQuery } from '@mui/material';
import useUploadImage from '@/services/imageInput';
import BasicInfo from './basic-info/basicInfo';
import DateList from './dateSchedule/dateList';
import DetailList from './detail-info/detailList';
import Location from './location/location';
import ImageContainer from '../newEvents/basic-info/imageContainer';

export default function EventsControl() {
  const router = useRouter();
  const { setAddImage, createdEvent, dispatch } = useContext(EventContext);
  const [tempImage, setTempImage] = useState('');
  const isMobile = useMediaQuery('(max-width:768px)');

  const { image, warning, onFileInputChange } = useUploadImage(10, 0.1, 480);

  useEffect(() => {
    if (image) {
      setTempImage(URL.createObjectURL(image));
    }
  }, [image]);

  const clickHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddImage(image);
    router.push('http://localhost:3000/events/new/preview');
  };
  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={{ sm: 2, md: 3 }}
      component={'form'}
      onSubmit={clickHandler}
      maxWidth='1280px'
      sx={{ marginTop: '4rem' }}
    >
      <BasicInfo
        isMobile={isMobile}
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
        isMobile={isMobile}
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
        isMobile={isMobile}
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
      <img src={tempImage} alt='' />
      <ImageContainer warning={warning} onFileInputChange={onFileInputChange} />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        sx={{
          width: isMobile ? '100%' : '40%',
        }}
        fullWidth
      >
        Go to preview
      </Button>
    </Stack>
  );
}
