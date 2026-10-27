import { detectFramework, FrameworkDetection } from './detect-framework';
import { RemoteZip } from './remote-zip';

// APKPure mobile API: returns the latest version metadata (protobuf) with a
// direct download URL that supports Range requests.
const APKPURE_API = 'https://api.pureapk.com/m/v3/cms/app_version';
const APKPURE_HEADERS = {
  'x-abis': 'arm64-v8a,armeabi-v7a,armeabi',
  'x-cv': '3172501',
  'x-gp': '1',
  'x-sv': '29',
};
// The metadata also lists `/b/TORRENT/` links, which are not ZIP files.
const DOWNLOAD_URL = /https:\/\/download\.pureapk\.com\/b\/X?APK\//;
const TIMEOUT_MS = 15000;

const HTML_ENTITIES: Record<string, string> = {
  '&#39;': "'",
  '&amp;': '&',
  '&gt;': '>',
  '&lt;': '<',
  '&quot;': '"',
};

function decodeEntities(value: string) {
  return value.replace(
    /&(#39|amp|gt|lt|quot);/g,
    (entity) => HTML_ENTITIES[entity],
  );
}

export interface AndroidAppInspection extends FrameworkDetection {
  packageId: string;
  icon: string | null;
  name: string | null;
}

export class AppNotFoundError extends Error {}

async function findDownloadUrl(packageId: string) {
  const response = await fetch(
    `${APKPURE_API}?hl=en-US&package_name=${encodeURIComponent(packageId)}`,
    { headers: APKPURE_HEADERS, signal: AbortSignal.timeout(TIMEOUT_MS) },
  );
  if (!response.ok) {
    throw new Error(`APK mirror responded with ${response.status}`);
  }

  const body = new Uint8Array(await response.arrayBuffer());
  const text = new TextDecoder('latin1').decode(body);
  const start = text.search(DOWNLOAD_URL);
  if (start === -1) {
    throw new AppNotFoundError(packageId);
  }

  // Protobuf strings are prefixed with their varint length (1 or 2 bytes
  // for a URL), which tells us exactly where the URL ends.
  const last = body[start - 1];
  const beforeLast = body[start - 2];
  const length = beforeLast & 0x80 ? (beforeLast & 0x7f) | (last << 7) : last;

  return text.slice(start, start + length);
}

async function listAllEntries(url: string) {
  const zip = await RemoteZip.open(url);
  const entries = await zip.list();

  // XAPK bundles: base APK + split APKs. Native libraries live in the ABI
  // split, so skip density and language splits.
  const nestedApks = entries.filter(
    (entry) =>
      entry.name.endsWith('.apk') &&
      !entry.name.includes('/') &&
      (!entry.name.startsWith('config.') ||
        /^config\.(arm|x86)/.test(entry.name)),
  );

  const nested = await Promise.all(
    nestedApks.map(async (apk) => {
      try {
        const inner = await zip.listNested(apk);
        return inner.map((entry) => `${apk.name}!${entry.name}`);
      } catch {
        return [];
      }
    }),
  );

  return [...entries.map((entry) => entry.name), ...nested.flat()];
}

async function fetchStoreListing(packageId: string) {
  try {
    const response = await fetch(
      `https://play.google.com/store/apps/details?id=${encodeURIComponent(
        packageId,
      )}&hl=en&gl=US`,
      { signal: AbortSignal.timeout(TIMEOUT_MS) },
    );
    if (!response.ok) {
      return { icon: null, name: null };
    }
    const html = await response.text();
    const meta = (property: string) =>
      html.match(
        new RegExp(`<meta property="og:${property}" content="([^"]+)"`),
      )?.[1] ?? null;

    const title = meta('title');

    return {
      icon: meta('image'),
      name: title
        ? decodeEntities(title).replace(/ - Apps on Google Play$/, '')
        : null,
    };
  } catch {
    return { icon: null, name: null };
  }
}

export async function inspectAndroidApp(
  packageId: string,
): Promise<AndroidAppInspection> {
  const [listing, entries] = await Promise.all([
    fetchStoreListing(packageId),
    findDownloadUrl(packageId).then(listAllEntries),
  ]);

  return {
    ...listing,
    ...detectFramework(entries),
    packageId,
  };
}
