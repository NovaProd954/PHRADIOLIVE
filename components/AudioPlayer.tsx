import React, { useRef, useEffect, useState } from 'react';
import { Station } from '../types';
import { PlayIcon } from './icons/PlayIcon';
import { PauseIcon } from './icons/PauseIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { RadioIcon } from './icons/RadioIcon';

interface AudioPlayerProps {
  mode: 'morning' | 'night';
  station: Station;
  isPlaying: boolean;
  onPlayPause: () => void;
  onPlay: () => void;
  onPause: () => void;
  volume: number;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ mode, station, isPlaying, onPlayPause, volume }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isBuffering, setIsBuffering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false); 
  }, [station.stationuuid]);

  // Media Session API Support
  useEffect(() => {
    if ('mediaSession' in navigator) {
      // Update metadata
      navigator.mediaSession.metadata = new MediaMetadata({
        title: station.name,
        artist: station.state || station.country || 'PH Radio Live',
        album: 'Philippine Radio Live',
        artwork: station.favicon ? [
            { src: station.favicon, sizes: '96x96', type: 'image/png' },
            { src: station.favicon, sizes: '128x128', type: 'image/png' },
            { src: station.favicon, sizes: '192x192', type: 'image/png' },
            { src: station.favicon, sizes: '256x256', type: 'image/png' },
            { src: station.favicon, sizes: '384x384', type: 'image/png' },
            { src: station.favicon, sizes: '512x512', type: 'image/png' },
        ] : []
      });

      // Update action handlers
      navigator.mediaSession.setActionHandler('play', onPlay);
      navigator.mediaSession.setActionHandler('pause', onPause);
      navigator.mediaSession.setActionHandler('stop', onPause);
    }
  }, [station, onPlay, onPause]);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => {
        setIsBuffering(false)
        setError(null);
    };
    const handleError = (e: Event) => {
        setIsBuffering(false);
        setError("Unavailable");
        console.error("Audio Error:", e);
    };

    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('error', handleError);
    };
  }, []);
  
  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
        if (audioRef.current.src !== station.url_resolved) {
            audioRef.current.src = station.url_resolved;
            setIsBuffering(true);
            setError(null);
        }

        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch((e) => {
                    console.error("Playback failed:", e);
                    setError("Error");
                    // If play fails (e.g. autoplay policy), ensure UI reflects paused state if needed
                });
            }
        } else {
            audioRef.current.pause();
        }
    }
  }, [station, isPlaying]);
  
  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none">
      <div className={`pointer-events-auto w-full max-w-4xl backdrop-blur-2xl border shadow-glow rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-4 transition-all duration-300 hover:shadow-xl ${mode === 'morning' ? 'bg-white/60 border-white/50' : 'bg-black/45 border-white/15'}`}>
            
            {/* Station Info */}
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-slate-50 border border-slate-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {!imgError && station.favicon ? (
                        <img src={station.favicon} alt={station.name} className="w-full h-full object-contain p-1" onError={() => setImgError(true)} />
                    ) : (
                        <RadioIcon className="w-6 h-6 text-slate-300" />
                    )}
                </div>
                <div className="min-w-0 flex flex-col justify-center">
                    <p className="font-heading font-bold truncate ${mode === 'morning' ? 'text-slate-800' : 'text-white'} text-sm sm:text-base leading-tight">
                        {station.name}
                    </p>
                    <div className="flex items-center gap-2 text-xs truncate ${mode === 'morning' ? 'text-slate-500' : 'text-white/70'} mt-0.5">
                         {isBuffering ? (
                             <span className="text-ph-blue font-medium flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-ph-blue animate-pulse"></span>
                                Buffering...
                             </span>
                         ) : error ? (
                             <span className="text-ph-red font-medium">{error}</span>
                         ) : (
                             <span className="flex items-center gap-1.5 text-green-600 font-medium">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                Live
                             </span>
                         )}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onPlayPause}
                    className={`
                        w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95
                        bg-emerald-500 text-white border-2 border-white/20
                    `}
                >
                    {isBuffering ? (
                        <SpinnerIcon className="w-6 h-6 text-white/90" />
                    ) : isPlaying ? (
                        <PauseIcon className="w-6 h-6 fill-current" />
                    ) : (
                        <PlayIcon className="w-6 h-6 fill-current pl-1" />
                    )}
                </button>
            </div>
      </div>
      <audio ref={audioRef} preload="auto" playsInline hidden crossOrigin="anonymous" />
    </div>
  );
};

export default AudioPlayer;