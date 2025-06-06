import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

const interBold = fetch(
  new URL(
    'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-700-normal.woff',
    import.meta.url,
  ),
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hasTitle = searchParams.has('title');
    const title = hasTitle ? searchParams.get('title') : 'weshipit.today';

    // Load the fonts
    const [interBoldData] = await Promise.all([interBold]);

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
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: interBoldData,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Inter',
            data: interBoldData,
            style: 'normal',
            weight: 700,
          },
        ],
      },
    );
  } catch (e: any) {
    console.error(`${e.message}`);
    return new Response(`Failed to generate the og image`, {
      status: 500,
    });
  }
}
