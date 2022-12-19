import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const hasTitle = searchParams.has('title');
    const title = hasTitle ? searchParams.get('title') : 'weshipit.today';

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: '#f3f4f6',
            height: '100%',
            width: '100%',
            textAlign: 'center',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              bottom: 0,
              right: 0,
              padding: 16,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="weshipit.today - logo"
              height={96}
              src="https://raw.githubusercontent.com/flexbox/weshipit.today/main/apps/weshipit/public/android-chrome-192x192.png"
              width={96}
            />
          </div>
          <div style={{ fontSize: '64px', fontWeight: 'bolder' }}>{title}</div>
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
