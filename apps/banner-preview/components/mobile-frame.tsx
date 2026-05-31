interface MobileFrameProps {
  imageUrl: string;
  alt: string;
  aspectRatio: string;
}

const PHONE_WIDTH = 260;
const PHONE_HEIGHT = 560;
const BEZEL = 12;
const SCREEN_TOP = 44;

export function MobileFrame({ imageUrl, alt, aspectRatio }: MobileFrameProps) {
  return (
    <div
      className="relative mx-auto overflow-hidden"
      style={{ width: PHONE_WIDTH, height: PHONE_HEIGHT / 2 }}
    >
      <svg
        viewBox={`0 0 ${PHONE_WIDTH} ${PHONE_HEIGHT}`}
        className="absolute inset-x-0 top-0"
        width={PHONE_WIDTH}
        height={PHONE_HEIGHT}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="2"
          y="2"
          width={PHONE_WIDTH - 4}
          height={PHONE_HEIGHT - 4}
          rx="36"
          fill="#111827"
        />
        <rect
          x={BEZEL}
          y={BEZEL}
          width={PHONE_WIDTH - BEZEL * 2}
          height={PHONE_HEIGHT - BEZEL * 2}
          rx="28"
          fill="#000000"
        />
        <rect
          x={PHONE_WIDTH / 2 - 35}
          y="14"
          width="70"
          height="20"
          rx="10"
          fill="#111827"
        />
      </svg>

      <div
        className="absolute overflow-hidden bg-muted"
        style={{
          left: BEZEL,
          right: BEZEL,
          top: SCREEN_TOP,
          borderRadius: 6,
          aspectRatio,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt={alt} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}
