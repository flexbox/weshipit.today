import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const hasTitle = searchParams.has('title');
    const title = hasTitle ? searchParams.get('title') : 'weshipit.today';

    return new ImageResponse(
      (
        <div className="flex h-full w-full flex-col items-center justify-center bg-white text-center">
          <div className="absolute bottom-0 right-0 flex p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="weshipit.today - logo"
              src="https://raw.githubusercontent.com/flexbox/weshipit.today/main/apps/weshipit/public/android-chrome-192x192.png"
              className="h-24 w-24"
            />
          </div>
          <div className="font-inter text-5xl">{title}</div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
