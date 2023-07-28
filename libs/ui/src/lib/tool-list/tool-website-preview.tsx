import Image from 'next/image';

export interface ToolWebsitePreviewProps {
  url: string;
  accessKey: string;
}

export function ToolWebsitePreview({
  url,
  accessKey,
}: ToolWebsitePreviewProps) {
  const logoSrc = `https://api.apiflash.com/v1/urltoimage?access_key=${accessKey}&wait_until=page_loaded&url=${url}`;

  return (
    <div className="rounded-lg bg-slate-200 ring-1 ring-gray-300 dark:bg-slate-900">
      {url && (
        <Image
          src={logoSrc}
          alt={`Preview of ${url}`}
          width={900}
          height={500}
          className="rounded-lg"
        />
      )}
    </div>
  );
}

export default ToolWebsitePreview;
