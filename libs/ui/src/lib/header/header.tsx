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
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <div className="text-2xl font-bold">
                weshipit<span className="text-gray-400">.today</span>
              </div>
            </Link>
          </div>
          {withAccessoryRight && (
            <div className="flex justify-end lg:w-0 lg:flex-1">
              {accessoryRight}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
