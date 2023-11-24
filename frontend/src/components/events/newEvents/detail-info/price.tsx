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

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setPrice(event.target.checked ? 0 : 1);
    setDisabled((prevDisabled) => !prevDisabled);
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
        disabled={disabled}
        onChange={(event) => {
          const value = +event.target.value;
          if (value > 0) {
            setPrice(value);
          }
        }}
        InputProps={{
          startAdornment: <InputAdornment position='start'>$</InputAdornment>,
        }}
      />
    </>
  );
}
