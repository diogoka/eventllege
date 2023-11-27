'use client'
import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';

type Props = {
  location: string;
  setLocation: (value: string) => void;
}

export default function Location({ location, setLocation }: Props) {

  const [locationOptions, setLocationOptions] = useState<string[]>([]);

  const updateOptions = async (input: string) => {
    try {
      const result = await axios.get(`http://localhost:3001/api/location?input=${input}`)
      setLocationOptions(result.data);
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <>
      <Autocomplete
        placeholder='Location'
        options={locationOptions}
        onInputChange={(e, value) => {
          if (value) updateOptions(value);
        }}
        onChange={(e, value) => {
          if (value) setLocation(value);
        }}
        fullWidth
        disablePortal
        renderInput={(params) => <TextField {...params} label='Location' />}
      />
    </>
  );
}
