import Image from 'next/image';
import React from 'react';
import { NativeLink } from '~/components/Link/NativeLink';

// Floats beside the 600px content column only where there is room for it,
// on smaller screens it sits in the flow after the challenges. The QR code
// only helps from another device, so the caption links to Google Play too.
export function DownloadSpacecraft() {
  return (
    <div className="mt-12 rounded-lg bg-white p-4 xl:fixed xl:bottom-10 xl:right-10 xl:z-30 xl:mt-0">
      <Image
        src="/images/workshop/qr-spacecraft-android.png"
        alt="QR code for Spacecraft on Google Play"
        width={130}
        height={130}
      />
      <p className="mt-2 text-center text-sm font-semibold">
        <NativeLink
          href="https://play.google.com/store/apps/details?id=weshipit.today.spacecraft"
          className="text-blue-700 underline underline-offset-2 hover:text-blue-900"
        >
          Download
          <br />
          Spacecraft
          <br />
          on Android
        </NativeLink>
      </p>
    </div>
  );
}
