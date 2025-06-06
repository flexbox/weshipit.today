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
            alignItems: 'center',
            backgroundColor: '#F9FAFB', // slate-50
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              fontSize: '5rem',
              textAlign: 'center',
              color: '#111827', // slate-900
              fontFamily: 'Inter, sans-serif',
              fontWeight: 'bold',
              padding: '20px',
            }}
          >
            {title}
          </div>
        </div>
      ),
      {
        height: 549,
        width: 1050,
      },
    );
  } catch (e: any) {
    console.error(`${e.message}`);
    return new Response(`Failed to generate the og image`, {
      status: 500,
    });
  }
}
