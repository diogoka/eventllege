'use client';
import { AlertTitle, Alert, AlertColor } from '@mui/material';

const alertFn = (title: string, message: string, severity: AlertColor, onCloseFn: (event: React.SyntheticEvent)=>void) => {
    return (
      <Alert
        severity={severity}
        onClose={onCloseFn}
        variant='filled'
        sx={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
        }}
      >
        <AlertTitle sx={{ color: 'white' }}>{title}</AlertTitle>
        {message}
      </Alert>
    );
  };

  export default alertFn;