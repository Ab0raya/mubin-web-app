import React, { useState, useEffect } from "react";

export default function StatsDashboard({ currentUser, onOpenAuth }) {
  // Initialize heatmap cells: 60 cells
  // 0 = no activity, 1 = low, 2 = medium, 3 = high
  const [heatmapData, setHeatmapData] = useState(() => {
    // Seed with some nice initial values
    const initial = [];
    for (let i = 0; i < 60; i++) {
      // Seed values: mostly active, some inactive
      const seed = [1, 2, 3, 0, 1, 3, 2, 0, 2, 1, 3, 0, 2, 3, 1];
      initial.push(seed[i % seed.length]);
    }
    return initial;
  });

  // Today's reading progress percentage
  const [progress, setProgress] = useState(72);

  // States derived from heatmapData
  const [totalPoints, setTotalPoints] = useState(120);
  const [currentStreak, setCurrentStreak] = useState(5);

  useEffect(() => {
    // Calculate total points based on heatmap cells
    // Each level gives: Level 1 = 10 pts, Level 2 = 20 pts, Level 3 = 30 pts
    const points = heatmapData.reduce((acc, val) => acc + val * 10, 0);
    setTotalPoints(points);

    // Calculate streak (longest consecutive string of non-zero cells)
    let maxStreak = 0;
    let current = 0;
    for (let i = 0; i < heatmapData.length; i++) {
      if (heatmapData[i] > 0) {
        current++;
        if (current > maxStreak) {
          maxStreak = current;
        }
      } else {
        current = 0;
      }
    }
    // Set streak as maxStreak or just current streak at the end of the year
    // Let's compute the trailing streak (consecutive active days up to the latest cell)
    let trailing = 0;
    for (let i = heatmapData.length - 1; i >= 0; i--) {
      if (heatmapData[i] > 0) {
        trailing++;
      } else {
        if (trailing > 0) break; // stop at first zero once we found some active days
      }
    }
    setCurrentStreak(trailing || maxStreak); // Fallback to max streak if no trailing
  }, [heatmapData]);

  // Cycle cell activity level on click
  const handleCellClick = (index) => {
    setHeatmapData((prev) => {
      const updated = [...prev];
      updated[index] = (updated[index] + 1) % 4; // Cycles 0 -> 1 -> 2 -> 3 -> 0
      return updated;
    });
  };

  // Quick helper to get heatmap cell color
  const getCellColor = (level) => {
    switch (level) {
      case 1:
        return "bg-primary/30 hover:bg-primary/50 border border-primary/20";
      case 2:
        return "bg-primary/60 hover:bg-primary/80 border border-primary/40";
      case 3:
        return "bg-primary hover:bg-primary-fixed border border-primary/65";
      default:
        return "bg-surface-variant/40 hover:bg-surface-variant/60 border border-white/5";
    }
  };

  // SVG configurations for Circle progress
  const radius = 34;
  const circumference = 2 * Math.PI * radius; // ~213.6
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <section id="stats" className="py-section-gap bg-surface-container-low relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -left-20 top-1/2 w-[300px] h-[300px] bg-secondary/10 bloom-effect rounded-full"></div>

      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Dashboard Left Description */}
          <div className="space-y-stack-lg text-right order-first lg:order-last">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              إحصائياتك <span className="text-secondary">بذكاء</span>
            </h2>
            <p className="text-on-surface-variant font-body-lg text-body-lg leading-relaxed">
              راقب تطورك الروحي بوضوح تام. لوحة بيانات "مبين" توفر لك رؤية شاملة لعاداتك اليومية في العبادة والتلاوة. اضغط على خلايا التقويم لتسجيل قراءاتك يدوياً!
            </p>
            
            <div className="grid grid-cols-2 gap-stack-md">
              <div id="stats-total-points-card" className="p-stack-md rounded-2xl bg-surface-container-high border border-white/5 flex flex-col justify-center items-center">
                <span id="stats-total-points-val" className="text-primary font-headline-lg text-[36px]">{totalPoints}</span>
                <span className="text-label-sm text-on-surface-variant uppercase tracking-wider mt-1">مجموع النقاط</span>
              </div>
              <div id="stats-streak-card" className="p-stack-md rounded-2xl bg-surface-container-high border border-white/5 flex flex-col justify-center items-center">
                <span id="stats-streak-val" className="text-secondary font-headline-lg text-[36px]">{currentStreak} {currentStreak === 1 ? "يوم" : "أيام"}</span>
                <span className="text-label-sm text-on-surface-variant uppercase tracking-wider mt-1">التتابع الحالي</span>
              </div>
            </div>
          </div>

          {/* Dashboard Right interactive mockup */}
          <div className="glass-card p-6 md:p-stack-lg rounded-[32px] border border-primary/20 shadow-2xl scale-100 md:scale-105 transition-all">
            <div className="space-y-stack-md text-right">
              
              <div className="flex justify-between items-center mb-4">
                <span id="stats-level-badge" className="text-label-sm text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  المستوى {totalPoints > 200 ? "الثاني" : "الأول"}
                </span>
                <span className="font-bold text-lg">الانتظام في العبادة</span>
              </div>

              {/* Heatmap Grid */}
              <div className="bg-surface-container rounded-2xl p-4 border border-white/5">
                <div className="grid grid-cols-10 sm:grid-cols-12 gap-1.5 justify-center max-h-[160px] overflow-y-auto no-scrollbar">
                  {heatmapData.map((level, idx) => (
                    <button
                      key={idx}
                      id={`stats-heatmap-cell-${idx}`}
                      onClick={() => handleCellClick(idx)}
                      title={`اليوم ${idx + 1}: مستوى ${level}`}
                      className={`heatmap-cell transition-all duration-300 transform active:scale-95 ${getCellColor(level)}`}
                      style={{ width: "18px", height: "18px" }}
                    />
                  ))}
                </div>
                <div className="flex justify-end gap-3 mt-4 text-xs text-on-surface-variant">
                  <span>أقل</span>
                  <div className="w-3.5 h-3.5 rounded-sm bg-surface-variant/40 border border-white/5"></div>
                  <div className="w-3.5 h-3.5 rounded-sm bg-primary/30"></div>
                  <div className="w-3.5 h-3.5 rounded-sm bg-primary/60"></div>
                  <div className="w-3.5 h-3.5 rounded-sm bg-primary"></div>
                  <span>أكثر</span>
                </div>
              </div>

              {/* Circular Progress & Controls */}
              <div className="flex flex-col md:flex-row gap-6 items-center pt-stack-md border-t border-white/5">
                {/* Dynamic SVG Progress ring */}
                <div className="relative w-24 h-24 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      className="text-surface-variant"
                      cx="48"
                      cy="48"
                      fill="transparent"
                      r={radius}
                      stroke="currentColor"
                      strokeWidth="6"
                    />
                    <circle
                      className="text-primary transition-all duration-500 ease-out"
                      cx="48"
                      cy="48"
                      fill="transparent"
                      r={radius}
                      stroke="currentColor"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div id="stats-circular-progress-val" className="absolute inset-0 flex items-center justify-center font-bold text-lg text-primary">
                    {progress}%
                  </div>
                </div>

                <div className="flex-1 w-full text-right">
                  {currentUser ? (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex gap-2">
                          <button
                            id="stats-progress-add"
                            onClick={() => setProgress(Math.min(100, progress + 10))}
                            className="px-2 py-0.5 rounded bg-primary/10 text-primary hover:bg-primary/20 text-xs border border-primary/20 transition-colors"
                          >
                            + 10%
                          </button>
                          <button
                            id="stats-progress-sub"
                            onClick={() => setProgress(Math.max(0, progress - 10))}
                            className="px-2 py-0.5 rounded bg-error/10 text-error hover:bg-error/20 text-xs border border-error/20 transition-colors"
                          >
                            - 10%
                          </button>
                        </div>
                        <span className="text-label-sm text-on-surface-variant">ورد اليوم المتبقي</span>
                      </div>

                      {/* Range Slider for custom values */}
                      <input
                        id="stats-progress-slider"
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={(e) => setProgress(parseInt(e.target.value))}
                        className="w-full accent-primary bg-surface-container h-2 rounded-lg cursor-pointer focus:outline-none"
                      />

                      {/* Syncing horizontal progress bar */}
                      <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden mt-3">
                        <div
                          className="h-full bg-gradient-to-l from-primary to-secondary transition-all duration-500 ease-out"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </>
                  ) : (
                    <div className="py-2 animate-fade-in">
                      <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">
                        سجل دخولك لحفظ أورادك اليومية ومتابعة تقدمك مع إحصائيات حية.
                      </p>
                      <button
                        id="stats-signin-btn"
                        onClick={onOpenAuth}
                        className="w-full py-3 rounded-xl bg-primary text-on-primary font-bold hover:scale-[1.02] active:scale-95 transition-all text-xs flex items-center justify-center gap-1.5 shadow-md shadow-primary/10"
                      >
                        <span className="material-symbols-outlined text-sm font-bold">lock_open</span>
                        تسجيل الدخول لتتبع التقدم
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
