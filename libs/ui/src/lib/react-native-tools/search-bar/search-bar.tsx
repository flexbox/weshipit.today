export interface SearchBarProps {
  searchTerm: string;
  handleChange: (e: any) => void;
}

export function SearchBar({ searchTerm, handleChange }: SearchBarProps) {
  return (
    <input
      value={searchTerm}
      onChange={handleChange}
      type="search"
      name="seach"
      id="seach"
      className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      placeholder="Search"
    />
  );
}

export default SearchBar;
