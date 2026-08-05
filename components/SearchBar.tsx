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
            className={`w-full pl-12 pr-4 py-3.5 border-2 focus:ring-4 focus:ring-ph-yellow/30 focus:outline-none placeholder-slate-400 font-medium transition-all duration-300 ${mode === 'morning' ? 'bg-white/85 text-slate-900 border-ph-blue/60 shadow-[6px_6px_0_rgba(0,56,168,0.12)] focus:border-ph-red' : 'bg-slate-950/80 text-white border-ph-yellow/70 shadow-[6px_6px_0_rgba(252,209,22,0.12)] focus:border-ph-red'}`} 
            aria-label="Search stations"
        />
      </div>
    </div>
  );
};

export default SearchBar;