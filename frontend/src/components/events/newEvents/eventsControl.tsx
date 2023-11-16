import React from 'react';
import { useState, useContext } from 'react';
import { EventContext } from '@/context/eventContext';
import { Box } from '@mui/material';
import BasicInfo from './basic-info/basicInfo';
import DateList from './dateSchedule/dateList';
import DetailList from './detail-info/detailList';
import Location from './location/location';
import ImageContainer from '../newEvents/basic-info/imageContainer';

export default function EventsControl() {
  const { eventData, setEventData } = useContext(EventContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  return (
    <Box component={'form'}>
      <BasicInfo title={title} setTitle={setTitle} description={description} setDescription={setDescription} />
      <DateList />
      <Location />
      <DetailList />
      <ImageContainer />
    </Box>
  );
}
