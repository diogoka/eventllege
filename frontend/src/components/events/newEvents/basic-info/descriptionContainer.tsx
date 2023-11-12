import React from 'react';
import { TextField } from '@mui/material';

export default function DescriptionContainer() {
  const [description, setDescription] = React.useState('');

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
