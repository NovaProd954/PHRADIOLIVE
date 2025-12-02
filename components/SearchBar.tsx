import React from 'react';
import { SearchIcon } from './icons/SearchIcon';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative group">
      <div className="relative flex items-center">
        <div className="absolute left-4 text-slate-400 group-focus-within:text-ph-blue transition-colors duration-300">
             <SearchIcon className="h-5 w-5" />
        </div>
        <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Find a station..."
            className="w-full pl-12 pr-4 py-3.5 bg-white text-slate-800 rounded-2xl shadow-soft border border-transparent focus:border-ph-blue/20 focus:ring-4 focus:ring-ph-blue/5 focus:outline-none placeholder-slate-400 font-medium transition-all duration-300 hover:shadow-md"
            aria-label="Search stations"
        />
      </div>
    </div>
  );
};

export default SearchBar;