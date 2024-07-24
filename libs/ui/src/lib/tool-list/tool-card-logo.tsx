import { extractDomainName } from '@weshipit/utils';
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
  const domain = extractDomainName(websiteUrl);
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
