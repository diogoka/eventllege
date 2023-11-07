import React, { useState } from 'react'
import Image from 'next/image';

const FALLBACK_IMAGE = '/event_placeholder.png';

// This is an image component that displays fallback image if the link doesn't exist
export default function ImageHelper(props: any) {
  const { src, width, height, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div style={{ width, height }}>
      <Image
        {...rest}
        src={imgSrc}
        loader={() => imgSrc}
        onError={() => {
          setImgSrc(FALLBACK_IMAGE);
        }}
        width={0}
        height={0}
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
}
