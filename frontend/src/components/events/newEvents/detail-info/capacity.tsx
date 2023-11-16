import React from 'react';
import { TextField, InputAdornment } from '@mui/material';

type Props = {
  spots: number;
  setSpots: (value: number) => void;
};
export default function Capacity({ spots, setSpots }: Props) {
  return (
    <>
      <TextField
        label='Max spots'
        variant='outlined'
        type='number'
        fullWidth
        value={spots}
        onChange={(event) => setSpots(+event.target.value)}
        InputProps={{
          endAdornment: <InputAdornment position='end'>{spots >= 2 ? 'people' : 'person'}</InputAdornment>,
        }}
      />
    </>
  );
}
