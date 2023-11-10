import React from 'react';
import TitleContainer from './titleContainer';
import DescriptionContainer from './descriptionContainer';
import ImageContainer from './imageContainer';
import { Box } from '@mui/material';
export default function BasicInfo() {
  return (
    <>
      <TitleContainer />
      <DescriptionContainer />
      <ImageContainer />
    </>
  );
}
