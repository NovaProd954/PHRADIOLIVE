import React from 'react';
import { CATEGORIES } from '../constants';

interface CategoryFiltersProps {
  mode: 'morning' | 'night';
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ activeCategory, setActiveCategory, mode }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      {CATEGORIES.map(({ name }) => {
        const isActive = activeCategory === name;
        return (
            <button
            key={name}
            onClick={() => setActiveCategory(name)}
            className={`
                px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 select-none
                ${isActive 
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-950/20 scale-105' 
                    : mode === 'morning' ? 'bg-white/60 text-slate-700 border border-white/50 hover:bg-white' : 'bg-white/10 text-white/80 border border-white/15 hover:bg-white/20'
                }
            `}
            >
            {name}
            </button>
        );
      })}
    </div>
  );
};

export default CategoryFilters;