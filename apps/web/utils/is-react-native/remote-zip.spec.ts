/**
 * @jest-environment node
 */
import { RemoteZip } from './remote-zip';

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

/** Writes an uncompressed ZIP, like the split APKs stored in an XAPK. */
function zip(files: Record<string, Uint8Array | string>, { padding = 0 } = {}) {
  const parts: Uint8Array[] = [];
  const directory: Uint8Array[] = [];
  let offset = 0;

  for (const [name, content] of Object.entries(files)) {
    const data =
      typeof content === 'string' ? encoder.encode(content) : content;
    const nameBytes = encoder.encode(name);

    // `padding` mimics the alignment that zipalign adds to local headers.
    const local = new DataView(
      new ArrayBuffer(30 + nameBytes.length + padding),
    );
    local.setUint32(0, 0x04034b50, true);
    local.setUint32(18, data.length, true);
    local.setUint32(22, data.length, true);
    local.setUint16(26, nameBytes.length, true);
    local.setUint16(28, padding, true);
    new Uint8Array(local.buffer).set(nameBytes, 30);

    const central = new DataView(new ArrayBuffer(46 + nameBytes.length));
    central.setUint32(0, 0x02014b50, true);
    central.setUint32(20, data.length, true);
    central.setUint32(24, data.length, true);
    central.setUint16(28, nameBytes.length, true);
    central.setUint32(42, offset, true);
    new Uint8Array(central.buffer).set(nameBytes, 46);

    parts.push(new Uint8Array(local.buffer), data);
    directory.push(new Uint8Array(central.buffer));
    offset += local.byteLength + data.length;
  }

  const eocd = new DataView(new ArrayBuffer(22));
  eocd.setUint32(0, 0x06054b50, true);
  eocd.setUint16(8, directory.length, true);
  eocd.setUint16(10, directory.length, true);
  eocd.setUint32(12, concat(directory).length, true);
  eocd.setUint32(16, offset, true);

  return concat([...parts, ...directory, new Uint8Array(eocd.buffer)]);
}

/** Serves `file` like a CDN that supports Range requests. */
function serve(file: Uint8Array) {
  const fetchMock = jest.fn(async (_url: string, init: RequestInit) => {
    const range = (init.headers as Record<string, string>).Range;
    const [, from, to] = range.match(/^bytes=(\d*)-(\d*)$/) ?? [];
    const start = from ? Number(from) : Math.max(0, file.length - Number(to));
    const end = from && to ? Number(to) : file.length - 1;

    return new Response(file.slice(start, end + 1), {
      headers: { 'content-range': `bytes ${start}-${end}/${file.length}` },
      status: 206,
    });
  });
  global.fetch = fetchMock as unknown as typeof fetch;
  return fetchMock;
}

const NAMES = (entries: { name: string }[]) => entries.map(({ name }) => name);

describe('RemoteZip', () => {
  it('lists an APK in a single request', async () => {
    const fetchMock = serve(
      zip({
        'AndroidManifest.xml': '<manifest />',
        'assets/index.android.bundle': 'bundle',
        'lib/arm64-v8a/libreactnative.so': 'so',
      }),
    );

    const apk = await RemoteZip.open('https://cdn.test/app.apk', 1024);

    expect(NAMES(apk.entries)).toEqual([
      'AndroidManifest.xml',
      'assets/index.android.bundle',
      'lib/arm64-v8a/libreactnative.so',
    ]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('reads the central directory separately when it is not in the tail', async () => {
    const files = Object.fromEntries(
      Array.from({ length: 50 }, (_, index) => [`res/file-${index}.xml`, 'x']),
    );
    const fetchMock = serve(zip(files));

    const apk = await RemoteZip.open('https://cdn.test/app.apk', 64);

    expect(apk.entries).toHaveLength(50);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('lists the split APKs of an XAPK in one round trip each', async () => {
    const base = zip({
      'META-INF/expo-modules-core_release.kotlin_module': 'expo',
      'assets/index.android.bundle': 'bundle',
    });
    const split = zip(
      { 'lib/arm64-v8a/libreactnative.so': 'so' },
      { padding: 3 },
    );
    const fetchMock = serve(
      zip(
        {
          'com.example.apk': base,
          'config.arm64_v8a.apk': split,
          'manifest.json': '{}',
        },
        { padding: 5 },
      ),
    );

    const xapk = await RemoteZip.open('https://cdn.test/app.xapk', 1024);
    const [baseEntries, splitEntries] = await Promise.all([
      xapk.listNested(xapk.entries[0], 1024),
      xapk.listNested(xapk.entries[1], 1024),
    ]);

    expect(NAMES(baseEntries)).toEqual([
      'META-INF/expo-modules-core_release.kotlin_module',
      'assets/index.android.bundle',
    ]);
    expect(NAMES(splitEntries)).toEqual(['lib/arm64-v8a/libreactnative.so']);
    // One tail for the XAPK, then a local header and a tail per split APK,
    // fetched in parallel.
    expect(fetchMock).toHaveBeenCalledTimes(5);
  });

  it('refuses compressed split APKs', async () => {
    serve(zip({ 'com.example.apk': zip({ 'a.txt': 'a' }) }));
    const xapk = await RemoteZip.open('https://cdn.test/app.xapk', 1024);

    await expect(
      xapk.listNested({ ...xapk.entries[0], method: 8 }, 1024),
    ).rejects.toThrow('compressed');
  });
});
