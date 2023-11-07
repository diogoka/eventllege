import React, { useState } from 'react'
import Image from 'next/image';

// This is an image component that displays fallback image if the link doesn't exist
export default function ImageHelper(props: any) {
  const { src, placeholderSrc, width, height, style, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div style={{width, height}}>
      <Image
        {...rest}
        src={imgSrc}
        loader={() => imgSrc}
        onError={() => {
          setImgSrc(placeholderSrc);
        }}
        width={0}
        height={0}
        style={{ ...style, width: '100%', height: 'auto', overflow: 'hidden' }}
      />
    </div>
  );
}
