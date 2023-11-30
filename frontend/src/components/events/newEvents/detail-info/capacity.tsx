import React from 'react';
import { useState, useEffect } from 'react';
import {
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Stack,
  Box,
  InputLabel,
} from '@mui/material';

type Props = {
  spots: number;
  setSpots: (value: number) => void;
};
export default function Capacity({ spots, setSpots }: Props) {
  const [isChecked, setIsChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [checkDisabled, setCheckDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [spotValue, setSpotValue] = useState<number>();

  const handleSpotsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    setSpots(event.target.checked ? -1 : 1);
    setDisabled((prevDisabled) => !prevDisabled);
    setError(false);
  };

  const handleTextSpotsChange = (event: any) => {
    setSpotValue(event.target.value);
    setSpots(event.target.value);
  };

  useEffect(() => {
    if (spots === -1) {
      setIsChecked(true);
      setDisabled(true);
    } else if (spots > 1) {
      setIsChecked(false);
      setDisabled(false);
      setCheckDisabled(true);
      setSpotValue(spots);
    }
  }, [spots]);

  console.log('spotValue', spotValue);
  console.log('spots', spots);

  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='flex-start'
      spacing={1}
      sx={{ width: '100%' }}
    >
      <InputLabel
        sx={{
          fontSize: '1.25rem',
        }}
      >
        Spots {''}
        <Box component={'span'} sx={{ color: '#f14c4c' }}>
          *
        </Box>
      </InputLabel>
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
              {spots >= 2 ? 'people' : 'person'}
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}
