import React from 'react';
import { useState } from 'react';
import {
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

type Props = {
  spots: number;
  setSpots: (value: number) => void;
};
export default function Capacity({ spots, setSpots }: Props) {
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);

  const handleSpotsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setSpots(event.target.checked ? -1 : 0);
    setDisabled((prevDisabled) => !prevDisabled);
    setError(false);
  };

  const handleTextSpotsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = +event.target.value;
    if (value > 1) {
      setSpots(value);
      setError(false);
    } else {
      setError(true);
    }
  };

  console.log('spots', spots);

  return (
    <>
      <FormControlLabel
        label='Non limited people'
        control={<Checkbox checked={checked} onChange={handleSpotsChange} />}
      />

      <TextField
        label='Limited spots'
        variant='outlined'
        type='number'
        fullWidth
        disabled={disabled}
        onChange={handleTextSpotsChange}
        error={error}
        helperText={error ? 'Spots must be greater than 1' : ''}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              {spots >= 2 ? 'people' : 'person'}
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}
