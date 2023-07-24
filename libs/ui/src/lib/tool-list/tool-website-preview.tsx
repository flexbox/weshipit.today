import Image from 'next/image';

export interface ToolWebsitePreviewProps {
  url: string;
  accessKey: string;
}

export function ToolWebsitePreview({
  url,
  accessKey,
}: ToolWebsitePreviewProps) {
  console.log('file: tool-website-preview.tsx:12 ~ accessKey:', accessKey);
  const logoSrc = `https://api.apiflash.com/v1/urltoimage?access_key=${accessKey}&wait_until=page_loaded&url=${url}`;

  return (
    <div className="rounded-lg bg-slate-200 dark:bg-slate-900">
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
