import React from 'react';
import { TextField } from '@mui/material';
type Props = {
  title: string;
  setTitle: (value: string) => void;
  // eventData: EventData | null;
  // setEventData: (EventData: EventData | null) => void;
};
export default function TitleContainer({ title, setTitle }: Props) {
  return (
    <>
      <TextField
        id='outlined-basic'
        label='title'
        variant='outlined'
        placeholder='Please enter title'
        fullWidth
        size='small'
        color='secondary'
        type='text'
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
    </>
  );
}
