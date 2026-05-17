import React from 'react';
import { SearchIcon } from './icons/SearchIcon';

interface SearchBarProps {
  mode: 'morning' | 'night';
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, mode }) => {
  return (
    <div className="relative group">
      <div className="relative flex items-center">
        <div className="absolute left-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors duration-300">
             <SearchIcon className="h-5 w-5" />
        </div>
        <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Find a station..."
            className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border focus:ring-4 focus:ring-emerald-500/10 focus:outline-none placeholder-slate-400 font-medium transition-all duration-300 ${mode === 'morning' ? 'bg-white/55 text-slate-800 border-white/50 shadow-soft focus:border-emerald-400/30' : 'bg-white/10 text-white border-white/20 focus:border-emerald-400/40'}`} 
            aria-label="Search stations"
        />
      </div>
    </div>
  );
};

export default SearchBar;