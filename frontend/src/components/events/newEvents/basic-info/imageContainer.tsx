import React from 'react';
import { Button, Input, Typography } from '@mui/material';
import Image from 'next/image';
import CollectionsIcon from '@mui/icons-material/Collections';

type Props = {
  warning: string;
  onFileInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isMobile: boolean;
  tempImage: string;
  imageURL: string;
};

export default function ImageContainer({
  warning,
  onFileInputChange,
  isMobile,
  tempImage,
  imageURL,
}: Props) {
  console.log('temp', tempImage);
  console.log('imageURL', imageURL);
  return (
    <>
      {tempImage ? (
        <Image
          src={tempImage}
          alt=''
          width={320}
          height={220}
          style={{
            objectFit: 'cover',
          }}
        />
      ) : (
        <Image
          src={imageURL}
          alt=''
          width={320}
          height={220}
          style={{
            objectFit: 'cover',
          }}
        />
      )}
      <Button
        component='label'
        variant='outlined'
        startIcon={<CollectionsIcon />}
        color='info'
        fullWidth
        sx={{
          width: isMobile ? '100%' : '40%',
        }}
      >
        {'Edit Image'}
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
