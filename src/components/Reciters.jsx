import React, { useState, useEffect } from "react";
import islamSobhiImg from "../assets/reciters/icfe-إسلام صبحي.png";
import husaryImg from "../assets/reciters/icfe-الحصري.png";
import dosariImg from "../assets/reciters/icfe-الدوسري.png";
import sudaisImg from "../assets/reciters/icfe-السديس.png";
import shuraimImg from "../assets/reciters/icfe-الشريم.png";
import tablawiImg from "../assets/reciters/icfe-الطبلاوي.png";
import ajmyImg from "../assets/reciters/icfe-العجمي.png";
import alafasyImg from "../assets/reciters/icfe-العفاسي.png";
import ghamdiImg from "../assets/reciters/icfe-الغامدي.png";
import qatamiImg from "../assets/reciters/icfe-القطامي.png";
import luhaidanImg from "../assets/reciters/icfe-اللحيدان.png";
import muaiqlyImg from "../assets/reciters/icfe-المعيقلي.png";
import minshawiImg from "../assets/reciters/icfe-المنشاوي.png";
import badrTurkiImg from "../assets/reciters/icfe-بدر التركي.png";
import bandarBalilahImg from "../assets/reciters/icfe-بدر بليله.png";
import khalidJalilImg from "../assets/reciters/icfe-خالد جليل.png";
import rashidSoufiImg from "../assets/reciters/icfe-راشد الصوفي.png";
import abdulbasitImg from "../assets/reciters/icfe-عبدالباسط.png";
import faresAbbadImg from "../assets/reciters/icfe-فارس عباد.png";
import mohammadAyoubImg from "../assets/reciters/icfe-محمد ايوب.png";
import mustafaIsmailImg from "../assets/reciters/icfe-مصطفي إسماعيل.png";

