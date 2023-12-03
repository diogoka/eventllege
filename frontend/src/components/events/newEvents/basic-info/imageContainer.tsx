import React from 'react';
import { Button, Input, Typography } from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';

type Props = {
  warning: string;
  onFileInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isMobile: boolean;
  tempImage: string;
};

export default function ImageContainer({
  warning,
  onFileInputChange,
  isMobile,
  tempImage
}: Props) {
  return (
    <>
      {tempImage &&
        <img
          src={tempImage}
          alt=''
          style={{
            width: '320px',
            height: '220px',
            objectFit: 'cover'
          }}
        />}
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
        {tempImage ? 'Edit Image' : 'Add Image'}
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
