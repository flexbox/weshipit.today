/**
 * Lists the files inside a remote ZIP (APK / XAPK) with HTTP Range requests,
 * reading only the central directory instead of downloading the archive.
 * A 50 MB app typically costs a few hundred KB.
 *
 * Each listing is a single round trip: the tail we read is large enough to
 * hold the central directory of most apps, and a round trip costs about the
 * same for 1 MB as for 64 KB.
 */

const END_OF_CENTRAL_DIRECTORY = 0x06054b50;
const CENTRAL_DIRECTORY_ENTRY = 0x02014b50;
const ZIP64_MARKER = 0xffffffff;
const EOCD_SIZE = 22;
const MAX_COMMENT = 65535;
const LOCAL_HEADER_SIZE = 30;
const STORED = 0;
const TIMEOUT_MS = 15000;

export interface ZipEntry {
  compressedSize: number;
  localHeaderOffset: number;
  method: number;
  name: string;
}

/** Bytes `[start, start + view.byteLength)` of a remote file. */
interface Chunk {
  size: number;
  start: number;
  url: string;
  view: DataView;
}

async function fetchRange(url: string, range: string): Promise<Chunk> {
  const response = await fetch(url, {
    headers: { Range: `bytes=${range}` },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const contentRange = response.headers
    .get('content-range')
    ?.match(/^bytes (\d+)-\d+\/(\d+)$/);

  if (response.status !== 206 || !contentRange) {
    await response.body?.cancel();
    throw new Error(`Range request failed with status ${response.status}`);
  }

  return {
    size: Number(contentRange[2]),
    start: Number(contentRange[1]),
    // Download links redirect to a CDN: keep the final URL to skip the hop.
    url: response.url || url,
    view: new DataView(await response.arrayBuffer()),
  };
}

export class RemoteZip {
  private constructor(
    private readonly url: string,
    readonly entries: ZipEntry[],
    private readonly directoryStart: number,
  ) {}

  /** Lists the archive from its last `tailSize` bytes. */
  static async open(url: string, tailSize: number) {
    const tail = await fetchRange(url, `-${tailSize}`);
    const { directoryStart, entries } = await listZip(tail, 0, tail.size);

    return new RemoteZip(tail.url, entries, directoryStart);
  }

  /** Lists a ZIP stored uncompressed inside this one (split APKs in an XAPK). */
  async listNested(entry: ZipEntry, tailSize: number) {
    if (entry.method !== STORED) {
      throw new Error(
        `${entry.name} is compressed and cannot be read in place`,
      );
    }

    // The nested ZIP ends where the next entry (or the central directory)
    // starts, so its tail can be read in parallel with its local header.
    const next = this.entries.reduce(
      (bound, { localHeaderOffset }) =>
        localHeaderOffset > entry.localHeaderOffset && localHeaderOffset < bound
          ? localHeaderOffset
          : bound,
      this.directoryStart,
    );
    const [header, guessedTail] = await Promise.all([
      fetchRange(
        this.url,
        `${entry.localHeaderOffset}-${
          entry.localHeaderOffset + LOCAL_HEADER_SIZE - 1
        }`,
      ),
      fetchRange(
        this.url,
        `${Math.max(entry.localHeaderOffset, next - tailSize)}-${next - 1}`,
      ),
    ]);

    const start =
      entry.localHeaderOffset +
      LOCAL_HEADER_SIZE +
      header.view.getUint16(26, true) +
      header.view.getUint16(28, true);
    const end = start + entry.compressedSize;
    const tail =
      end <= next && end - EOCD_SIZE >= guessedTail.start
        ? guessedTail
        : await fetchRange(
            this.url,
            `${Math.max(start, end - tailSize)}-${end - 1}`,
          );

    return (await listZip(tail, start, end)).entries;
  }
}

/** Lists the ZIP stored at `[start, end)` of a file whose tail is `tail`. */
async function listZip(tail: Chunk, start: number, end: number) {
  const eocd = findEndOfCentralDirectory(tail.view, end - tail.start);
  const directorySize = tail.view.getUint32(eocd + 12, true);
  const directoryOffset = tail.view.getUint32(eocd + 16, true);
  if (directorySize === ZIP64_MARKER || directoryOffset === ZIP64_MARKER) {
    throw new Error('ZIP64 archives are not supported');
  }

  const directoryStart = start + directoryOffset;
  const directory =
    directoryStart >= tail.start
      ? new DataView(
          tail.view.buffer,
          tail.view.byteOffset + directoryStart - tail.start,
          directorySize,
        )
      : (
          await fetchRange(
            tail.url,
            `${directoryStart}-${directoryStart + directorySize - 1}`,
          )
        ).view;

  return { directoryStart, entries: parseCentralDirectory(directory) };
}

/** Finds the EOCD record of a ZIP that ends at `end` in `tail`. */
function findEndOfCentralDirectory(tail: DataView, end: number) {
  const last = Math.max(0, end - EOCD_SIZE - MAX_COMMENT);
  for (let offset = end - EOCD_SIZE; offset >= last; offset--) {
    if (tail.getUint32(offset, true) === END_OF_CENTRAL_DIRECTORY) {
      return offset;
    }
  }
  throw new Error('Not a ZIP archive');
}

const decoder = new TextDecoder();

function parseCentralDirectory(directory: DataView) {
  const entries: ZipEntry[] = [];
  let offset = 0;

  while (
    offset + 46 <= directory.byteLength &&
    directory.getUint32(offset, true) === CENTRAL_DIRECTORY_ENTRY
  ) {
    const nameLength = directory.getUint16(offset + 28, true);
    const extraLength = directory.getUint16(offset + 30, true);
    const commentLength = directory.getUint16(offset + 32, true);

    entries.push({
      compressedSize: directory.getUint32(offset + 20, true),
      localHeaderOffset: directory.getUint32(offset + 42, true),
      method: directory.getUint16(offset + 10, true),
      name: decoder.decode(
        new Uint8Array(
          directory.buffer,
          directory.byteOffset + offset + 46,
          nameLength,
        ),
      ),
    });

    offset += 46 + nameLength + extraLength + commentLength;
  }

  return entries;
}
