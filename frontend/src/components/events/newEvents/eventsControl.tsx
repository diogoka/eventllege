import React from 'react';
import { Box } from '@mui/material';
import BasicInfo from './basic-info/basicInfo';
import DateList from './dateSchedule/dateList';
import DetailList from './detail-info/detailList';
import Location from './location/location';
import ImageContainer from '../newEvents/basic-info/imageContainer';

export default function EventsControl() {
  return (
    <Box component={'form'}>
      <BasicInfo />
      <DateList />
      <Location />
      <DetailList />
      <ImageContainer />
    </Box>
  );
}
