import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

const interBold = fetch(
  new URL('../../public/fonts/inter-latin-700-normal.woff', import.meta.url),
).then((res) => res.arrayBuffer());

const MAX_TITLE_LEN = 200;
const clampParam = (value: string | null, max: number): string =>
  (value ?? '').slice(0, max);

// Slack, iMessage and others show a small square thumbnail cropped from the
// center of the 1200×630 image, so the title must fit in the middle square.
const SAFE_ZONE_WIDTH = 560;

const fontSizeFor = (title: string): number => {
  if (title.length <= 20) return 80;
  if (title.length <= 40) return 64;
  if (title.length <= 70) return 52;
  if (title.length <= 110) return 42;
  return 34;
};

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawTitle = searchParams.get('title');
    const title = rawTitle
      ? clampParam(rawTitle, MAX_TITLE_LEN)
      : 'weshipit.today';

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
              display: 'flex',
              justifyContent: 'center',
              width: SAFE_ZONE_WIDTH,
              fontSize: fontSizeFor(title),
              lineHeight: 1.15,
              textAlign: 'center',
              color: '#111827', // slate-900
              fontFamily: 'Inter, sans-serif',
              fontWeight: 'bold',
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
