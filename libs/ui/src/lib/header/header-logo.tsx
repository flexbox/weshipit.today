import Link from 'next/link';
import { useRouter } from 'next/router';

/** The wordmark. A right-click opens the brand page with the logo assets. */
export function HeaderLogo() {
  const router = useRouter();

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/brand');
  };

  return (
    <Link
      href="/"
      className="-m-1.5 p-1.5 text-lg font-bold leading-6 dark:text-white"
      onContextMenu={handleContextMenu}
    >
      weshipit<span className="text-slate-400">.today</span>
    </Link>
  );
}
