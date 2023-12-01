import React from 'react';
import { Button, Input, Typography } from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';

type Props = {
  warning: string;
  onFileInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isMobile: boolean;
};

export default function ImageContainer({
  warning,
  onFileInputChange,
  isMobile,
}: Props) {
  return (
    <>
      <Button
        component='label'
        variant='outlined'
        startIcon={<CollectionsIcon />}
        color='info'
        fullWidth
        disableRipple
        sx={{
          width: isMobile ? '100%' : '40%',
        }}
      >
        Add Image
        <Input
          type='file'
          onChange={onFileInputChange}
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
            accept: 'image/*',
          }}
        />
      </Button>
      <Typography variant={'body2'}>{warning}</Typography>
    </>
  );
}
