import Image from 'next/image';
import React, { useState } from 'react';

interface FrameProps {
  src: string;
  width: string;
  height: string | number;
}

export default function Frame({ src, width, height }: FrameProps) {
  const [isLoaded, setILoaded] = useState(false);

  function handleLoad() {
    setILoaded(true);
  }

  return (
    <>
      {!isLoaded ? (
        <Image
          src={'/images/internet-56k.gif'}
          alt={'Contacting David Leuliette on internet'}
          width={400}
          height={200}
        />
      ) : null}
      <iframe
        className={isLoaded ? 'flex' : 'hide'}
        onLoad={handleLoad}
        src={src}
        width={width}
        height={height}
      />
    </>
  );
}
