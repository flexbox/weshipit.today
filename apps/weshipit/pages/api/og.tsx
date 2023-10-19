/* eslint-disable tailwindcss/no-custom-classname */
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hasTitle = searchParams.has('title');
    const title = hasTitle ? searchParams.get('title') : 'weshipit.today';

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}
        >
          <div
            style={{
              fontSize: '5rem',
              textAlign: 'center',
            }}
          >
            {title}
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              display: 'flex',
              padding: '1rem',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="weshipit.today - logo"
              src="https://raw.githubusercontent.com/flexbox/weshipit.today/main/apps/weshipit/public/android-chrome-192x192.png"
              style={{ height: '6rem', width: '6rem' }}
            />
          </div>
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
