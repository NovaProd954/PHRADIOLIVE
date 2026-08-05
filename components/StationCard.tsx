import React, { useState } from 'react';
import { Station } from '../types';
import { RadioIcon } from './icons/RadioIcon';
import { StarIcon } from './icons/StarIcon';

interface StationCardProps {
  station: Station;
  onSelect: (station: Station) => void;
  isActive: boolean;
  isPlaying: boolean;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

const StationCard: React.FC<StationCardProps> = ({ station, onSelect, isActive, isPlaying, isFavorite, onToggleFavorite }) => {
  const [imgError, setImgError] = useState(false);

  // Clean and limit tags for display
  const primaryTag = (station.tags || '').split(',')[0]?.trim() || 'Radio';

  return (
    <div
      className={`
        group relative flex flex-col bg-white/95 overflow-hidden transition-all duration-300 cursor-pointer border-2
        ${isActive 
            ? 'border-ph-red shadow-[8px_8px_0_rgba(0,56,168,0.25)]' 
            : 'border-ph-blue/25 shadow-[6px_6px_0_rgba(0,0,0,0.08)] hover:shadow-[8px_8px_0_rgba(252,209,22,0.45)] hover:-translate-y-1 hover:border-ph-blue'
        }
      `}
      onClick={() => onSelect(station)}
    >
      {/* Top Image Section */}
      <div className="relative aspect-square w-full p-6 bg-white flex items-center justify-center">
        {/* Subtle background for logo area */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,56,168,0.08)_0_33%,rgba(252,209,22,0.12)_33%_66%,rgba(206,17,38,0.08)_66%)] opacity-100"></div>

        {/* Favorite Button (Top Right) */}
        <button 
            className={`
                absolute top-3 right-3 p-1.5 z-20 border-2 border-white transition-all duration-200
                ${isFavorite 
                    ? 'text-ph-yellow bg-ph-blue opacity-100' 
                    : 'text-slate-300 bg-transparent opacity-0 group-hover:opacity-100 hover:bg-slate-100 hover:text-ph-yellow'
                }
            `}
            onClick={onToggleFavorite}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
            <StarIcon className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Status Indicator (Top Left) */}
        {isActive && isPlaying && (
            <div className="absolute top-3 left-3 z-20 flex gap-0.5 h-3 items-end">
                 <div className="w-1 bg-ph-blue animate-[bounce_1s_infinite]"></div>
                 <div className="w-1 bg-ph-red animate-[bounce_1.2s_infinite]"></div>
                 <div className="w-1 bg-ph-blue animate-[bounce_0.8s_infinite]"></div>
            </div>
        )}

        {/* Logo */}
        <div className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
            {!imgError && station.favicon ? (
            <img
                src={station.favicon}
                alt={`${station.name} logo`}
                className="max-w-full max-h-full object-contain drop-shadow-sm"
                onError={() => setImgError(true)}
                loading="lazy"
            />
            ) : (
            <RadioIcon className="w-16 h-16 text-slate-200" />
            )}
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col p-4 pt-3 border-t-2 border-ph-blue/15 bg-white flex-grow">
        <div className="mb-1 flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-ph-blue bg-ph-yellow/40 px-2 py-1 border border-ph-yellow">
                {primaryTag}
            </span>
        </div>
        <h3 className={`font-heading font-bold text-sm leading-tight line-clamp-2 mb-1 ${isActive ? 'text-ph-red' : 'text-slate-800'}`}>
            {station.name}
        </h3>
        <p className="text-xs text-slate-500 mt-auto truncate">
            {station.state || 'Philippines'}
        </p>
      </div>
    </div>
  );
};

export default StationCard;