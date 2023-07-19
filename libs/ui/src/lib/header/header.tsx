import Link from 'next/link';

interface HeaderProps {
  withAccessoryRight?: boolean;
  accessoryRight?: React.ReactNode;
}

export function Header({
  withAccessoryRight = false,
  accessoryRight,
}: HeaderProps) {
  return (
    <header className="bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between py-6 md:flex-row  md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <div className="text-2xl font-bold dark:text-white">
                weshipit<span className="text-gray-400">.today</span>
              </div>
            </Link>
          </div>
          {withAccessoryRight && (
            <div className="mt-4 flex justify-end md:mt-0 lg:w-0 lg:flex-1">
              {accessoryRight}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
