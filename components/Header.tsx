import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-100/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-16 sm:h-20 flex items-center justify-between">
        <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="h-9 w-auto sm:h-11 transition-transform duration-300 group-hover:scale-105">
            <LogoIcon className="h-full w-auto drop-shadow-sm" />
          </div>
          <h1 className="font-heading text-xl sm:text-2xl font-bold tracking-tight flex items-baseline gap-1.5 select-none">
            <span className="text-ph-blue">PH Radio</span>
            <span className="text-ph-red">Live</span>
          </h1>
        </div>
        
        {/* Optional Right Side: Could be a settings icon or profile placeholder later */}
        <div className="hidden sm:block">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-ph-blue to-ph-red opacity-10"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;