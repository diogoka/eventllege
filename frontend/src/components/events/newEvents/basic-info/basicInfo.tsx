import React from 'react';
import TitleContainer from './titleContainer';
import DescriptionContainer from './descriptionContainer';
import { Stack, Box } from '@mui/material';

type Props = {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  isMobile: boolean;
};

export default function BasicInfo({
  title,
  setTitle,
  description,
  setDescription,
  isMobile,
}: Props) {
  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={{ sm: 2, md: 3 }}
      sx={{ width: '100%' }}
    >
      <TitleContainer title={title} setTitle={setTitle} />
      <DescriptionContainer
        isMobile={isMobile}
        description={description}
        setDescription={setDescription}
      />
    </Stack>
  );
}
