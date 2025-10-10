import { extractDomainName } from '@weshipit/utils';
import Image from 'next/image';

export interface CompanyLogoProps {
  name: string;
  size?: number;
  websiteUrl: string;
}

export function CompanyLogo({
  name,
  size = 128,
  websiteUrl,
}: CompanyLogoProps) {
  const domain = extractDomainName(websiteUrl);
  // hardcoding this to avoid hydration issues
  const logoSrc = `https://img.logo.dev/${domain}?token=pk_ZE1YkhrvTcm58ijPUqyebA&retina=true`;

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

export default CompanyLogo;
