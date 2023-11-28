import React from 'react';
import { useState } from 'react';
import {
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Box,
  Stack,
} from '@mui/material';

type Props = {
  price: number;
  setPrice: (value: number) => void;
};

export default function Price({ price, setPrice }: Props) {
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [checkDisabled, setCheckDisabled] = useState(false);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setPrice(event.target.checked ? 0 : 1);
    setDisabled((prevDisabled) => !prevDisabled);
    setError(false);
  };
  const handleTextPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckDisabled((prev) => !prev);
    const value = +event.target.value;

    if (value > 1) {
      setPrice(value);
      setError(false);
    } else {
      setError(true);
    }
  };
  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='flex-start'
      spacing={1}
      sx={{ width: '100%' }}
    >
      <InputLabel
        htmlFor='price'
        sx={{
          fontSize: '1.25rem',
        }}
      >
        Price {''}
        <Box component={'span'} sx={{ color: '#f14c4c' }}>
          *
        </Box>
      </InputLabel>
      <FormControlLabel
        label='Free'
        control={
          <Checkbox
            checked={checked}
            onChange={handlePriceChange}
            disabled={checkDisabled}
          />
        }
      />

      <TextField
        // label='Price'
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
    </Stack>
  );
}
