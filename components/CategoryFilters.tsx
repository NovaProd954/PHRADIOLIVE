import React from 'react';
import { CATEGORIES } from '../constants';

interface CategoryFiltersProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ activeCategory, setActiveCategory }) => {
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
                    ? 'bg-gradient-to-r from-ph-blue to-ph-blue text-white shadow-md shadow-blue-900/10 scale-105' 
                    : 'bg-white text-slate-600 border border-slate-100 hover:border-slate-300 hover:bg-slate-50'
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