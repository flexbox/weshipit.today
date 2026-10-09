import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

const interBold = fetch(
  new URL('../../public/fonts/inter-latin-700-normal.woff', import.meta.url),
).then((res) => res.arrayBuffer());

const MAX_QUOTE_LEN = 220;
const MAX_NAME_LEN = 80;

const clampParam = (value: string | null, max: number): string =>
  (value ?? '').slice(0, max);

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const quote = clampParam(searchParams.get('quote'), MAX_QUOTE_LEN);
    const name = clampParam(searchParams.get('name'), MAX_NAME_LEN);
    const company = clampParam(searchParams.get('company'), MAX_NAME_LEN);

    const [interBoldData] = await Promise.all([interBold]);

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: '#F9FAFB',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
            padding: '80px',
            width: '100%',
          }}
        >
          <div
            style={{
              color: '#111827',
              fontFamily: 'Inter, sans-serif',
              fontSize: quote.length > 120 ? '3rem' : '4rem',
              fontWeight: 'bold',
              lineHeight: 1.2,
            }}
          >
            {quote ? `“${quote}”` : 'weshipit.today'}
          </div>
          <div
            style={{
              color: '#2563EB',
              display: 'flex',
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.75rem',
              marginTop: '48px',
            }}
          >
            {[name, company].filter(Boolean).join(' · ')}
          </div>
        </div>
      ),
      {
        fonts: [
          {
            data: interBoldData,
            name: 'Inter',
            style: 'normal',
            weight: 400,
          },
          {
            data: interBoldData,
            name: 'Inter',
            style: 'normal',
            weight: 700,
          },
        ],
        height: 630,
        width: 1200,
      },
    );
  } catch (e: any) {
    console.error(`${e.message}`);

    return new Response(`Failed to generate the og image`, {
      status: 500,
    });
  }
}
