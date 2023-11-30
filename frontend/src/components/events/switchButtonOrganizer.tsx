import React, { useState } from 'react';
import { Button, Box, Switch } from '@mui/material';

type Props = {
  setSwitchButtonState: (state: boolean) => void;
};

function SwitchButtonOrganizer({ setSwitchButtonState }: Props) {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setSwitchButtonState(event.target.checked);
  };

  const buttonClick = () => {
    setChecked(!checked);
    setSwitchButtonState(!checked);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        marginBottom: '1rem',
      }}
    >
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <Button
        variant={checked ? 'contained' : 'outlined'}
        onClick={buttonClick}
        sx={{
          color: checked ? 'white' : 'black',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          height: '2rem',
        }}
      >
        Past Events
      </Button>
    </Box>
  );
}

export default SwitchButtonOrganizer;
