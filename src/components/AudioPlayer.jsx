import React, { useRef, useState, useEffect } from "react";

export default function AudioPlayer({ currentTrack, isPlaying, onTogglePlay, onTrackEnded }) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Sync isPlaying state with native audio element
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((e) => {
        console.error("Audio playback error:", e);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handle track changing
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;
    audioRef.current.load();
    if (isPlayingRef.current) {
      audioRef.current.play().catch((e) => {
        console.error("Audio autoplay error on change:", e);
      });
    }
  }, [currentTrack]);

  // Adjust volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeekChange = (e) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  const formatTime = (timeInSecs) => {
    if (isNaN(timeInSecs)) return "00:00";
    const minutes = Math.floor(timeInSecs / 60);
    const seconds = Math.floor(timeInSecs % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-surface-container/95 backdrop-blur-xl border-t border-primary/20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 animate-slide-up">
      {/* Hidden audio node */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onTrackEnded}
      />

      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-3 md:py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Reciter Details (Right side, matching RTL) */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end order-1 md:order-3">
          <div className="text-right">
            <h5 className="font-bold text-on-surface text-sm md:text-base leading-none">{currentTrack.name}</h5>
            <span className="text-primary text-xs font-medium mt-1 inline-block">{currentTrack.narration}</span>
          </div>
          <img
            src={currentTrack.image}
            alt={currentTrack.name}
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl object-cover border border-white/10"
          />
        </div>

        {/* Playback Controls (Center, matching RTL) */}
        <div className="flex flex-col items-center gap-2 w-full md:flex-1 md:max-w-2xl order-2 md:order-2">
          <div className="flex items-center gap-4">
            <button
              id="audio-back-10-btn"
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
                }
              }}
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center"
              title="ارجع 10 ثواني"
            >
              <span className="material-symbols-outlined text-2xl">replay_10</span>
            </button>

            <button
              id="audio-play-toggle-btn"
              onClick={onTogglePlay}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md transform hover:scale-105 active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-2xl md:text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </button>

            <button
              id="audio-forward-10-btn"
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = Math.min(duration || 0, audioRef.current.currentTime + 10);
                }
              }}
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center"
              title="تقدم 10 ثواني"
            >
              <span className="material-symbols-outlined text-2xl">forward_10</span>
            </button>
          </div>

          {/* Time Scrubber */}
          <div className="flex items-center gap-2.5 w-full text-xs text-on-surface-variant">
            <span>{formatTime(currentTime)}</span>
            <input
              id="audio-progress-scrubber"
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeekChange}
              className="flex-1 accent-primary bg-surface-container h-1.5 rounded-lg cursor-pointer focus:outline-none"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume controls (Left side, matching RTL) */}
        <div className="hidden md:flex items-center gap-2.5 order-3 md:order-1">
          <input
            id="audio-volume-slider"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              setIsMuted(false);
            }}
            className="w-20 accent-primary bg-surface-container h-1 rounded-lg cursor-pointer focus:outline-none"
          />
          <button
            id="audio-mute-toggle-btn"
            onClick={() => setIsMuted(!isMuted)}
            className="text-on-surface-variant hover:text-primary transition-colors flex items-center"
          >
            <span className="material-symbols-outlined text-xl">
              {isMuted || volume === 0 ? "volume_off" : volume < 0.5 ? "volume_down" : "volume_up"}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
