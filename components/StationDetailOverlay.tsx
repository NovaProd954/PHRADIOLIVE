import React, { useState, useEffect } from 'react';
import { Station } from '../types';
import { CloseIcon } from './icons/CloseIcon';
import { BellIcon } from './icons/BellIcon';
import { StarIcon } from './icons/StarIcon';
import { ShareIcon } from './icons/ShareIcon';
import { PlayIcon } from './icons/PlayIcon';
import { PauseIcon } from './icons/PauseIcon';
import { VolumeMuteIcon } from './icons/VolumeMuteIcon';
import { VolumeUpIcon } from './icons/VolumeUpIcon';
import { RadioIcon } from './icons/RadioIcon';
import { CastIcon } from './icons/CastIcon';

interface StationDetailOverlayProps {
  mode: 'morning' | 'night';
  station: Station;
  onClose: () => void;
  isPlaying: boolean;
  onPlayPause: () => void;
  volume: number;
  setVolume: (volume: number) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const LiveClock: React.FC<{ mode: 'morning' | 'night' }> = ({ mode }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const hours = time.getHours() % 12 || 12;
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';

  return (
    <div className={`flex items-baseline font-heading select-none ${mode === 'morning' ? 'text-slate-900' : 'text-white'}`}>
      <span className="text-6xl sm:text-7xl font-bold tracking-tighter">{hours}:{minutes}</span>
      <span className="text-2xl sm:text-3xl font-medium ml-1">{ampm}</span>
    </div>
  );
};

interface StationLogoProps {
    station: Station;
    className?: string;
    isPlaying?: boolean;
}

const StationLogo: React.FC<StationLogoProps> = ({ station, className, isPlaying }) => {
    const [imgError, setImgError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setImgError(false);
        setIsLoading(true);
        if (station.favicon) {
            const img = new Image();
            img.src = station.favicon;
            img.onload = () => setIsLoading(false);
            img.onerror = () => { 
                setIsLoading(false); 
                setImgError(true);
            };
        } else {
            setIsLoading(false);
            setImgError(true);
        }
    }, [station.favicon]);

    const containerClass = className || "w-16 h-16";

    return (
        <div className={`${containerClass} bg-white/85 backdrop-blur-lg flex items-center justify-center overflow-hidden shadow-2xl rounded-[2rem] border border-white/60`}>
            {isLoading ? (
                <div className="w-full h-full bg-slate-50 animate-pulse"></div>
            ) : !imgError && station.favicon ? (
                <img
                    src={station.favicon}
                    alt={`${station.name} logo`}
                    className={`w-full h-full object-contain p-4 sm:p-8 transition-transform duration-700 ${isPlaying ? 'animate-music-pulse' : ''}`}
                />
            ) : (
                <RadioIcon className={`w-1/2 h-1/2 text-slate-300 ${isPlaying ? 'animate-pulse' : ''}`} />
            )}
        </div>
    );
};

