import React from 'react';
import { TextField, InputAdornment } from '@mui/material';

export default function Capacity() {
  const [spots, setSpots] = React.useState('0');
  return (
    <>
      <TextField
        label='Max spots'
        variant='outlined'
        type='number'
        fullWidth
        value={spots}
        onChange={(event) => setSpots(event.target.value)}
        InputProps={{
          endAdornment: <InputAdornment position='end'>{spots >= '2' ? 'people' : 'person'}</InputAdornment>,
        }}
      />
    </>
  );
}
