import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

// Comment for now because `Error: The Edge Function "api/og" size is 1.09 MB and your plan size limit is 1 MB.`
// export const config = {
//   runtime: 'edge',
// };

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
        </div>
      ),
      {
        width: 1050,
        height: 549,
      }
    );
  } catch (e: any) {
    console.error(`${e.message}`);
    return new Response(`Failed to generate the og image`, {
      status: 500,
    });
  }
}
