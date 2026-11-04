const RETURN_TO_KEY = 'workshop:returnTo';
export const DEFAULT_RETURN_TO = '/workshop/profile';

const AUTH_PATHS = ['/workshop/login', '/workshop/auth/callback'];

function isSafeReturnTo(path: string | null): path is string {
  if (!path) return false;
  // Same-site workshop paths only: no protocol-relative or external URLs.
  if (!path.startsWith('/workshop') || path.startsWith('//')) return false;
  return !AUTH_PATHS.some((authPath) => path.startsWith(authPath));
}

export function saveReturnTo(path: string) {
  if (isSafeReturnTo(path)) localStorage.setItem(RETURN_TO_KEY, path);
}

export function consumeReturnTo(): string {
  const path = localStorage.getItem(RETURN_TO_KEY);
  localStorage.removeItem(RETURN_TO_KEY);
  return isSafeReturnTo(path) ? path : DEFAULT_RETURN_TO;
}
