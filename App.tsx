import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Station } from './types';
import { fetchPhilippineStations } from './services/radioApi';
import { CATEGORIES } from './constants';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryFilters from './components/CategoryFilters';
import StationList from './components/StationList';
import AudioPlayer from './components/AudioPlayer';
import StationDetailOverlay from './components/StationDetailOverlay';

export default function App(): React.ReactElement {
  const [stations, setStations] = useState<Station[]>([]);
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [volume, setVolume] = useState<number>(1);
  const [bgError, setBgError] = useState<boolean>(false);
  const [mode, setMode] = useState<'morning' | 'night'>(() => {
    try {
      const saved = localStorage.getItem('ph_radio_mode');
      return saved === 'night' ? 'night' : 'morning';
    } catch (e) {
      console.error('Failed to read mode from local storage', e);
      return 'morning';
    }
  });
  
  // Initialize favorites from localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ph_radio_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse favorites from local storage", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ph_radio_mode', mode);
    } catch (e) {
      console.error('Failed to save mode to local storage', e);
    }
  }, [mode]);

  useEffect(() => {
    const loadStations = async () => {
      try {
        setIsLoading(true);
        const fetchedStations = await fetchPhilippineStations();
        setStations(fetchedStations);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadStations();
  }, []);

  const handleOpenStation = useCallback((station: Station) => {
    setSelectedStation(station);
    if (currentStation?.stationuuid !== station.stationuuid) {
      setCurrentStation(station);
      setIsPlaying(true);
    }
  }, [currentStation]);

  const handleCloseStation = useCallback(() => {
    setSelectedStation(null);
  }, []);

  const handlePlayPause = useCallback(() => {
    if (currentStation) {
      setIsPlaying(prev => !prev);
    }
  }, [currentStation]);

  const handlePlay = useCallback(() => {
    if (currentStation) setIsPlaying(true);
  }, [currentStation]);

  const handlePause = useCallback(() => {
    if (currentStation) setIsPlaying(false);
  }, [currentStation]);

  const handleToggleFavorite = useCallback((stationId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    setFavorites(prev => {
      const newFavorites = prev.includes(stationId)
        ? prev.filter(id => id !== stationId)
        : [...prev, stationId];
      
      localStorage.setItem('ph_radio_favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const filteredStations = useMemo(() => {
    return stations
      .filter(station => {
        if (activeCategory === 'All') return true;
        if (activeCategory === 'Favorites') return favorites.includes(station.stationuuid);
        
        const categoryKeywords = CATEGORIES.find(c => c.name === activeCategory)?.keywords || [];
        const stationTags = (station.tags || '').toLowerCase().split(',');
        return categoryKeywords.some(keyword => stationTags.includes(keyword));
      })
      .filter(station => {
        const query = searchQuery.toLowerCase();
        return (
          station.name.toLowerCase().includes(query) ||
          (station.tags || '').toLowerCase().includes(query) ||
          (station.language || '').toLowerCase().includes(query)
        );
      });
  }, [stations, searchQuery, activeCategory, favorites]);

  return (
    <div className="min-h-screen font-sans selection:bg-ph-yellow/60">
        {/* Background Layer (Z-Index: 0) */}
        <div className={`fixed inset-0 z-0 w-full h-full overflow-hidden ${mode === 'morning' ? 'bg-white' : 'bg-slate-950'}`}>
            {/* The Background Image - Full Opacity with Fallback */}
            {!bgError && (
              <img 
                  src="/background.webp" 
                  alt="Background" 
                  className={`w-full h-full object-cover object-center opacity-100 transition-opacity duration-500 ${mode === 'night' ? 'brightness-40 saturate-90 contrast-110' : 'contrast-105'}`} 
                  onError={() => setBgError(true)}
              />
            )}
            
            {/* Minimal Overlay - just enough to ensure text doesn't blend if image is busy */}
            <div className={`absolute inset-0 ${bgError ? (mode === 'morning' ? 'bg-slate-50' : 'bg-black') : (mode === 'morning' ? 'bg-white/35 backdrop-blur-[2px]' : 'bg-slate-950/60 backdrop-blur-[2px]')}`}></div>
        </div>

        {/* Content Layer (Z-Index: 10) */}
        <div className="relative z-10 flex flex-col min-h-screen">
            <Header mode={mode} onToggleMode={() => setMode(prev => prev === 'morning' ? 'night' : 'morning')} />
            
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex-grow pt-8">
                
                {/* Search & Filter Section */}
                <div className="space-y-8 mb-10">
                    <div className="max-w-2xl mx-auto">
                        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} mode={mode} />
                    </div>
                    <CategoryFilters activeCategory={activeCategory} setActiveCategory={setActiveCategory} mode={mode} />
                </div>

                {/* Error State */}
                {error && (
                    <div className="max-w-lg mx-auto mb-8 p-4 bg-red-50 border border-red-100 rounded-xl text-center">
                        <p className="text-ph-red font-medium">{error}</p>
                    </div>
                )}

                {/* Main Content */}
                <div className="pb-32">
                    <div className="flex items-center justify-between mb-6 px-1">
                        <h2 className={`text-xl font-heading font-black uppercase tracking-tight backdrop-blur-xl inline-block px-4 py-2 border-2 shadow-[5px_5px_0_rgba(0,0,0,0.14)] ${mode === 'morning' ? 'text-white bg-ph-blue/90 border-ph-yellow' : 'text-ph-yellow bg-ph-blue/80 border-ph-red'}`}>
                            {activeCategory === 'All' ? 'All Stations' : activeCategory}
                        </h2>
                        <span className={`text-sm font-black uppercase backdrop-blur px-3 py-2 shadow-[4px_4px_0_rgba(0,0,0,0.12)] border-2 ${mode === 'morning' ? 'text-ph-red bg-white/85 border-ph-red/40' : 'text-white bg-slate-950/80 border-ph-yellow/70'}`}>
                            {filteredStations.length} Stations
                        </span>
                    </div>

                    <StationList
                        stations={filteredStations}
                        isLoading={isLoading}
                        onStationSelect={handleOpenStation}
                        currentStationId={currentStation?.stationuuid}
                        isPlaying={isPlaying}
                        favorites={favorites}
                        onToggleFavorite={handleToggleFavorite}
                    />
                </div>
            </main>
        </div>
      
        {/* Floating Player (Z-Index: 40) */}
        {currentStation && (
            <div className="relative z-40">
                <AudioPlayer
                mode={mode}
                station={currentStation}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onPlay={handlePlay}
                onPause={handlePause}
                volume={volume}
                />
            </div>
        )}

        {/* Full Screen Overlay (Z-Index: 50) */}
        {selectedStation && (
            <StationDetailOverlay
            mode={mode}
            station={selectedStation}
            onClose={handleCloseStation}
            isPlaying={isPlaying && currentStation?.stationuuid === selectedStation.stationuuid}
            onPlayPause={handlePlayPause}
            volume={volume}
            setVolume={setVolume}
            isFavorite={favorites.includes(selectedStation.stationuuid)}
            onToggleFavorite={() => handleToggleFavorite(selectedStation.stationuuid)}
            />
        )}
    </div>
  );
}