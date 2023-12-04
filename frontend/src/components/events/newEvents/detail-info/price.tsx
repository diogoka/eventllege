import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { EventContext } from '@/context/eventContext';
import {
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Box,
  Stack,
  FormControl,
  FormLabel,
} from '@mui/material';

export default function Price() {
  const { createdEvent, dispatch } = useContext(EventContext);
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [priceValue, setPriceValue] = useState<string>();

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
      setDisabled(false);
      setPriceValue('');
    } else if (createdEvent.price_event >= 1) {
      setChecked(false);
      setDisabled(false);
      setError(false);
      setPriceValue(createdEvent.price_event.toString());
    } else {
      setError(true);
      setChecked(false);
      setPriceValue('');
    }
  }, [createdEvent.price_event]);

  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='flex-start'
      spacing={1}
      sx={{ width: '100%' }}
    >
      <FormControl fullWidth>
        <FormLabel
          id='price'
          sx={{ marginBlock: '.5rem', fontSize: '1.125rem' }}
        >
          Price {''}
          <Box component={'span'} sx={{ color: '#f14c4c' }}>
            *
          </Box>
        </FormLabel>
        <FormControlLabel
          label='Free'
          control={
            <Checkbox
              id='Free'
              checked={checked}
              onChange={handlePriceChange}
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
            // '& .MuiInputBase-input.Mui-disabled': {
            //   WebkitTextFillColor: '#000000',
            // },
          }}
        />
      </FormControl>
    </Stack>
  );
}
