import Image from 'next/image';

interface BrowserFrameProps {
  imageUrl: string;
  alt: string;
  aspectRatio: string;
  url?: string;
}

export function BrowserFrame({
  imageUrl,
  alt,
  aspectRatio,
  url = 'example.com',
}: BrowserFrameProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-white shadow-md">
      <svg
        viewBox="0 0 800 44"
        preserveAspectRatio="none"
        className="block h-11 w-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="800" height="44" fill="#f1f3f5" />
        <circle cx="22" cy="22" r="6" fill="#ff5f57" />
        <circle cx="42" cy="22" r="6" fill="#febc2e" />
        <circle cx="62" cy="22" r="6" fill="#28c840" />
        <rect
          x="160"
          y="12"
          width="480"
          height="20"
          rx="10"
          fill="#ffffff"
          stroke="#e0e0e0"
        />
        <text
          x="400"
          y="26"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontSize="11"
          fill="#6b7280"
        >
          {url}
        </text>
      </svg>
      <div style={{ aspectRatio }} className="relative bg-muted">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 64rem, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
