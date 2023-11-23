import React from 'react';
import { TextField } from '@mui/material';

type Props = {
  description: string;
  setDescription: (value: string) => void;
};
export default function DescriptionContainer({ description, setDescription }: Props) {
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
        rows={5}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
    </>
  );
}
