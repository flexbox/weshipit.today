/**
 * Finds the latest APK of an app on the APKPure mobile API, with a direct
 * download URL that supports Range requests.
 *
 * The response is protobuf and lists every version (up to 600 KB), newest
 * first. We stop reading as soon as the first version is complete, a few KB
 * in, and parse it without the schema.
 */

const API_URL = 'https://api.pureapk.com/m/v3/cms/app_version';
const API_HEADERS = {
  'x-abis': 'arm64-v8a,armeabi-v7a,armeabi',
  'x-cv': '3172501',
  'x-gp': '1',
  'x-sv': '29',
};
// Versions also list `/b/TORRENT/` links, which are not ZIP files.
const DOWNLOAD_URL = /^https:\/\/download\.pureapk\.com\/b\/X?APK\//;
const ICON_URL = /^https:\/\/image\.winudf\.com\/.+\/icon\.png/;
// Version message fields: 1 is the app name, 4 the package id.
const NAME_FIELD = 1;
const PACKAGE_FIELD = 4;
const MAX_DEPTH = 8;
const MAX_BYTES = 256 * 1024;
// Icons are shown at 64 px: 128 px stays sharp on 2x screens.
const ICON_WIDTH = 128;
const TIMEOUT_MS = 15000;

export interface AppVersion {
  downloadUrl: string;
  icon: string | null;
  name: string | null;
}

export class AppNotFoundError extends Error {}

export async function findLatestVersion(
  packageId: string,
): Promise<AppVersion> {
  const response = await fetch(
    `${API_URL}?hl=en-US&package_name=${encodeURIComponent(packageId)}`,
    { headers: API_HEADERS, signal: AbortSignal.timeout(TIMEOUT_MS) },
  );
  if (!response.ok || !response.body) {
    throw new Error(`APK mirror responded with ${response.status}`);
  }

  const reader = response.body.getReader();
  let bytes = new Uint8Array(0);
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (value) {
        const joined = new Uint8Array(bytes.length + value.length);
        joined.set(bytes);
        joined.set(value, bytes.length);
        bytes = joined;
      }

      const version = parseLatestVersion(bytes, packageId);
      if (version) return version;
      if (done || bytes.length > MAX_BYTES) {
        throw new AppNotFoundError(packageId);
      }
    }
  } finally {
    reader.cancel().catch(() => undefined);
  }
}

/**
 * Reads the first complete version of `packageId` that has a download URL.
 * `bytes` may be the truncated start of the response.
 */
export function parseLatestVersion(
  bytes: Uint8Array,
  packageId: string,
): AppVersion | null {
  for (const version of findVersions(readFields(bytes), packageId, 0)) {
    const strings = [...allStrings(version, 0)];
    const downloadUrl = strings.find((value) => DOWNLOAD_URL.test(value));
    if (!downloadUrl) continue;

    const name = version.find((field) => field.number === NAME_FIELD);
    const icon = strings.find((value) => ICON_URL.test(value));

    return {
      downloadUrl,
      icon: icon?.replace(/([?&]w=)\d+/, `$1${ICON_WIDTH}`) ?? null,
      name: name ? decode(name.value) : null,
    };
  }
  return null;
}

interface Field {
  /** False when the field runs past the end of the truncated response. */
  complete: boolean;
  number: number;
  value: Uint8Array;
}

const decoder = new TextDecoder();

function decode(value: Uint8Array) {
  return decoder.decode(value);
}

function* findVersions(
  fields: Field[],
  packageId: string,
  depth: number,
): Generator<Field[]> {
  for (const field of fields) {
    const inner = readFields(field.value);
    const isVersion = inner.some(
      ({ number, value }) =>
        number === PACKAGE_FIELD && decode(value) === packageId,
    );

    if (isVersion && field.complete) {
      yield inner;
    } else if (!isVersion && depth < MAX_DEPTH) {
      yield* findVersions(inner, packageId, depth + 1);
    }
  }
}

/** Every complete length-delimited value, in order, at any depth. */
function* allStrings(fields: Field[], depth: number): Generator<string> {
  for (const field of fields) {
    if (!field.complete) return;
    yield decode(field.value);
    if (depth < MAX_DEPTH)
      yield* allStrings(readFields(field.value), depth + 1);
  }
}

/**
 * The length-delimited fields of a protobuf message, which may be strings or
 * nested messages. Stops at the first byte that is not valid protobuf, which
 * is how a string parsed as a message ends.
 */
function readFields(bytes: Uint8Array): Field[] {
  const fields: Field[] = [];
  let offset = 0;

  while (offset < bytes.length) {
    const key = readVarint(bytes, offset);
    if (!key || key.value < 8) break;
    offset = key.next;

    const wireType = key.value % 8;
    if (wireType === 0) {
      const value = readVarint(bytes, offset);
      if (!value) break;
      offset = value.next;
    } else if (wireType === 1) {
      offset += 8;
    } else if (wireType === 5) {
      offset += 4;
    } else if (wireType === 2) {
      const length = readVarint(bytes, offset);
      if (!length) break;
      const end = length.next + length.value;
      fields.push({
        complete: end <= bytes.length,
        number: Math.floor(key.value / 8),
        value: bytes.subarray(length.next, end),
      });
      offset = end;
    } else {
      break;
    }
  }

  return fields;
}

function readVarint(bytes: Uint8Array, offset: number) {
  let value = 0;
  for (let shift = 0; shift < 64 && offset < bytes.length; shift += 7) {
    const byte = bytes[offset++];
    value += (byte & 0x7f) * 2 ** shift;
    if (byte < 0x80) return { next: offset, value };
  }
  return null;
}
