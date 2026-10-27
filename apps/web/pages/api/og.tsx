import type { NextApiRequest, NextApiResponse } from 'next';
import { ImageResponse } from 'next/og';
import { clampParam, loadFont, sendImage } from '../../utils/og/og-server';

// "Title block" template from the weshipit blueprint design system: big
// Space Grotesk title on a light engineering grid, with an architect-plan
// strip along the bottom (project, page, language).

const BACKGROUND = '#F8FAFC';
const INK = '#0A1E3C';
const CYAN = '#0FA3C7';
const GRID = 'rgba(214, 226, 240, 0.8)';
const RULE = '#D6E2F0';
const MUTED = '#4A5D78';
const LABEL = '#6B7F99';

const MAX_TITLE_LEN = 200;
const MAX_KICKER_LEN = 60;
const MAX_SUBLINE_LEN = 120;
const MAX_PATH_LEN = 48;

const fontSizeFor = (title: string): number => {
  if (title.length <= 22) return 108;
  if (title.length <= 40) return 90;
  if (title.length <= 60) return 72;
  if (title.length <= 90) return 60;
  return 48;
};

const mono = (size: number, color: string) => ({
  color,
  fontFamily: 'JetBrains Mono',
  fontSize: size,
  letterSpacing: size * 0.08,
  textTransform: 'uppercase' as const,
});

function StripCell({
  label,
  value,
  width,
}: {
  label: string;
  value: string;
  width?: number;
}) {
  return (
    <div
      style={{
        borderLeft: `1.5px solid ${RULE}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 28px',
        // satori throws on `width: undefined`, so only set it when given.
        ...(width ? { width } : { flexGrow: 1 }),
      }}
    >
      <div style={{ ...mono(12, LABEL), marginBottom: 6 }}>{label}</div>
      {/* URL paths are case-sensitive, so values keep their case. */}
      <div
        style={{
          color: INK,
          fontFamily: 'JetBrains Mono',
          fontSize: 18,
          letterSpacing: 0.5,
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const title =
      clampParam(req.query.title, MAX_TITLE_LEN) || 'weshipit.today';
    const kicker = clampParam(req.query.kicker, MAX_KICKER_LEN);
    const subline = clampParam(req.query.subline, MAX_SUBLINE_LEN);
    const path = clampParam(req.query.path, MAX_PATH_LEN) || '/';
    const lang = clampParam(req.query.lang, 2) === 'fr' ? 'FR' : 'EN';
    const fontSize = fontSizeFor(title);

    const [spaceGrotesk, monoRegular, monoBold, interMedium] =
      await Promise.all([
        loadFont('space-grotesk-latin-700-normal.woff'),
        loadFont('jetbrains-mono-latin-400-normal.woff'),
        loadFont('jetbrains-mono-latin-700-normal.woff'),
        loadFont('inter-latin-500-normal.woff'),
      ]);

    const image = new ImageResponse(
      (
        <div
          style={{
            backgroundColor: BACKGROUND,
            backgroundImage: `linear-gradient(${GRID} 1px, transparent 1px), linear-gradient(90deg, ${GRID} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
          }}
        >
          <div
            style={{
              borderLeft: `10px solid ${CYAN}`,
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              justifyContent: 'center',
              padding: '0 88px',
            }}
          >
            {kicker ? (
              <div
                style={{
                  ...mono(18, CYAN),
                  fontWeight: 700,
                  marginBottom: 26,
                }}
              >
                {kicker}
              </div>
            ) : null}
            <div
              style={{
                color: INK,
                fontFamily: 'Space Grotesk',
                fontSize,
                fontWeight: 700,
                letterSpacing: -fontSize * 0.025,
                lineHeight: 1.04,
                maxWidth: 1000,
              }}
            >
              {title}
            </div>
            {subline ? (
              <div
                style={{
                  color: MUTED,
                  fontFamily: 'Inter',
                  fontSize: 28,
                  fontWeight: 500,
                  marginTop: 26,
                }}
              >
                {subline}
              </div>
            ) : null}
          </div>
          <div
            style={{
              backgroundColor: BACKGROUND,
              borderTop: `2px solid ${INK}`,
              display: 'flex',
              height: 92,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '0 28px',
                width: 380,
              }}
            >
              <div style={{ ...mono(12, LABEL), marginBottom: 6 }}>Project</div>
              <div
                style={{
                  color: INK,
                  fontFamily: 'JetBrains Mono',
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                weshipit.today
              </div>
            </div>
            <StripCell label="Page" value={path} />
            <StripCell label="Lang" value={lang} width={180} />
          </div>
        </div>
      ),
      {
        fonts: [
          {
            data: spaceGrotesk,
            name: 'Space Grotesk',
            style: 'normal',
            weight: 700,
          },
          {
            data: monoRegular,
            name: 'JetBrains Mono',
            style: 'normal',
            weight: 400,
          },
          {
            data: monoBold,
            name: 'JetBrains Mono',
            style: 'normal',
            weight: 700,
          },
          { data: interMedium, name: 'Inter', style: 'normal', weight: 500 },
        ],
        height: 630,
        width: 1200,
      },
    );

    await sendImage(res, image);
  } catch (e) {
    console.error(e);
    res.status(500).send('Failed to generate the og image');
  }
}
