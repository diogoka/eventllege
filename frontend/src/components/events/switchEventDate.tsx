import React from 'react';
import { Box, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

function SwitchButtonEvent() {
  const CustomSwitch = styled(Switch)(({ theme }) => ({
    width: 100,
    height: 34,
    padding: 7,
    position: 'relative',
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      with: 42,
      '&.Mui-checked': {
        transform: 'translateX(20px)',
        '& + .MuiSwitch-track': {
          opacity: 1,
          height: 34,
          backgroundColor:
            theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 88,
      height: 32,
      position: 'relative',
      zIndex: 1,
      borderRadius: 5,
      '&:before': {
        content: "'Past Events'",
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // color: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        color: 'white',
        pointerEvents: 'none',
        width: '100%', // Largura do texto
        textAlign: 'center',
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 5,
    },
  }));

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControlLabel
        sx={{ width: '100%' }}
        control={<CustomSwitch onChange={() => console.log('changed')} />}
        label=''
      />
    </Box>
  );
}

export default SwitchButtonEvent;
