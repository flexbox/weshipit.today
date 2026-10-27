/**
 * Lists the files inside a remote ZIP (APK / XAPK) with HTTP Range requests,
 * reading only the central directory instead of downloading the archive.
 * A 50 MB app typically costs a few hundred KB.
 */

const END_OF_CENTRAL_DIRECTORY = 0x06054b50;
const CENTRAL_DIRECTORY_ENTRY = 0x02014b50;
const ZIP64_MARKER = 0xffffffff;
// EOCD record (22 bytes) + max comment length (65535 bytes).
const MAX_TAIL = 65557;
const STORED = 0;
const TIMEOUT_MS = 15000;

export interface ZipEntry {
  name: string;
  method: number;
  compressedSize: number;
  localHeaderOffset: number;
}

export class RemoteZip {
  private constructor(
    private readonly url: string,
    readonly size: number,
  ) {}

  static async open(url: string) {
    const response = await fetch(url, {
      headers: { Range: 'bytes=0-0' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    await response.arrayBuffer();

    const contentRange = response.headers.get('content-range');
    if (response.status !== 206 || !contentRange) {
      throw new Error('The download server does not support range requests');
    }

    return new RemoteZip(url, Number(contentRange.split('/')[1]));
  }

  async read(start: number, end: number) {
    const response = await fetch(this.url, {
      headers: { Range: `bytes=${start}-${end}` },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (response.status !== 206) {
      throw new Error(`Range request failed with status ${response.status}`);
    }
    return new DataView(await response.arrayBuffer());
  }

  /** Lists a ZIP stored at `[start, start + length)` of the remote file. */
  async list(start = 0, length = this.size): Promise<ZipEntry[]> {
    const tailLength = Math.min(MAX_TAIL, length);
    const tail = await this.read(
      start + length - tailLength,
      start + length - 1,
    );

    const eocd = findEndOfCentralDirectory(tail);
    const directorySize = tail.getUint32(eocd + 12, true);
    const directoryOffset = tail.getUint32(eocd + 16, true);
    if (directorySize === ZIP64_MARKER || directoryOffset === ZIP64_MARKER) {
      throw new Error('ZIP64 archives are not supported');
    }

    const directory = await this.read(
      start + directoryOffset,
      start + directoryOffset + directorySize - 1,
    );
    return parseCentralDirectory(directory);
  }

  /** Lists a ZIP stored uncompressed inside this one (split APKs in an XAPK). */
  async listNested(entry: ZipEntry) {
    if (entry.method !== STORED) {
      throw new Error(
        `${entry.name} is compressed and cannot be read in place`,
      );
    }
    const header = await this.read(
      entry.localHeaderOffset,
      entry.localHeaderOffset + 29,
    );
    const dataStart =
      entry.localHeaderOffset +
      30 +
      header.getUint16(26, true) +
      header.getUint16(28, true);

    return this.list(dataStart, entry.compressedSize);
  }
}

function findEndOfCentralDirectory(tail: DataView) {
  for (let offset = tail.byteLength - 22; offset >= 0; offset--) {
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
