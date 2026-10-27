import { findLatestVersion } from './apkpure';
import { detectFramework, FrameworkDetection } from './detect-framework';
import { RemoteZip } from './remote-zip';

export { AppNotFoundError } from './apkpure';

// An XAPK lists a handful of files. An APK can list thousands: 1 MB holds the
// central directory of nearly every app and costs one round trip, like 64 KB.
const XAPK_TAIL = 128 * 1024;
const APK_TAIL = 1024 * 1024;

export interface AndroidAppInspection extends FrameworkDetection {
  packageId: string;
  icon: string | null;
  name: string | null;
}

async function listAllEntries(url: string) {
  const zip = await RemoteZip.open(
    url,
    url.includes('/b/XAPK/') ? XAPK_TAIL : APK_TAIL,
  );

  // XAPK bundles: base APK + split APKs. Native libraries live in the ABI
  // split, so skip density and language splits.
  const nestedApks = zip.entries.filter(
    (entry) =>
      entry.name.endsWith('.apk') &&
      !entry.name.includes('/') &&
      (!entry.name.startsWith('config.') ||
        /^config\.(arm|x86)/.test(entry.name)),
  );

  const nested = await Promise.all(
    nestedApks.map(async (apk) => {
      try {
        const inner = await zip.listNested(apk, APK_TAIL);
        return inner.map((entry) => `${apk.name}!${entry.name}`);
      } catch {
        return [];
      }
    }),
  );

  return [...zip.entries.map((entry) => entry.name), ...nested.flat()];
}

export async function inspectAndroidApp(
  packageId: string,
): Promise<AndroidAppInspection> {
  const { downloadUrl, icon, name } = await findLatestVersion(packageId);
  const entries = await listAllEntries(downloadUrl);

  return {
    icon,
    name,
    ...detectFramework(entries),
    packageId,
  };
}
