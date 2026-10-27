/**
 * @jest-environment node
 */
import { parseLatestVersion } from './apkpure';

const encoder = new TextEncoder();

function concat(parts: Uint8Array[]) {
  const bytes = new Uint8Array(
    parts.reduce((size, part) => size + part.length, 0),
  );
  let offset = 0;
  for (const part of parts) {
    bytes.set(part, offset);
    offset += part.length;
  }
  return bytes;
}

function varint(value: number) {
  const bytes: number[] = [];
  while (value >= 0x80) {
    bytes.push(value % 0x80 | 0x80);
    value = Math.floor(value / 0x80);
  }
  bytes.push(value);
  return new Uint8Array(bytes);
}

/** A length-delimited protobuf field: a string or a nested message. */
function field(number: number, ...values: (Uint8Array | string)[]) {
  const value = concat(
    values.map((part) =>
      typeof part === 'string' ? encoder.encode(part) : part,
    ),
  );
  return concat([varint(number * 8 + 2), varint(value.length), value]);
}

const DOWNLOAD_URL =
  'https://download.pureapk.com/b/XAPK/Y29tLmRpc2NvcmQ?_fn=RGlzY29yZA&k=0e64';
const ICON_URL =
  'https://image.winudf.com/v2/image1/Y29tLmRpc2NvcmRfaWNvbg/icon.png?w=100&fakeurl=1';

function version(packageId: string, downloadUrl: string) {
  return field(
    2,
    field(1, 'Discord'),
    field(2, 'Discord'),
    field(4, packageId),
    // A varint (size) and a fixed64 (rating), skipped by the parser.
    new Uint8Array([0x78, 0x01, 0xb9, 0x01, 0, 0, 0, 0, 0, 0, 0x11, 0x40]),
    field(24, field(1, '2026-10-29'), field(8, 'XAPK'), field(9, downloadUrl)),
    field(27, field(1, field(1, ICON_URL))),
  );
}

function response(...versions: Uint8Array[]) {
  return field(
    1,
    field(7, field(1, new Uint8Array([0x10, 0x01])), field(2, ...versions)),
  );
}

describe('parseLatestVersion', () => {
  it('reads the download link, name and icon of the latest version', () => {
    expect(
      parseLatestVersion(
        response(version('com.discord', DOWNLOAD_URL)),
        'com.discord',
      ),
    ).toEqual({
      downloadUrl: DOWNLOAD_URL,
      icon: ICON_URL.replace('w=100', 'w=128'),
      name: 'Discord',
    });
  });

  it('waits until the first version is complete', () => {
    const latest = version('com.discord', DOWNLOAD_URL);
    const older = version('com.discord', DOWNLOAD_URL);
    const bytes = response(latest, older);
    const latestEnd = bytes.length - older.length;

    expect(
      parseLatestVersion(bytes.subarray(0, latestEnd - 1), 'com.discord'),
    ).toBeNull();
    expect(
      parseLatestVersion(bytes.subarray(0, latestEnd), 'com.discord'),
    ).toMatchObject({ downloadUrl: DOWNLOAD_URL });
  });

  it('skips versions that only have a torrent link', () => {
    const torrent = DOWNLOAD_URL.replace('/b/XAPK/', '/b/TORRENT/');
    const apk = DOWNLOAD_URL.replace('/b/XAPK/', '/b/APK/');

    expect(
      parseLatestVersion(
        response(version('com.discord', torrent), version('com.discord', apk)),
        'com.discord',
      ),
    ).toMatchObject({ downloadUrl: apk });
  });

  it('ignores other apps', () => {
    expect(
      parseLatestVersion(
        response(version('com.discord.other', DOWNLOAD_URL)),
        'com.discord',
      ),
    ).toBeNull();
  });
});
