import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import StatsDashboard from "./components/StatsDashboard";
import Reciters from "./components/Reciters";
import AudioPlayer from "./components/AudioPlayer";
import Carousel from "./components/Carousel";
import AuthForm from "./components/AuthForm";
import DownloadCTA from "./components/DownloadCTA";
import Footer from "./components/Footer";
import ListenDashboard from "./components/ListenDashboard";
import AIPrayerFeature from "./components/AIPrayerFeature";

export default function App() {
  // Global User Session State
  const [currentUser, setCurrentUser] = useState(null);
  
  // Navigation / View State
  const [view, setView] = useState("landing");

  // Global Audio Playback States
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-login from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("mobin_current_user");
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Failed to load user session:", e);
    }
  }, []);

  // Login handler
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem("mobin_current_user", JSON.stringify(user));
    } catch (e) {
      console.error("Failed to save user session:", e);
    }
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem("mobin_current_user");
    } catch (e) {
      console.error("Failed to remove user session:", e);
    }
  };

  // Audio Playback dispatcher
  const handlePlayPause = (reciter) => {
    if (currentTrack && currentTrack.id === reciter.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(reciter);
      setIsPlaying(true);
    }
  };

  // Sticky player play/pause toggle
  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Audio finished callback
  const handleTrackEnded = () => {
    setIsPlaying(false);
  };

  // Smooth scroll helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={() => scrollToSection("auth")}
        currentView={view}
        onViewChange={setView}
      />

      {/* Main Page Content */}
      <main className="flex-grow">
        {view === "landing" ? (
          <>
            {/* Hero Area */}
            <Hero onStartJourney={() => scrollToSection("auth")} />

            {/* Bento Features Grid */}
            <Features />

            {/* AI Prayer Monitor Showcase */}
            <AIPrayerFeature />

            {/* Stateful Statistics Grid */}
            <StatsDashboard currentUser={currentUser} onOpenAuth={() => scrollToSection("auth")} />

            {/* Reciters List + Audio Actions */}
            <Reciters
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
            />

            {/* Gallery Carousel */}
            <Carousel />

            {/* Interactive Auth Block */}
            <AuthForm onLoginSuccess={handleLoginSuccess} />

            {/* App Download Links */}
            <DownloadCTA />
          </>
        ) : (
          <ListenDashboard />
        )}
      </main>

      {/* Footer Area */}
      {view === "landing" && <Footer />}

      {/* Sticky Audio Player */}
      {view === "landing" && (
        <AudioPlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onTrackEnded={handleTrackEnded}
        />
      )}
    </div>
  );
}
