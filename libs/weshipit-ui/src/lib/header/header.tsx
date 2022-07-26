import Link from 'next/link';

export function Header() {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <h2 className="text-2xl font-bold">
                weshipit<span className="text-gray-400">.today</span>
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
