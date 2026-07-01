import React, { useState } from "react";
import logoImg from "../assets/logo.png";

export default function Hero({ onStartJourney }) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section id="hero" className="relative pt-[120px] md:pt-[200px] pb-section-gap px-4 md:px-margin-desktop max-w-container-max mx-auto overflow-visible">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-primary bloom-effect rounded-full"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
        {/* Texts and CTA */}
        <div className="space-y-stack-lg text-right">
          <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20 font-label-sm text-label-sm uppercase tracking-widest">
            Premium Islamic App
          </span>
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg lg:text-[64px] lg:leading-[72px] text-on-surface">
            القرآن الكريم <br />
            <span className="text-primary">بين يديك</span>
          </h1>
          <p className="text-on-surface-variant font-body-lg text-body-lg max-w-lg">
            Your Complete Quran Companion. تجربة روحانية معاصرة تجمع بين عبق التراث وأحدث التقنيات الرقمية لتعزيز علاقتك بكتاب الله.
          </p>
          
          <div className="flex flex-wrap gap-stack-md pt-4">
            <button
              id="hero-start-btn"
              onClick={onStartJourney}
              className="px-8 py-4 rounded-2xl bg-primary text-on-primary font-bold flex items-center gap-2 glow-primary hover:scale-105 active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined font-bold">explore</span>
              ابدأ رحلتك الآن
            </button>
            <button
              id="hero-watch-btn"
              onClick={() => setShowVideo(true)}
              className="px-8 py-4 rounded-2xl border border-white/10 glass-card font-bold flex items-center gap-2 hover:bg-white/5 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined">play_circle</span>
              شاهد العرض
            </button>
          </div>
        </div>

        {/* Visual Mockups - Replaced with Glowing Logo Container */}
        <div className="relative flex justify-center mt-10 lg:mt-0">
          <div
            id="hero-logo-container"
            className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-[48px] bg-gradient-to-br from-surface-container-high/40 to-surface-container-highest/20 p-8 flex items-center justify-center border border-primary/20 shadow-2xl backdrop-blur-md transform hover:scale-[1.03] transition-all duration-700 cursor-pointer group"
          >
            {/* Ambient glow behind logo */}
            <div className="absolute inset-0 rounded-[48px] bg-primary/10 opacity-40 blur-2xl group-hover:opacity-60 transition-opacity"></div>
            
            <img
              alt="Mobin App Logo"
              className="w-[85%] h-[85%] object-contain relative z-10 drop-shadow-[0_12px_24px_rgba(0,230,118,0.2)]"
              src={logoImg}
            />
          </div>
        </div>
      </div>

      {/* Video Modal (Promo/Walkthrough) */}
      {showVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
          <div className="relative w-full max-w-4xl bg-surface-container rounded-3xl overflow-hidden border border-white/10 shadow-2xl p-2">
            <button
              id="hero-close-video-btn"
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-primary hover:text-black transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/Pj1L2vFfH1k?autoplay=1"
                title="Mobin Quran App Walkthrough"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
