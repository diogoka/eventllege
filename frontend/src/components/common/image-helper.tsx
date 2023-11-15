import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Box } from '@mui/material';

const FALLBACK_IMAGE = '/event_placeholder.png';

// This is an image component that displays fallback image if the link doesn't exist
export default function ImageHelper(props: any) {
  const { src, alt, width, height, style, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src])

  return (
    <Box style={{width, height}}>
      <Image
        {...rest}
        src={imgSrc}
        alt={alt}
        loader={() => imgSrc}
        onError={() => {
          setImgSrc(FALLBACK_IMAGE);
        }}
        width={0}
        height={0}
        style={{ ...style, width: '100%', height: '100%', overflow: 'hidden' }}
        unoptimized
        priority
      />
    </Box>
  );
}
