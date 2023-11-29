import React from 'react';
import { useState, useEffect } from 'react';
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
  const [priceValue, setPriceValue] = useState<number>();

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setPrice(event.target.checked ? 0 : 1);
    setDisabled((prevDisabled) => !prevDisabled);
    setError(false);
  };
  const handleTextPriceChange = (event: any) => {
    setPriceValue(event.target.value);
    setPrice(event.target.value);
    // setCheckDisabled((prev) => !prev);
    // const value = +event.target.value;
    // if (value > 1) {
    //   setPrice(value);
    //   setError(false);
    // } else {
    //   setError(true);
    // }

    console.log('event.target.value', event.target.value);
  };

  useEffect(() => {
    console.log('price in price', price);
    if (price === 0) {
      setChecked(true);
      setDisabled(true);
    } else if (price > 0) {
      setChecked(false);
      setDisabled(false);
      setPriceValue(price);
      console.log('priceValue in price', priceValue);
    }
  }, [price]);

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
            id='Free'
            checked={checked}
            onChange={handlePriceChange}
            disabled={checkDisabled}
          />
        }
      />

      <TextField
        variant='outlined'
        type='number'
        fullWidth
        disabled={disabled}
        value={priceValue}
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
