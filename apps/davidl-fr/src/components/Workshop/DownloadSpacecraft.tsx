import Image from 'next/image';
import React from 'react';

// Floats beside the 600px content column only where there is room for it,
// on smaller screens it sits in the flow after the challenges.
export function DownloadSpacecraft() {
  return (
    <div className="mt-12 rounded-lg bg-white p-4 xl:fixed xl:bottom-10 xl:right-10 xl:z-30 xl:mt-0">
      <Image
        src="/images/workshop/qr-spacecraft-android.png"
        alt="Download Spacecraft on Android"
        width={130}
        height={130}
      />
      <p className="mt-2 text-center text-sm font-semibold text-gray-900">
        Download
        <br />
        Spacecraft
        <br />
        on Android
      </p>
    </div>
  );
}
