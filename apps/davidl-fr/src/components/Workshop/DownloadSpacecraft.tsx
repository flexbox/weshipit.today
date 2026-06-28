import Image from 'next/image';
import React from 'react';

interface Props {}

export function DownloadSpacecraft({}: Props) {
  return (
    <div className="fixed bottom-10 right-10 z-30 rounded-lg bg-white p-4">
      <Image
        src="/images/workshop/qr-spacecraft-android.png"
        alt="Download Spacecraft on Android"
        width={130}
        height={130}
      />
      <p className="mt-2 text-center text-sm font-semibold text-gray-900 ">
        Download
        <br />
        Spacecraft
        <br />
        on Android
      </p>
    </div>
  );
}
