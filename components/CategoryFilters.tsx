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
                px-5 py-2 text-sm font-black uppercase tracking-wide border-2 transition-all duration-200 select-none
                ${isActive 
                    ? 'bg-ph-blue text-white border-ph-yellow shadow-[4px_4px_0_rgba(206,17,38,0.35)] scale-105' 
                    : mode === 'morning' ? 'bg-white/85 text-ph-blue border-ph-blue/30 hover:border-ph-red hover:bg-ph-yellow/30' : 'bg-slate-950/75 text-white/85 border-white/20 hover:border-ph-yellow hover:bg-ph-blue/40'
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