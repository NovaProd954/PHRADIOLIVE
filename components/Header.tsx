import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

interface HeaderProps {
  mode: 'morning' | 'night';
  onToggleMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ mode, onToggleMode }) => {
  return (
    <header className={`sticky top-0 z-30 border-b-4 backdrop-blur-xl ${mode === 'morning' ? 'bg-white/90 border-ph-blue' : 'bg-slate-950/90 border-ph-red'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-16 sm:h-20 flex items-center justify-between">
        <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="h-9 w-auto sm:h-11 transition-transform duration-300 group-hover:translate-x-0.5">
            <LogoIcon className="h-full w-auto drop-shadow-sm" />
          </div>
          <h1 className="font-heading text-xl sm:text-2xl font-black tracking-tight flex items-stretch gap-0 select-none uppercase">
            <span className="bg-ph-blue text-white px-2 py-1">PH Radio</span>
            <span className="bg-ph-red text-white px-2 py-1">Live</span>
          </h1>
        </div>

        <button
          onClick={onToggleMode}
          className={`px-4 py-2 text-xs font-black uppercase tracking-wide border-2 shadow-[4px_4px_0_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 ${mode === 'morning' ? 'text-ph-blue bg-ph-yellow border-ph-blue hover:bg-white' : 'text-ph-yellow bg-ph-blue border-ph-yellow hover:bg-ph-red'}`}
        >
          {mode === 'morning' ? 'Night Mode' : 'Morning Mode'}
        </button>
      </div>
    </header>
  );
};

export default Header;
