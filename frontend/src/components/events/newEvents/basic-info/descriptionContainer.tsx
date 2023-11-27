import React from 'react';
import { TextField } from '@mui/material';

type Props = {
  description: string;
  setDescription: (value: string) => void;
  isMobile: boolean;
};
export default function DescriptionContainer({
  description,
  setDescription,
  isMobile,
}: Props) {
  return (
    <>
      <TextField
        id='outlined-basic'
        label='description'
        variant='outlined'
        placeholder='Please enter description'
        fullWidth
        color='secondary'
        type='textarea'
        multiline
        rows={isMobile ? 5 : 8}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required
      />
    </>
  );
}