const StationDetailOverlay: React.FC<StationDetailOverlayProps> = ({ mode, station, onClose, isPlaying, onPlayPause, volume, setVolume, isFavorite, onToggleFavorite }) => {
  
  // Prevent body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: station.name,
      text: `Listen to ${station.name} live on PH Radio Live!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        const err = error as Error;
        if (err?.name !== "AbortError") {
          console.error('Error sharing:', error);
        }
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("Station link copied to clipboard!");
      } catch (err) {
        console.error('Failed to copy link:', err);
        alert("Sharing is not supported on this device.");
      }
    }
  };

  return (
    <div 
        className={`fixed inset-0 z-50 flex flex-col font-sans animate-fade-in ${mode === 'morning' ? 'text-slate-900' : 'text-white'}`}
        role="dialog"
        aria-modal="true"
    >
        {/* Background Layer */}
        <div className={`absolute inset-0 z-0 overflow-hidden ${mode === 'morning' ? 'bg-white' : 'bg-black'}`}>
            {station.favicon && (
                <img 
                    src={station.favicon} 
                    alt="" 
                    className="w-full h-full object-cover blur-[80px] opacity-40 scale-125 transition-opacity duration-1000" 
                />
            )}
            <div className={`absolute inset-0 backdrop-blur-sm ${mode === 'morning' ? 'bg-white/55' : 'bg-black/45'}`}></div>
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col w-full h-full p-6 sm:p-10 max-w-7xl mx-auto">
            
            {/* Header: Clock & Close Button */}
            <div className="flex justify-between items-start w-full relative">
                {/* Clock */}
                <div className="z-20">
                    <LiveClock mode={mode} />
                </div>

                {/* Centered Close Button */}
                <div className="absolute left-0 right-0 top-0 flex justify-center pointer-events-none">
                     <button 
                        onClick={onClose}
                        className={`pointer-events-auto transition-transform duration-300 hover:rotate-90 hover:scale-110 active:scale-95 ${mode === 'morning' ? 'text-slate-700/80 hover:text-slate-900' : 'text-white/80 hover:text-white'}`}
                        aria-label="Close"
                    >
                        <CloseIcon className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md" />
                    </button>
                </div>
                
                {/* Spacer for right side balance */}
                <div className="w-20"></div>
            </div>

            {/* Main Body */}
            <div className="flex-grow flex flex-col-reverse md:flex-row items-center justify-center gap-12 md:gap-20 pb-10 sm:pb-0">
                
                {/* Left Column: Info & Controls */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-8 sm:space-y-10">
                    
                    {/* Station Text Info */}
                    <div className="space-y-2 animate-slide-up">
                        <h2 className={`font-heading font-bold text-2xl sm:text-3xl md:text-4xl leading-tight drop-shadow-lg ${mode === 'morning' ? 'text-slate-900' : 'text-white'}`}>
                            {station.name}
                        </h2>
                        <p className={`text-lg font-medium ${mode === 'morning' ? 'text-slate-700' : 'text-white/70'}`}>
                            {station.state || station.country || 'Philippines'} 
                            {(station.tags || '').toLowerCase().includes('fm') ? ' - FM Radio' : ''}
                        </p>
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center gap-6 sm:gap-8">
                        <button className={`transition-colors p-2 ${mode === 'morning' ? 'text-slate-600 hover:text-slate-900' : 'text-white/60 hover:text-white'}`} title="Cast to device">
                            <CastIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                        </button>
                        
                        <button className={`transition-colors p-2 ${mode === 'morning' ? 'text-slate-600 hover:text-slate-900' : 'text-white/60 hover:text-white'}`} title="Notifications">
                            <BellIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                        </button>

                        <button 
                            onClick={onPlayPause}
                            className={`group relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 transition-all active:scale-95 ${mode === 'morning' ? 'border-slate-500/30 hover:border-slate-700 hover:bg-white/20' : 'border-white/30 hover:border-white hover:bg-white/10'}`}
                        >
                            {/* Animated ring effect for playing state */}
                            {isPlaying && (
                                <div className="absolute inset-0 rounded-full border border-white/50 animate-ping opacity-50"></div>
                            )}
                            {isPlaying ? (
                                <PauseIcon className="w-8 h-8 fill-current" />
                            ) : (
                                <PlayIcon className="w-8 h-8 fill-current translate-x-0.5" />
                            )}
                        </button>

                        <button 
                            onClick={onToggleFavorite}
                            className={`p-2 transition-colors ${isFavorite ? 'text-ph-yellow' : mode === 'morning' ? 'text-slate-600 hover:text-slate-900' : 'text-white/60 hover:text-white'}`}
                        >
                            <StarIcon className={`w-7 h-7 sm:w-8 sm:h-8 ${isFavorite ? 'fill-current' : ''}`} />
                        </button>

                        <button 
                            onClick={handleShare}
                            className={`transition-colors p-2 ${mode === 'morning' ? 'text-slate-600 hover:text-slate-900' : 'text-white/60 hover:text-white'}`} 
                            title="Share"
                        >
                            <ShareIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                        </button>
                    </div>

                    {/* Volume Slider */}
                    <div className={`w-full max-w-sm flex items-center gap-4 ${mode === 'morning' ? 'text-slate-700' : 'text-white/80'}`}>
                        <VolumeMuteIcon className="w-6 h-6 flex-shrink-0" />
                        <div className="relative flex-grow h-10 flex items-center">
                            <input 
                                type="range" 
                                min="0" 
                                max="1" 
                                step="0.01" 
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="
                                    w-full h-1 rounded-full appearance-none cursor-pointer 
                                    focus:outline-none
                                    [&::-webkit-slider-thumb]:appearance-none
                                    [&::-webkit-slider-thumb]:w-4
                                    [&::-webkit-slider-thumb]:h-4
                                    [&::-webkit-slider-thumb]:rounded-full
                                    [&::-webkit-slider-thumb]:bg-emerald-500
                                    [&::-webkit-slider-thumb]:shadow-lg
                                    [&::-webkit-slider-runnable-track]:bg-transparent
                                    [&::-webkit-slider-thumb]:transition-transform
                                    [&::-webkit-slider-thumb]:hover:scale-125
                                "
                            />
                        </div>
                        <VolumeUpIcon className="w-6 h-6 flex-shrink-0" />
                    </div>

                </div>

                {/* Right Column: Logo */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center animate-scale-in">
                    <StationLogo 
                        station={station} 
                        className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 shadow-2xl" 
                        isPlaying={isPlaying} 
                    />
                    
                    {/* Visual dash indicator from reference image */}
                    <div className={`w-8 h-1 rounded-full mt-12 hidden md:block ${mode === 'morning' ? 'bg-slate-300' : 'bg-white/40'}`}></div>
                </div>

            </div>
        </div>
    </div>
  );
};

export default StationDetailOverlay;