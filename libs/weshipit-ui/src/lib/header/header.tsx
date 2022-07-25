export function Header() {
  return (
    <div className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <h2 className="text-2xl font-bold">
                weshipit<span className="text-gray-400">.today</span>
              </h2>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
