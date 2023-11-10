import React from 'react';
import { Button, Input } from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';

export default function ImageContainer() {
  return (
    <>
      <Button component='label' variant='outlined' startIcon={<CollectionsIcon />} color='info' fullWidth disableRipple>
        Add Image
        <Input
          type='file'
          sx={{
            clip: 'rect(0 0 0 0)',
            clipPath: 'inset(50%)',
            height: 1,
            overflow: 'hidden',
            position: 'absolute',
            bottom: 0,
            left: 0,
            whiteSpace: 'nowrap',
            width: 1,
          }}
        />
      </Button>
    </>
  );
}
