import React from 'react';
import TitleContainer from './titleContainer';
import DescriptionContainer from './descriptionContainer';
import { Stack } from '@mui/material';

type Props = {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
};

export default function BasicInfo({ title, setTitle, description, setDescription }: Props) {
  return (
    <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
      <TitleContainer title={title} setTitle={setTitle} />
      <DescriptionContainer description={description} setDescription={setDescription} />
    </Stack>
  );
}
