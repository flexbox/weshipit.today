/**
 * Ids and slugs are interpolated into blob pathnames, so they must never
 * contain `/` or `.` — otherwise a crafted value could read or overwrite a
 * blob outside its prefix.
 */
const SAFE_KEY = /^[a-z0-9][a-z0-9-]{0,127}$/i;

export function isSafeKey(value: string): boolean {
  return SAFE_KEY.test(value);
}

/** Uploads are pinned to `testimonials/media/<id>/(audio|photo).<ext>`. */
const MEDIA_PATHNAME =
  /^testimonials\/media\/[a-z0-9-]{1,128}\/(audio|photo)\.[a-z0-9]{1,5}$/i;

export function isMediaPathname(value: string): boolean {
  return MEDIA_PATHNAME.test(value);
}
