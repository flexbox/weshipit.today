import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get('title') || 'Le Cross Platform Show';
    const guest = searchParams.get('guest') || '';
    const episodeNumber = searchParams.get('episode') || '';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: '60px',
          }}
        >
          <img
            src="https://weshipit.today/images/podcast.jpeg"
            style={{
              width: '280px',
              height: '280px',
              marginRight: '60px',
              border: '4px solid #e5e7eb',
              objectFit: 'cover',
            }}
            alt="Podcast cover"
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              flex: 1,
              maxWidth: '700px',
            }}
          >
            <div
              style={{
                fontSize: '2.5rem',
                textAlign: 'center',
                color: '#111827', // slate-900
                fontWeight: '900',
                marginBottom: '16px',
                textShadow:
                  '1px 1px 0px #111827, -1px -1px 0px #111827, 1px -1px 0px #111827, -1px 1px 0px #111827',
                letterSpacing: '+0.025em',
              }}
            >
              LE CROSS PLATFORM SHOW
            </div>

            <div
              style={{
                fontSize: title && title.length > 50 ? '32px' : '40px',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '20px',
              }}
            >
              {title}
            </div>

            <div
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#6b7280',
                marginBottom: '20px',
              }}
            >
              {episodeNumber && guest
                ? `Épisode ${episodeNumber} avec ${guest}`
                : episodeNumber
                  ? `Épisode ${episodeNumber}`
                  : guest
                    ? `avec ${guest}`
                    : 'Podcast'}
            </div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 },
    );
  } catch (e: any) {
    console.error(`${e.message}`);
    return new Response(`Failed to generate the podcast og image`, {
      status: 500,
    });
  }
}
