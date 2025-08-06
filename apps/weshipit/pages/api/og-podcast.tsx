import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { podcastEpisodes } from '../../fixtures/podcast-episodes.fixture';

export const config = {
  runtime: 'edge',
};

const interBold = fetch(
  new URL(
    'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-700-normal.woff',
    import.meta.url,
  ),
).then((res) => res.arrayBuffer());

const interRegular = fetch(
  new URL(
    'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-400-normal.woff',
    import.meta.url,
  ),
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return new Response('Missing slug parameter', { status: 400 });
    }

    const episode = podcastEpisodes.find((ep) => ep.slug === slug);
    if (!episode) {
      return new Response('Episode not found', { status: 404 });
    }
    const [interBoldData, interRegularData] = await Promise.all([
      interBold,
      interRegular,
    ]);

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            backgroundColor: '#F8FAFC', // slate-50
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
            }}
          />

          {/* Main content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              height: '100%',
              padding: '60px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                maxWidth: '700px',
                marginRight: '40px',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: '#3B82F6',
                  color: '#FFFFFF',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '24px',
                  alignSelf: 'flex-start',
                }}
              >
                Épisode {episode.number}
              </div>
              <h1
                style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#1E293B',
                  margin: '0 0 16px 0',
                  lineHeight: '1.2',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {episode.name}
              </h1>
              <p
                style={{
                  fontSize: '24px',
                  color: '#64748B',
                  margin: '0 0 24px 0',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                avec {episode.guestName}
              </p>
              <p
                style={{
                  fontSize: '20px',
                  color: '#475569',
                  margin: '0',
                  lineHeight: '1.5',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {episode.description}
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '32px',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#3B82F6',
                    borderRadius: '50%',
                    marginRight: '12px',
                  }}
                />
                <span
                  style={{
                    fontSize: '18px',
                    color: '#64748B',
                    fontWeight: 'bold',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  weshipit.today
                </span>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '200px',
                height: '200px',
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                boxShadow:
                  '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <img
                src={episode.companyLogo}
                alt={`Logo ${episode.name}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: interRegularData,
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
    return new Response(`Failed to generate the podcast og image`, {
      status: 500,
    });
  }
}
