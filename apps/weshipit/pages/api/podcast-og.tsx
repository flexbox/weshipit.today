import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

const interSemiBold = fetch(
  new URL(
    'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-600-normal.woff',
    import.meta.url,
  ),
).then((res) => res.arrayBuffer());

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
    const hasGuest = searchParams.has('guest');
    const hasEpisodeNumber = searchParams.has('episode');
    const hasType = searchParams.has('type');

    const title = hasTitle
      ? searchParams.get('title')
      : 'Le Cross Platform Show';
    const guest = hasGuest ? searchParams.get('guest') : '';
    const episodeNumber = hasEpisodeNumber ? searchParams.get('episode') : '';
    const type = hasType ? searchParams.get('type') : 'podcast';

    const [interSemiBoldData, interBoldData] = await Promise.all([
      interSemiBold,
      interBold,
    ]);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f172a',
            backgroundImage:
              'linear-gradient(45deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '60px',
              left: '60px',
              width: '200px',
              height: '200px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '4px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <img
              src="https://weshipit.today/images/podcast.jpeg"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              alt="Podcast cover"
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              marginLeft: '320px',
              marginRight: '60px',
              maxWidth: '760px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              {episodeNumber && (
                <div
                  style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '18px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                  }}
                >
                  Épisode {episodeNumber}
                </div>
              )}
              {type === 'transcript' && (
                <div
                  style={{
                    backgroundColor: '#10b981',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '18px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                  }}
                >
                  Transcript
                </div>
              )}
            </div>
            <div
              style={{
                fontSize: title && title.length > 50 ? '36px' : '48px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.2,
                marginBottom: '16px',
                textAlign: 'left',
              }}
            >
              {title}
            </div>

            {/* Guest */}
            {guest && (
              <div
                style={{
                  fontSize: '24px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  color: '#e2e8f0',
                  marginBottom: '24px',
                }}
              >
                avec {guest}
              </div>
            )}
            <div
              style={{
                fontSize: '20px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>🎙️</span>
              Le Cross Platform Show
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '100px',
              background:
                'linear-gradient(to top, rgba(15, 23, 42, 0.8), transparent)',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: interSemiBoldData,
            style: 'normal',
            weight: 600,
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
    return new Response(`Failed to generate the podcast og image`, {
      status: 500,
    });
  }
}
