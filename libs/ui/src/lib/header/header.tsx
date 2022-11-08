import { Button } from '@weshipit/ui';
import Link from 'next/link';

interface HeaderProps {
  withButton?: boolean;
  buttonHref?: string;
}

export function Header({ withButton = false, buttonHref = '' }: HeaderProps) {
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
          {withButton && (
            <div className="flex justify-end lg:w-0 lg:flex-1">
              <Button href={buttonHref}>Add a new API</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
