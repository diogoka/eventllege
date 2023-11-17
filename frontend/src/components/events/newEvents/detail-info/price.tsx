import React from 'react';
import { TextField, InputAdornment } from '@mui/material';

type Props = {
  price: number;
  setPrice: (value: number) => void;
};

export default function Price({ price, setPrice }: Props) {
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = +event.target.value;
    if (!isNaN(inputValue)) {
      setPrice(inputValue);
    }
  };
  return (
    <>
      <TextField
        label='Price'
        variant='outlined'
        type='number'
        fullWidth
        value={price}
        onChange={handlePriceChange}
        InputProps={{
          startAdornment: <InputAdornment position='start'>$</InputAdornment>,
        }}
      />
    </>
  );
}
