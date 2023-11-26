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

  console.log(location);

  const updateOptions = async (input: string) => {
    const result = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=address&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`)

    const options: string[] = result.data.predictions.map((prediction: any) => {
      return prediction.description;
    });

    setLocationOptions(options);
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
