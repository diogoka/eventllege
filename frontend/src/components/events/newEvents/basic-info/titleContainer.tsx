import React from 'react';
import { TextField, InputLabel, Stack, Box } from '@mui/material';

type Props = {
  title: string;
  setTitle: (value: string) => void;
};
export default function TitleContainer({ title, setTitle }: Props) {
  // const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const title = event.target.value;
  //   if (!title) {
  //     alert('Please enter a title');
  //     console.log('empty');
  //   } else {
  //     console.log('not empty');

  //     setTitle(title);
  //   }
  // };
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
        value={title}
        // onChange={changeTitle}
        onChange={(event) => setTitle(event.target.value)}
      />
    </Stack>
  );
}
