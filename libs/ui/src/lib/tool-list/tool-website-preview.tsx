import Image from 'next/image';

/* eslint-disable-next-line */
export interface ToolWebsitePreviewProps {
  url: string;
}

export function ToolWebsitePreview(props: ToolWebsitePreviewProps) {
  const { url } = props;
  const logoSrc = `https://api.apiflash.com/v1/urltoimage?access_key=${process.env['APIFLASH_ACCESS_KEY']}&wait_until=page_loaded&url=${url}`;

  return (
    <Image
      src={logoSrc}
      alt={`Preview of ${url}`}
      width={3000}
      height={300}
      loading="lazy"
      className="rounded-lg"
    />
  );
}

export default ToolWebsitePreview;
