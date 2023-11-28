import React from 'react';
import { TextField, InputLabel, Box, Stack } from '@mui/material';

type Props = {
  description: string;
  setDescription: (value: string) => void;
  isMobile: boolean;
};
export default function DescriptionContainer({
  description,
  setDescription,
  isMobile,
}: Props) {
  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='flex-start'
      spacing={1}
      sx={{ width: '100%' }}
    >
      <InputLabel
        htmlFor='description'
        sx={{
          fontSize: '1.25rem',
        }}
      >
        description{' '}
        <Box component={'span'} sx={{ color: '#f14c4c' }}>
          *
        </Box>
      </InputLabel>
      <TextField
        id='description'
        // label='description'
        variant='outlined'
        placeholder='Please enter description'
        fullWidth
        color='secondary'
        type='textarea'
        multiline
        rows={isMobile ? 5 : 8}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required
      />
    </Stack>
  );
}
