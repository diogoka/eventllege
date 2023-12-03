import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { EventContext } from '@/context/eventContext';
import {
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Stack,
  Box,
  FormControl,
  FormLabel,
} from '@mui/material';

export default function Capacity() {
  const { createdEvent, dispatch } = useContext(EventContext);
  const [isChecked, setIsChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [checkDisabled, setCheckDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [spotValue, setSpotValue] = useState<number>();

  const handleSpotsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    dispatch({
      type: 'UPDATE_SPOTS',
      payload: {
        ...createdEvent,
        capacity_event: event.target.checked ? -1 : 1,
      },
    });
    // setSpots(event.target.checked ? -1 : 1);
    setDisabled((prevDisabled) => !prevDisabled);
    setError(false);
  };

  const handleTextSpotsChange = (event: any) => {
    setSpotValue(event.target.value);
    dispatch({
      type: 'UPDATE_SPOTS',
      payload: { ...createdEvent, capacity_event: event.target.value },
    });
    // setSpots(event.target.value);
  };

  useEffect(() => {
    if (createdEvent.capacity_event === -1) {
      setIsChecked(true);
      setDisabled(true);
    } else if (createdEvent.capacity_event >= 1) {
      setIsChecked(false);
      setDisabled(false);
      setCheckDisabled(true);
      setError(false);
      setSpotValue(createdEvent.capacity_event);
    } else {
      setError(true);
      setCheckDisabled(false);
    }
  }, [createdEvent.capacity_event]);

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
          id='capacity'
          sx={{ marginBlock: '.5rem', fontSize: '1.125rem' }}
        >
          Spots {''}
          <Box component={'span'} sx={{ color: '#f14c4c' }}>
            *
          </Box>
        </FormLabel>
        <FormControlLabel
          label='Non limited people'
          control={
            <Checkbox
              checked={isChecked}
              onChange={handleSpotsChange}
              disabled={checkDisabled}
            />
          }
        />

        <TextField
          variant='outlined'
          type='number'
          fullWidth
          disabled={disabled}
          value={spotValue}
          onChange={handleTextSpotsChange}
          error={error}
          helperText={error ? 'Spots must be greater than 1' : ''}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                {createdEvent.capacity_event >= 2 ? 'people' : 'person'}
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiFormHelperText-root': {
              position: 'absolute',
              bottom: '-1rem',
            },
          }}
        />
      </FormControl>
    </Stack>
  );
}