export default function Reciters({ currentTrack, isPlaying, onPlayPause }) {
  const allReciters = [
    {
      id: "alafasy",
      name: "مشاري العفاسي",
      narration: "رواية حفص عن عاصم",
      image: alafasyImg,
      audioUrl: "https://server8.mp3quran.net/afs/001.mp3",
    },
    {
      id: "sudais",
      name: "عبدالرحمن السديس",
      narration: "رواية حفص عن عاصم",
      image: sudaisImg,
      audioUrl: "https://server11.mp3quran.net/sds/001.mp3",
    },
    {
      id: "muaiqly",
      name: "ماهر المعيقلي",
      narration: "رواية حفص عن عاصم",
      image: muaiqlyImg,
      audioUrl: "https://server12.mp3quran.net/maher/001.mp3",
    },
    {
      id: "dosari",
      name: "ياسر الدوسري",
      narration: "رواية حفص عن عاصم",
      image: dosariImg,
      audioUrl: "https://server11.mp3quran.net/yaser/001.mp3",
    },
    {
      id: "ghamdi",
      name: "سعد الغامدي",
      narration: "رواية حفص عن عاصم",
      image: ghamdiImg,
      audioUrl: "https://server7.mp3quran.net/s_gmd/001.mp3",
    },
    {
      id: "shuraim",
      name: "سعود الشريم",
      narration: "رواية حفص عن عاصم",
      image: shuraimImg,
      audioUrl: "https://server7.mp3quran.net/shur/001.mp3",
    },
    {
      id: "ajmy",
      name: "أحمد العجمي",
      narration: "رواية حفص عن عاصم",
      image: ajmyImg,
      audioUrl: "https://server10.mp3quran.net/ajm/001.mp3",
    },
    {
      id: "qatami",
      name: "ناصر القطامي",
      narration: "رواية حفص عن عاصم",
      image: qatamiImg,
      audioUrl: "https://server6.mp3quran.net/qtm/001.mp3",
    },
    {
      id: "islam_sobhi",
      name: "إسلام صبحي",
      narration: "تلاوة خاشعة",
      image: islamSobhiImg,
      audioUrl: "https://server14.mp3quran.net/shub/001.mp3",
    },
    {
      id: "husary",
      name: "محمود خليل الحصري",
      narration: "رواية حفص عن عاصم",
      image: husaryImg,
      audioUrl: "https://server13.mp3quran.net/lhusr/001.mp3",
    },
    {
      id: "tablawi",
      name: "محمد الطبلاوي",
      narration: "رواية حفص عن عاصم",
      image: tablawiImg,
      audioUrl: "https://server12.mp3quran.net/tblwy/001.mp3",
    },
    {
      id: "luhaidan",
      name: "إبراهيم اللحيدان",
      narration: "رواية حفص عن عاصم",
      image: luhaidanImg,
      audioUrl: "https://server8.mp3quran.net/lhdan/001.mp3",
    },
    {
      id: "minshawi",
      name: "محمد المنشاوي",
      narration: "رواية حفص عن عاصم",
      image: minshawiImg,
      audioUrl: "https://server10.mp3quran.net/minsh/001.mp3",
    },
    {
      id: "bdr_turki",
      name: "بدر التركي",
      narration: "رواية حفص عن عاصم",
      image: badrTurkiImg,
      audioUrl: "https://server16.mp3quran.net/bdr/001.mp3",
    },
    {
      id: "bandar_balilah",
      name: "بندر بليلة",
      narration: "رواية حفص عن عاصم",
      image: bandarBalilahImg,
      audioUrl: "https://server16.mp3quran.net/balilah/001.mp3",
    },
    {
      id: "khalid_jalil",
      name: "خالد الجليل",
      narration: "رواية حفص عن عاصم",
      image: khalidJalilImg,
      audioUrl: "https://server10.mp3quran.net/jlel/001.mp3",
    },
    {
      id: "soufi",
      name: "رشيد الصوفي",
      narration: "رواية خلف عن حمزة",
      image: rashidSoufiImg,
      audioUrl: "https://server16.mp3quran.net/soufi/001.mp3",
    },
    {
      id: "abdulbasit",
      name: "عبدالباسط عبدالصمد",
      narration: "رواية ورش عن نافع",
      image: abdulbasitImg,
      audioUrl: "https://server7.mp3quran.net/basit/001.mp3",
    },
    {
      id: "fares_abbad",
      name: "فارس عباد",
      narration: "رواية حفص عن عاصم",
      image: faresAbbadImg,
      audioUrl: "https://server8.mp3quran.net/frs_a/001.mp3",
    },
    {
      id: "mohammad_ayoub",
      name: "محمد أيوب",
      narration: "رواية حفص عن عاصم",
      image: mohammadAyoubImg,
      audioUrl: "https://server8.mp3quran.net/ayoub/001.mp3",
    },
    {
      id: "mustafa_ismail",
      name: "مصطفى إسماعيل",
      narration: "رواية حفص عن عاصم",
      image: mustafaIsmailImg,
      audioUrl: "https://server8.mp3quran.net/mustafa/001.mp3",
    },
  ];

  const [showAll, setShowAll] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("mobin_favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("mobin_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Render 8 by default, show all 21 if showAll is active
  const listToRender = showAll ? allReciters : allReciters.slice(0, 8);

  return (
    <section id="reciters" className="py-section-gap px-4 md:px-margin-desktop max-w-container-max mx-auto">
      
      {/* Reciters Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-section-gap gap-4 text-right">
        <div className="md:order-last">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">أعذب الأصوات</h2>
          <p className="text-on-surface-variant font-body-md mt-2">اختر قارئك المفضل واستمع لتلاوة تطمئن بها القلوب.</p>
        </div>
        <button
          id="reciters-toggle-show-all"
          onClick={() => setShowAll(!showAll)}
          className="text-primary font-bold flex items-center gap-1 hover:underline text-body-md animate-fade-in"
        >
          {showAll ? "عرض أقل" : "عرض الكل"}
          <span className="material-symbols-outlined transform rotate-180 md:rotate-0">
            {showAll ? "chevron_right" : "chevron_left"}
          </span>
        </button>
      </div>

      {/* Reciters Cards Grid - Cards themselves are fully clickable now */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-stack-lg animate-fade-in">
        {listToRender.map((reciter) => {
          const isCurrent = currentTrack && currentTrack.id === reciter.id;
          const playingNow = isCurrent && isPlaying;

          return (
            <div
              key={reciter.id}
              id={`reciter-card-${reciter.id}`}
              onClick={() => onPlayPause(reciter)}
              className={`glass-card rounded-2xl overflow-hidden group hover:border-primary/30 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1 relative ${
                playingNow ? "border-primary/40 ring-1 ring-primary/20 shadow-lg shadow-primary/5" : ""
              }`}
            >
              {/* Photo Area */}
              <div className="h-[240px] relative overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={reciter.name}
                  src={reciter.image}
                  loading="lazy"
                />
                
                {/* Visual shade gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-80"></div>
                
                {/* "Now Playing" floating badge in top-right */}
                {playingNow && (
                  <div className="absolute top-4 right-4 bg-primary text-on-primary text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-lg animate-pulse z-20">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>volume_up</span>
                    <span>جاري التشغيل</span>
                  </div>
                )}
              </div>

              {/* Text Card Footer */}
              <div className="p-stack-md flex justify-between items-center bg-surface/30 backdrop-blur-sm border-t border-white/5 flex-grow text-right relative z-10">
                {/* Favorites button (Stop propagation to prevent card play trigger on heart click) */}
                <button
                  id={`reciter-fav-btn-${reciter.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(reciter.id);
                  }}
                  className="focus:outline-none transition-colors duration-300 hover:scale-110 active:scale-95 transform"
                >
                  <span
                    className={`material-symbols-outlined text-2xl hover:text-error ${
                      favorites.includes(reciter.id) ? "text-error" : "text-on-surface-variant"
                    }`}
                    style={{ fontVariationSettings: favorites.includes(reciter.id) ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>
                <div>
                  <h4 className={`font-headline-md text-headline-md transition-colors ${playingNow ? "text-primary" : "text-on-surface"}`}>
                    {reciter.name}
                  </h4>
                  <p className="text-label-sm text-primary mt-0.5">{reciter.narration}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
