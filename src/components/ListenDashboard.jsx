import React, { useState, useEffect, useRef } from "react";
import { SURAHS } from "../data/surahs";
import { RECITERS } from "../data/reciters";

export default function ListenDashboard() {
  const [activeReciterKey, setActiveReciterKey] = useState("afs"); // Default to Alafasy (afs)
  const [activeSurahId, setActiveSurahId] = useState("018"); // Default to Al-Kahf (018)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [likedSurahs, setLikedSurahs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [mobileTab, setMobileTab] = useState("player"); // "surahs", "player", "reciters"

  const audioRef = useRef(null);
  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);
  
  // Resolve active reciter and surah objects
  const activeReciter = RECITERS.find(r => r.key === activeReciterKey) || RECITERS[7];
  const activeSurah = SURAHS.find(s => s.id === activeSurahId) || SURAHS[17];

  // Dynamic Audio URL construction based on active reciter and surah
  const audioUrl = `${activeReciter.server}${activeSurah.id}.mp3`;

  // Sync isPlaying state with native audio element
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((e) => {
        console.error("Playback error:", e);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Update track source when audioUrl changes
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.load();
    if (isPlayingRef.current) {
      audioRef.current.play().catch((e) => {
        console.error("Autoplay failed:", e);
      });
    }
  }, [audioUrl]);

  // Handle Play/Pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Find absolute index of active surah in the master list
  const currentAbsoluteIndex = SURAHS.findIndex(s => s.id === activeSurahId);

  // Skip tracks
  const handleNext = () => {
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * SURAHS.length);
      setActiveSurahId(SURAHS[randomIndex].id);
    } else {
      const nextIndex = (currentAbsoluteIndex === SURAHS.length - 1 ? 0 : currentAbsoluteIndex + 1);
      setActiveSurahId(SURAHS[nextIndex].id);
    }
  };

  const handlePrev = () => {
    const prevIndex = (currentAbsoluteIndex === 0 ? SURAHS.length - 1 : currentAbsoluteIndex - 1);
    setActiveSurahId(SURAHS[prevIndex].id);
  };

  // Audio elements events
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

  const handleEnded = () => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.error(e));
      }
    } else {
      handleNext();
    }
  };

  const handleSeekChange = (e) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Sync Volume and Mute to HTML Audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Toggle Like Status
  const toggleLike = (surahId) => {
    setLikedSurahs((prev) =>
      prev.includes(surahId) ? prev.filter((id) => id !== surahId) : [...prev, surahId]
    );
  };

  // Format MM:SS or HH:MM:SS
  const formatTime = (timeInSecs) => {
    if (isNaN(timeInSecs)) return "00:00";
    const hours = Math.floor(timeInSecs / 3600);
    const minutes = Math.floor((timeInSecs % 3600) / 60);
    const seconds = Math.floor(timeInSecs % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Filter Surahs based on search query
  const filteredSurahs = SURAHS.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.arabic.includes(searchQuery) ||
    s.translation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Search input renderer
  const renderSearchInput = () => (
    <div className="relative mb-4">
      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">
        search
      </span>
      <input
        type="text"
        placeholder="ابحث عن سورة..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-[#051c14] border border-[#143d32]/35 text-[#cfe8de] rounded-xl pr-9 pl-4 py-2 text-right focus:outline-none focus:border-primary transition-all text-xs"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-xs">close</span>
        </button>
      )}
    </div>
  );

  // Surah list renderer
  const renderSurahList = (isSidebar = false) => {
    return (
      <div className={`space-y-2 overflow-y-auto flex-grow scrollbar-thin pr-1 text-right`}>
        {filteredSurahs.map((surah) => {
          const isActive = surah.id === activeSurahId;
          return (
            <button
              key={surah.id}
              id={`${isSidebar ? 'sidebar' : 'mobile'}-surah-${surah.id}`}
              onClick={() => {
                setActiveSurahId(surah.id);
                setIsPlaying(true);
                setMobileTab("player");
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-right group ${
                isActive
                  ? "bg-primary/10 border border-primary/20 text-primary"
                  : "hover:bg-white/5 border border-transparent text-[#bacbb9]"
              }`}
            >
              <div className="flex flex-col text-left">
                <span className={`font-bold text-xs md:text-sm ${isActive ? "text-primary" : "text-white"}`}>
                  {surah.name}
                </span>
                <span className="text-[10px] md:text-[11px] text-on-surface-variant font-medium mt-0.5">
                  {surah.translation}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs md:text-sm font-semibold font-headline-md">{surah.arabic}</span>
                {isActive ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-primary block shadow-md animate-pulse"></span>
                ) : (
                  <span className="text-[10px] md:text-xs text-on-surface-variant group-hover:text-white transition-colors">
                    {surah.id.replace(/^0+/, "")}
                  </span>
                )}
              </div>
            </button>
          );
        })}

        {filteredSurahs.length === 0 && (
          <div className="text-center py-8 text-on-surface-variant text-xs">
            لا توجد نتائج مطابقة لـ "{searchQuery}"
          </div>
        )}
      </div>
    );
  };

  // Reciter list renderer
  const renderRecitersList = (isSidebar = false) => {
    return (
      <div className={`space-y-2 overflow-y-auto ${isSidebar ? "max-h-[320px]" : "flex-grow"} scrollbar-thin pr-1 text-right`}>
        <div className={isSidebar ? "space-y-2" : "grid grid-cols-1 sm:grid-cols-2 gap-2"}>
          {RECITERS.map((r) => {
            const isActive = r.key === activeReciterKey;
            return (
              <div
                key={r.id}
                onClick={() => {
                  setActiveReciterKey(r.key);
                  setMobileTab("player");
                }}
                className={`flex items-center justify-between p-2 rounded-xl border transition-all cursor-pointer group ${
                  isActive 
                    ? "border-primary/20 bg-primary/10 text-primary" 
                    : "border-transparent hover:border-[#143d32]/30 hover:bg-white/5"
                }`}
              >
                {/* Left side (indicates active state) */}
                <div className="flex items-center">
                  {isActive ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-primary block shadow-md shadow-primary/20 animate-pulse"></span>
                  ) : (
                    <span className="material-symbols-outlined text-[#bacbb9] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      play_arrow
                    </span>
                  )}
                </div>

                {/* Right side (Reciter image and name details) */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <h5 className={`font-bold text-xs transition-colors ${isActive ? "text-primary" : "text-white group-hover:text-primary"}`}>
                      {r.name}
                    </h5>
                    <span className="text-[10px] text-on-surface-variant font-headline-md block mt-0.5">{r.arabicName}</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#031c15] flex items-center justify-center text-primary overflow-hidden border border-white/5 shrink-0 shadow-md">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#020e0a] text-[#cfe8de] pt-[80px] pb-[76px] md:pb-[90px] flex flex-col font-sans select-none">
      {/* Hidden Audio Node */}
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <div className="flex flex-row flex-grow h-[calc(100vh-156px)] md:h-[calc(100vh-170px)] overflow-hidden w-full">
        
        {/* ======================================================
            1. LEFT SIDEBAR: Surah List (Visible only on md+)
            ====================================================== */}
        <aside className="hidden md:flex flex-col w-[280px] bg-[#010a07] border-r border-[#143d32]/30 p-6 overflow-y-auto scrollbar-thin">
          <div className="flex items-center gap-3 mb-6 justify-end">
            <h3 className="font-bold text-lg text-white font-headline-md">قائمة السور</h3>
            <span className="material-symbols-outlined text-primary font-bold text-2xl">menu_book</span>
          </div>

          {renderSearchInput()}
          {renderSurahList(true)}
        </aside>

        {/* ======================================================
            2. MIDDLE AREA: Tabs, Search, Hero, Recents Table
            ====================================================== */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gradient-to-b from-[#031d15] to-[#010c08] flex flex-col gap-4 md:gap-6 scrollbar-thin">
          
          {/* Mobile/Tablet View Switcher (Visible on < xl) */}
          <div className="flex xl:hidden bg-[#02150f]/80 backdrop-blur-md rounded-2xl border border-[#143d32]/30 p-1 justify-between text-xs font-bold w-full shrink-0 select-none">
            <button
              onClick={() => setMobileTab("surahs")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl transition-all ${
                mobileTab === "surahs" ? "text-primary bg-primary/10 border border-primary/20" : "text-[#bacbb9] hover:text-white"
              } md:hidden`}
            >
              <span className="material-symbols-outlined text-sm">menu_book</span>
              <span>السور</span>
            </button>
            <button
              onClick={() => setMobileTab("player")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl transition-all ${
                mobileTab === "player" ? "text-primary bg-primary/10 border border-primary/20" : "text-[#bacbb9] hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-sm">play_circle</span>
              <span>الآن يستمع</span>
            </button>
            <button
              onClick={() => setMobileTab("reciters")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl transition-all ${
                mobileTab === "reciters" ? "text-primary bg-primary/10 border border-primary/20" : "text-[#bacbb9] hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-sm">record_voice_over</span>
              <span>القراء</span>
            </button>
          </div>

          {/* Main content display based on active tab and viewport */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Mobile Surah List (Visible only on < md and when tab is active) */}
            {mobileTab === "surahs" && (
              <div className="md:hidden flex flex-col flex-grow min-h-0 bg-[#010a07] rounded-3xl border border-[#143d32]/20 p-4 md:p-5 shadow-inner">
                {renderSearchInput()}
                {renderSurahList(false)}
              </div>
            )}

            {/* Mobile/Tablet Reciter List (Visible only on < xl and when tab is active) */}
            {mobileTab === "reciters" && (
              <div className="xl:hidden flex flex-col flex-grow min-h-0 bg-[#010a07] rounded-3xl border border-[#143d32]/20 p-4 md:p-5 shadow-inner">
                <div className="flex items-center gap-2 mb-4 justify-end">
                  <h4 className="font-bold text-sm text-[#cfe8de]">قائمة القراء</h4>
                  <span className="material-symbols-outlined text-primary text-base">record_voice_over</span>
                </div>
                {renderRecitersList(false)}
              </div>
            )}

            {/* Player View (Default view) */}
            {mobileTab === "player" && (
              <div className="flex-1 flex flex-col items-center justify-center">
                {/* Now Playing Large Card */}
                <div className="w-full max-w-2xl glass-card rounded-3xl p-6 md:p-12 relative overflow-hidden flex flex-col items-center justify-center text-center gap-6 md:gap-8 shadow-2xl">
                  {/* Decorative aura behind content */}
                  <div className={`absolute w-48 h-48 md:w-72 md:h-72 rounded-full bg-primary/10 blur-[60px] md:blur-[80px] -z-10 transition-all duration-1000 ${isPlaying ? "scale-125 opacity-100 animate-pulse" : "scale-75 opacity-50"}`}></div>
                  
                  {/* Surah Arabic Name (Large Calligraphy Styling) */}
                  <div className="relative">
                    <span className={`absolute -inset-2 bg-primary/20 blur-md rounded-full transition-opacity duration-500 ${isPlaying ? "opacity-40" : "opacity-0"}`}></span>
                    <h1 className="text-6xl md:text-8xl font-bold text-primary font-headline-lg relative drop-shadow-[0_4px_12px_rgba(117,255,158,0.2)]">
                      {activeSurah.arabic}
                    </h1>
                  </div>

                  {/* Surah Details */}
                  <div className="space-y-2 mt-2 md:mt-4">
                    <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-wide">
                      {activeSurah.name}
                    </h2>
                    <p className="text-[10px] md:text-sm text-on-surface-variant font-medium uppercase tracking-wider">
                      {activeSurah.translation}
                    </p>
                  </div>

                  {/* Reciter Detail */}
                  <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                    <span className="material-symbols-outlined text-primary text-sm animate-pulse">record_voice_over</span>
                    <span className="text-xs md:text-sm font-semibold text-[#cfe8de]">
                      {activeReciter.name}
                    </span>
                    <span className="text-[9px] md:text-[10px] text-[#bacbb9] bg-primary/15 px-2 py-0.5 rounded-full font-headline-md">
                      {activeReciter.narration || "رواية حفص عن عاصم"}
                    </span>
                  </div>

                  {/* Play / Pause Interactive button in card */}
                  <button
                    onClick={togglePlay}
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all shadow-xl hover:scale-105 active:scale-95 ${
                      isPlaying 
                        ? "bg-primary text-[#00210b] shadow-primary/20" 
                        : "bg-[#021711] border border-white/10 text-white hover:border-primary/20 hover:bg-[#07241d]"
                    }`}
                  >
                    <span className="material-symbols-outlined font-bold text-2xl md:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {isPlaying ? "pause" : "play_arrow"}
                    </span>
                  </button>

                  {/* Tall Equalizer Animation (Plays only if audio is playing) */}
                  <div className="flex items-end justify-center gap-[4px] md:gap-[6px] h-8 md:h-12 w-full mt-2 md:mt-4">
                    {[...Array(15)].map((_, i) => {
                      const animClass = `animate-large-eq-${(i % 5) + 1}`;
                      return (
                        <span
                          key={i}
                          className={`large-eq-bar ${isPlaying ? animClass : ""}`}
                          style={{
                            height: isPlaying ? undefined : "4px",
                            width: "4px",
                            opacity: isPlaying ? 1 : 0.25,
                            transition: "all 0.5s ease"
                          }}
                        ></span>
                      );
                    })}
                  </div>

                </div>
              </div>
            )}
          </div>

        </main>

        {/* ======================================================
            3. RIGHT SIDEBAR: Reciter Bio & Recommended (Visible only on xl+)
            ====================================================== */}
        <aside className="hidden xl:flex flex-col w-[320px] bg-[#010a07] border-l border-[#143d32]/30 p-6 overflow-y-auto space-y-6 scrollbar-thin text-right">
          
          {/* About The Reciter */}
          <div className="bg-[#031510] rounded-2xl overflow-hidden border border-white/5 p-4 flex flex-col gap-4">
            
            {/* Photo & Name */}
            <div className="h-[150px] relative rounded-xl overflow-hidden bg-surface-container border border-white/5">
              <img
                src={activeReciter.image}
                alt={activeReciter.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="font-bold text-sm text-white leading-none block">
                  {activeReciter.name}
                </span>
              </div>
            </div>

          </div>

          {/* Trending Now / Reciters List */}
          <div className="space-y-3 flex-grow flex flex-col min-h-0">
            <h3 className="font-bold text-base text-white font-headline-md">قائمة القراء</h3>
            {renderRecitersList(true)}
          </div>

        </aside>

      </div>

      {/* ======================================================
          4. BOTTOM AUDIO PLAYER BAR (Responsive Refactor)
          ====================================================== */}
      <footer className="fixed bottom-0 left-0 w-full h-[76px] md:h-[90px] bg-[#03130f] border-t border-[#143d32]/30 px-4 md:px-6 py-3 md:py-4 flex flex-row items-center justify-between z-50 select-none">
        
        {/* Top border progress bar for mobile viewports */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#010907] md:hidden">
          <div
            className="h-full bg-primary transition-all duration-200 ease-out"
            style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
          ></div>
        </div>

        {/* Left Side: Track Info */}
        <div className="flex items-center gap-2 md:gap-3 w-auto md:w-1/4 max-w-[65%] md:max-w-none justify-start order-1 md:order-1 shrink-0">
          <div className="w-9 h-9 md:w-11 md:h-11 rounded-lg bg-[#05241b] border border-primary/20 flex items-center justify-center text-primary shadow-inner shrink-0">
            <span className="material-symbols-outlined text-lg md:text-xl">menu_book</span>
          </div>

          <div className="text-right">
            <h4 className="font-bold text-white text-xs md:text-sm leading-none truncate max-w-[100px] xs:max-w-[150px] md:max-w-none">{activeSurah.name}</h4>
            <span className="text-[9px] md:text-[11px] text-primary mt-1 inline-block font-medium truncate max-w-[100px] xs:max-w-[150px] md:max-w-none">
              {activeReciter.name}
            </span>
          </div>

          <button
            onClick={() => toggleLike(activeSurah.id)}
            className="text-on-surface-variant hover:text-error transition-colors ml-1 focus:outline-none shrink-0"
          >
            <span
              className="material-symbols-outlined text-base md:text-lg"
              style={{ fontVariationSettings: likedSurahs.includes(activeSurah.id) ? "'FILL' 1" : "'FILL' 0" }}
            >
              {likedSurahs.includes(activeSurah.id) ? "favorite" : "favorite_border"}
            </span>
          </button>
        </div>

        {/* Center Side: Controls & Progress */}
        <div className="flex flex-col items-center justify-center gap-1 md:gap-1.5 flex-grow md:flex-1 max-w-none md:max-w-xl order-2 md:order-2">
          <div className="flex items-center gap-3.5 md:gap-5">
            
            {/* Shuffle Button (Hidden on mobile) */}
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              className={`hidden md:inline-block transition-colors ${isShuffle ? "text-primary" : "text-on-surface-variant hover:text-white"}`}
              title="Shuffle"
            >
              <span className="material-symbols-outlined text-lg">shuffle</span>
            </button>

            {/* Skip Previous */}
            <button
              onClick={handlePrev}
              className="text-on-surface-variant hover:text-white transition-colors"
              title="Previous"
            >
              <span className="material-symbols-outlined text-lg md:text-xl">skip_previous</span>
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary text-[#00210b] flex items-center justify-center shadow-lg transform hover:scale-105 active:scale-95 transition-transform shrink-0"
            >
              <span className="material-symbols-outlined text-lg md:text-xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </button>

            {/* Skip Next */}
            <button
              onClick={handleNext}
              className="text-on-surface-variant hover:text-white transition-colors"
              title="Next"
            >
              <span className="material-symbols-outlined text-lg md:text-xl">skip_next</span>
            </button>

            {/* Repeat Button (Hidden on mobile) */}
            <button
              onClick={() => setIsRepeat(!isRepeat)}
              className={`hidden md:inline-block transition-colors ${isRepeat ? "text-primary" : "text-on-surface-variant hover:text-white"}`}
              title="Repeat"
            >
              <span className="material-symbols-outlined text-lg">repeat</span>
            </button>

          </div>

          {/* Progress Bar scrubber (Hidden on mobile, visible on desktop/tablet) */}
          <div className="hidden md:flex items-center gap-3 w-full text-[10px] text-on-surface-variant font-medium">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeekChange}
              className="flex-1 accent-primary bg-[#010907] h-1 rounded-full cursor-pointer focus:outline-none"
            />
            <span>{formatTime(duration)}</span>
          </div>

        </div>

        {/* Right Side: Volume & Expand (Hidden on mobile) */}
        <div className="hidden md:flex items-center justify-end gap-3.5 w-1/4 shrink-0 order-3 md:order-3">
          
          <button className="text-on-surface-variant hover:text-white transition-colors">
            <span className="material-symbols-outlined text-lg">queue_music</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleMute}
              className="text-on-surface-variant hover:text-white transition-colors flex items-center"
            >
              <span className="material-symbols-outlined text-lg">
                {isMuted || volume === 0 ? "volume_off" : volume < 0.5 ? "volume_down" : "volume_up"}
              </span>
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                setIsMuted(false);
              }}
              className="w-16 accent-primary bg-[#010907] h-1 rounded-full cursor-pointer focus:outline-none"
            />
          </div>

          <button className="text-on-surface-variant hover:text-white transition-colors">
            <span className="material-symbols-outlined text-lg">fullscreen</span>
          </button>

        </div>

      </footer>

    </div>
  );
}
