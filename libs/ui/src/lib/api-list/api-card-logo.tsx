import Image from 'next/image';
import { useState } from 'react';

export interface ApiCardLogoProps {
  name: string;
  websiteUrl: string;
  logoUrl?: string;
}

export function ApiCardLogo({ websiteUrl, logoUrl, name }: ApiCardLogoProps) {
  function removeHttp(url: string) {
    if (url.startsWith('https://')) {
      const https = 'https://';
      return url.slice(https.length);
    }

    if (url.startsWith('http://')) {
      const http = 'http://';
      return url.slice(http.length);
    }

    return url;
  }

  const domain = removeHttp(websiteUrl);
  const logoSrc = `https://logo.clearbit.com/${domain}?size=150`;
  const fallbackSrc = logoUrl || '';

  const [imgSrc, setImgSrc] = useState(logoSrc);

  return (
    <Image
      src={imgSrc}
      alt={`Logo of ${name} compatible with React Native`}
      width={150}
      height={150}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}

export default ApiCardLogo;
