import React from 'react';
import { TextField } from '@mui/material';

export default function TitleContainer() {
  const [title, setTitle] = React.useState('');

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
