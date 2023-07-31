import Image from 'next/image';

export interface ToolCardLogoProps {
  name: string;
  websiteUrl: string;
  size?: number;
}

export function ToolCardLogo({
  websiteUrl,
  name,
  size = 100,
}: ToolCardLogoProps) {
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

  /**
   * Transforms https://expo.dev/ to expo.dev to call an image from logo.clearbit.com
   * @param url
   * @returns
   */
  function deleteAfterSlash(url: string) {
    const domain = removeHttp(url);
    const domainParts = domain.split('/');
    return domainParts[0];
  }

  const domain = deleteAfterSlash(websiteUrl);
  const logoSrc = `https://logo.clearbit.com/${domain}?size=${size}`;

  return (
    <Image
      src={logoSrc}
      alt={`Logo of ${name} compatible with React Native`}
      width={size}
      height={size}
      loading="lazy"
      className="rounded-xl"
    />
  );
}

export default ToolCardLogo;
