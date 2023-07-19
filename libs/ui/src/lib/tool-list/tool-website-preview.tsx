import Image from 'next/image';

export interface ToolWebsitePreviewProps {
  url: string;
}

export function ToolWebsitePreview(props: ToolWebsitePreviewProps) {
  const { url } = props;
  const logoSrc = `https://api.apiflash.com/v1/urltoimage?access_key=${process.env['APIFLASH_ACCESS_KEY']}&wait_until=page_loaded&url=${url}`;

  return (
    <div className="rounded-lg bg-slate-200 dark:bg-slate-900">
      <Image
        src={logoSrc}
        alt={`Preview of ${url}`}
        width={900}
        height={500}
        className="rounded-lg"
      />
    </div>
  );
}

export default ToolWebsitePreview;
