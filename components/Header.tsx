import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

interface HeaderProps {
  mode: 'morning' | 'night';
  onToggleMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ mode, onToggleMode }) => {
  return (
    <header className={`sticky top-0 z-30 border-b backdrop-blur-2xl ${mode === 'morning' ? 'bg-white/35 border-emerald-100/60' : 'bg-black/35 border-white/15'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-16 sm:h-20 flex items-center justify-between">
        <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="h-9 w-auto sm:h-11 transition-transform duration-300 group-hover:scale-105">
            <LogoIcon className="h-full w-auto drop-shadow-sm" />
          </div>
          <h1 className="font-heading text-xl sm:text-2xl font-bold tracking-tight flex items-baseline gap-1.5 select-none">
            <span className="text-emerald-500">PH Radio</span>
            <span className={mode === 'morning' ? 'text-slate-700' : 'text-white/90'}>Live</span>
          </h1>
        </div>

        <button
          onClick={onToggleMode}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition ${mode === 'morning' ? 'text-slate-700 bg-white/70 border-emerald-200/60 hover:bg-white' : 'text-white bg-white/10 border-white/20 hover:bg-white/20'}`}
        >
          {mode === 'morning' ? 'Night Mode' : 'Morning Mode'}
        </button>
      </div>
    </header>
  );
};

export default Header;
