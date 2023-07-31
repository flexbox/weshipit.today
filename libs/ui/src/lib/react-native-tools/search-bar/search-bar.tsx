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
      className="block w-full rounded-full border-0 px-4 py-1.5 text-slate-900 shadow-sm ring-2 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
      placeholder="Search for a description or tool name"
    />
  );
}

export default SearchBar;
