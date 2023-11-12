import React from 'react';
import { TextField, InputAdornment } from '@mui/material';

export default function Price() {
  const [price, setPrice] = React.useState('0');
  return (
    <>
      <TextField
        label='Price'
        variant='outlined'
        type='number'
        fullWidth
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position='start'>$</InputAdornment>,
        }}
      />
    </>
  );
}
