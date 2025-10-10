import trimEnd from 'lodash/trimEnd';

function removeHttp(url: string): string {
  const urlTrimmed = trimEnd(url, '/');

  if (urlTrimmed.startsWith('https://')) {
    const https = 'https://';
    return urlTrimmed.slice(https.length);
  }

  if (urlTrimmed.startsWith('http://')) {
    const http = 'http://';
    return urlTrimmed.slice(http.length);
  }
  return urlTrimmed;
}

/**
 * Transforms https://expo.dev/ to expo.dev to call an image from https://logo.dev
 * @param url
 * @returns domain without the slash and the rest of the url
 */
export function extractDomainName(url: string | null) {
  if (url === null) {
    return null;
  }

  const domain = removeHttp(url);
  if (domain.includes('/')) {
    const domainParts = domain.split('/');
    return domainParts[0];
  }
  if (domain.split('.').length > 2) {
    if (domain.endsWith('org')) {
      return domain;
    }

    const domainParts = domain.split('.');
    return `${domainParts[1]}.${domainParts[2]}`;
  }

  const domainParts = domain.split('/');
  return domainParts[0];
}

export default extractDomainName;
