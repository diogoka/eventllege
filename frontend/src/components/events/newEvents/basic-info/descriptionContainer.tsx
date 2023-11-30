import React from 'react';
import { useContext } from 'react';
import { EventContext } from '@/context/eventContext';
import { TextField, InputLabel, Box, Stack } from '@mui/material';

type Props = {
  isMobile: boolean;
};
export default function DescriptionContainer({ isMobile }: Props) {
  const { createdEvent, dispatch } = useContext(EventContext);
  const changeDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'UPDATE_DESCRIPTION',
      payload: { ...createdEvent, description_event: event.target.value },
    });
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
        variant='outlined'
        placeholder='Please enter description'
        fullWidth
        color='secondary'
        type='textarea'
        multiline
        rows={isMobile ? 5 : 8}
        value={createdEvent.description_event}
        onChange={changeDesc}
      />
    </Stack>
  );
}
