import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { EventContext } from '@/context/eventContext';
import {
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Box,
  Stack,
} from '@mui/material';

export default function Price() {
  const { createdEvent, dispatch } = useContext(EventContext);
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [checkDisabled, setCheckDisabled] = useState(false);
  const [priceValue, setPriceValue] = useState<number>();

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    dispatch({
      type: 'UPDATE_PRICE',
      payload: { ...createdEvent, price_event: event.target.checked ? 0 : 1 },
    });
    setDisabled((prevDisabled) => !prevDisabled);
    setError(false);
  };
  const handleTextPriceChange = (event: any) => {
    setPriceValue(event.target.value);
    dispatch({
      type: 'UPDATE_PRICE',
      payload: { ...createdEvent, price_event: event.target.value },
    });
  };

  useEffect(() => {
    if (createdEvent.price_event === 0) {
      setChecked(true);
      setDisabled(true);
    } else if (createdEvent.price_event >= 1) {
      setChecked(false);
      setDisabled(false);
      setCheckDisabled(true);
      setError(false);
      setPriceValue(createdEvent.price_event);
    } else {
      setError(true);
      setCheckDisabled(false);
    }
  }, [createdEvent.price_event]);

  // console.log('price', createdEvent.price_event);
  // console.log('priceValue', priceValue);

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
        sx={{
          '& .MuiFormHelperText-root': {
            position: 'absolute',
            bottom: '-1rem',
          },
        }}
      />
    </Stack>
  );
}
