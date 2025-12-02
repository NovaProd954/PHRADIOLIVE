import React from 'react';
import { Station } from '../types';
import StationCard from './StationCard';
import StationCardSkeleton from './StationCardSkeleton';

interface StationListProps {
  stations: Station[];
  isLoading: boolean;
  onStationSelect: (station: Station) => void;
  currentStationId?: string;
  isPlaying: boolean;
  favorites: string[];
  onToggleFavorite: (stationId: string, e: React.MouseEvent) => void;
}

const StationList: React.FC<StationListProps> = ({ 
  stations, 
  isLoading, 
  onStationSelect, 
  currentStationId, 
  isPlaying, 
  favorites, 
  onToggleFavorite 
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <StationCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (stations.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
            <div className="bg-slate-50 p-6 rounded-full mb-4">
                <svg className="w-12 h-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
            </div>
            <h3 className="text-lg font-heading font-semibold text-slate-700">No stations found</h3>
            <p className="text-slate-500">Try adjusting your search or category filters.</p>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 animate-fade-in">
      {stations.map(station => (
        <StationCard
          key={station.stationuuid}
          station={station}
          onSelect={() => onStationSelect(station)}
          isActive={station.stationuuid === currentStationId}
          isPlaying={isPlaying && station.stationuuid === currentStationId}
          isFavorite={favorites.includes(station.stationuuid)}
          onToggleFavorite={(e) => onToggleFavorite(station.stationuuid, e)}
        />
      ))}
    </div>
  );
};

export default StationList;