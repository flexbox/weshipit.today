import { NextRequest, NextResponse } from 'next/server';

/**
 * Old tool links carried the Airtable record id (`?id=rec…`), which Google
 * indexed as duplicates of the clean page. Send them to the slug URL.
 * The matcher only runs this when an `id` query param is present.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.search = '';
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: [
    {
      has: [{ key: 'id', type: 'query' }],
      source: '/react-native-tools/:slug',
    },
  ],
};
