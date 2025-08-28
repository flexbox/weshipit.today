import { extractDomainName } from '@weshipit/utils';
import Image from 'next/image';

export interface ToolCardLogoProps {
  name: string;
  size?: number;
  websiteUrl: string;
}

export function ToolCardLogo({
  name,
  size = 100,
  websiteUrl,
}: ToolCardLogoProps) {
  const domain = extractDomainName(websiteUrl);
  const logoSrc = `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;

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
