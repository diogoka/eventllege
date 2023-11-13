import React from 'react';
import TitleContainer from './titleContainer';
import DescriptionContainer from './descriptionContainer';
import { Box, Stack } from '@mui/material';
export default function BasicInfo() {
  return (
    <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
      <TitleContainer />
      <DescriptionContainer />
    </Stack>
  );
}
