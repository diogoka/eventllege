import React from 'react';
import { useContext } from 'react';
import { EventContext } from '@/context/eventContext';
import { TextField, InputLabel, Stack, Box } from '@mui/material';

export default function TitleContainer() {
  const { createdEvent, dispatch } = useContext(EventContext);
  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'UPDATE_TITLE',
      payload: { ...createdEvent, name_event: event.target.value },
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
        htmlFor='title'
        sx={{
          fontSize: '1.25rem',
        }}
      >
        title{' '}
        <Box component={'span'} sx={{ color: '#f14c4c' }}>
          *
        </Box>
      </InputLabel>
      <TextField
        id='title'
        variant='outlined'
        placeholder='Please enter title'
        fullWidth
        size='small'
        color='secondary'
        type='text'
        value={createdEvent.name_event}
        onChange={changeTitle}
      />
    </Stack>
  );
}
