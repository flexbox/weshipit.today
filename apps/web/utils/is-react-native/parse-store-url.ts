const PACKAGE_ID = /^[a-zA-Z][\w]*(\.[a-zA-Z_][\w]*)+$/;

export type ParsedStoreUrl =
  | { packageId: string; platform: 'android' }
  | { error: 'invalid' | 'ios-not-supported' };

export function isValidPackageId(value: string) {
  return value.length <= 255 && PACKAGE_ID.test(value);
}

/**
 * Accepts a Google Play link (any locale, with or without extra params)
 * or a bare package id like `com.planet.centerparcs`.
 */
export function parseStoreUrl(input: string): ParsedStoreUrl {
  const value = input.trim();

  if (isValidPackageId(value)) {
    return { packageId: value, platform: 'android' };
  }

  let url: URL;
  try {
    url = new URL(value.startsWith('http') ? value : `https://${value}`);
  } catch {
    return { error: 'invalid' };
  }

  if (/(^|\.)apps\.apple\.com$|(^|\.)itunes\.apple\.com$/.test(url.hostname)) {
    return { error: 'ios-not-supported' };
  }

  if (url.hostname === 'play.google.com') {
    const id = url.searchParams.get('id');
    if (id && isValidPackageId(id)) {
      return { packageId: id, platform: 'android' };
    }
  }

  return { error: 'invalid' };
}
