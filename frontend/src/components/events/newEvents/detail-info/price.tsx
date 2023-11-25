import React from 'react';
import { useState } from 'react';
import {
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

type Props = {
  setPrice: (value: number) => void;
};

export default function Price({ setPrice }: Props) {
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setPrice(event.target.checked ? 0 : 1);
    setDisabled((prevDisabled) => !prevDisabled);
    setError(false);
  };
  const handleTextPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = +event.target.value;

    if (value > 1) {
      setPrice(value);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <FormControlLabel
        label='Free'
        control={<Checkbox checked={checked} onChange={handlePriceChange} />}
      />
      <TextField
        label='Price'
        variant='outlined'
        type='number'
        fullWidth
        required
        disabled={disabled}
        onChange={handleTextPriceChange}
        error={error}
        helperText={error ? 'Price must be greater than 1' : ''}
        InputProps={{
          startAdornment: <InputAdornment position='start'>$</InputAdornment>,
        }}
      />
    </>
  );
}
