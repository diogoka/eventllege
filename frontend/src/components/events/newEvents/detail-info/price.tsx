import React from 'react';
import { TextField } from '@mui/material';

export default function Price() {
  return (
    <>
      <TextField label='Price' variant='outlined' type='number' fullWidth defaultValue={0} />
    </>
  );
}
