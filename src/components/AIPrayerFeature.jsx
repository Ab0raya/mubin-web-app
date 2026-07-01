import React, { useState, useEffect, useRef } from "react";

const POSTURES = {
  qiyam: {
    key: "qiyam",
    name: "القيام والقرءاة",
    desc: "يكتشف الذكاء الاصطناعي استقامة الجسد وموضع اليدين على الصدر، ويقوم بمتابعة قراءة الفاتحة والسورة القصيرة.",
    accuracy: 99,
    stability: 98,
    audioAlert: "وضعية القيام صحيحة - تكبيرة الإحرام",
    statusBadge: "تم رصد القيام والاستقامة",
    badgeColor: "text-primary border-primary/30 bg-primary/10",
    points: {
      head: { x: 50, y: 20 },
      neck: { x: 50, y: 30 },
      lShoulder: { x: 42, y: 32 },
      rShoulder: { x: 58, y: 32 },
      lElbow: { x: 40, y: 44 },
      rElbow: { x: 60, y: 44 },
      lHand: { x: 48, y: 46 },
      rHand: { x: 52, y: 46 },
      hip: { x: 50, y: 62 },
      lHip: { x: 46, y: 62 },
      rHip: { x: 54, y: 62 },
      lKnee: { x: 46, y: 86 },
      rKnee: { x: 54, y: 86 },
      lFoot: { x: 46, y: 112 },
      rFoot: { x: 54, y: 112 }
    }
  },
  ruku: {
    key: "ruku",
    name: "الركوع المعتدل",
    desc: "يقيس التطبيق زاوية انحناء الظهر (90 درجة تقريباً) واستناد الكفين على الركبتين لضمان صحة الركن واستقراره.",
    accuracy: 96,
    stability: 94,
    audioAlert: "ركوع معتدل - سبحان ربي العظيم",
    statusBadge: "تم رصد الركوع بزاوية 88°",
    badgeColor: "text-secondary border-secondary/30 bg-secondary/10",
    points: {
      head: { x: 30, y: 44 },
      neck: { x: 38, y: 46 },
      lShoulder: { x: 38, y: 40 },
      rShoulder: { x: 38, y: 52 },
      lElbow: { x: 48, y: 52 },
      rElbow: { x: 48, y: 64 },
      lHand: { x: 55, y: 68 },
      rHand: { x: 55, y: 80 },
      hip: { x: 64, y: 56 },
      lHip: { x: 64, y: 50 },
      rHip: { x: 64, y: 62 },
      lKnee: { x: 64, y: 84 },
      rKnee: { x: 64, y: 96 },
      lFoot: { x: 64, y: 112 },
      rFoot: { x: 64, y: 112 }
    }
  },
  sujud: {
    key: "sujud",
    name: "السجود الخاشع",
    desc: "يتحقق التطبيق من الوضعية الصحيحة للسجود وتطابق مفاصل الجسم وموضع الرأس واليدين بشكل سليم.",
    accuracy: 98,
    stability: 99,
    audioAlert: "سجود صحيح - سبحان ربي الأعلى",
    statusBadge: "تم رصد السجود الصحيح",
    badgeColor: "text-primary border-primary/30 bg-primary/10",
    points: {
      head: { x: 20, y: 104 },
      neck: { x: 28, y: 98 },
      lShoulder: { x: 32, y: 92 },
      rShoulder: { x: 32, y: 104 },
      lElbow: { x: 36, y: 104 },
      rElbow: { x: 36, y: 108 },
      lHand: { x: 26, y: 108 },
      rHand: { x: 26, y: 108 },
      hip: { x: 54, y: 78 },
      lHip: { x: 52, y: 72 },
      rHip: { x: 56, y: 84 },
      lKnee: { x: 74, y: 100 },
      rKnee: { x: 78, y: 104 },
      lFoot: { x: 90, y: 112 },
      rFoot: { x: 90, y: 112 }
    }
  },
  julus: {
    key: "julus",
    name: "جلسة التشهد",
    desc: "يتابع وضعية الافتراش والتورّك أثناء الجلوس الأخير أو الجلوس بين السجدتين لتنبيهك في حال النسيان.",
    accuracy: 97,
    stability: 96,
    audioAlert: "جلسة صحيحة - التحيات لله",
    statusBadge: "تم رصد الجلوس للتشهد",
    badgeColor: "text-secondary border-secondary/30 bg-secondary/10",
    points: {
      head: { x: 42, y: 60 },
      neck: { x: 42, y: 68 },
      lShoulder: { x: 36, y: 70 },
      rShoulder: { x: 48, y: 70 },
      lElbow: { x: 34, y: 82 },
      rElbow: { x: 50, y: 82 },
      lHand: { x: 40, y: 92 },
      rHand: { x: 48, y: 92 },
      hip: { x: 50, y: 94 },
      lHip: { x: 44, y: 94 },
      rHip: { x: 56, y: 94 },
      lKnee: { x: 36, y: 96 },
      rKnee: { x: 64, y: 96 },
      lFoot: { x: 44, y: 112 },
      rFoot: { x: 56, y: 112 }
    }
  }
};

const AUTO_PRAYER_STEPS = [
  { pose: "qiyam", caption: "الركعة 1: القيام والقراءة" },
  { pose: "ruku", caption: "الركعة 1: الركوع والاطمئنان" },
  { pose: "sujud", caption: "الركعة 1: السجود الأول" },
  { pose: "julus", caption: "الركعة 1: الجلوس بين السجدتين" },
  { pose: "sujud", caption: "الركعة 1: السجود الثاني" },
  { pose: "qiyam", caption: "الركعة 2: القيام للركعة الثانية" },
  { pose: "ruku", caption: "الركعة 2: ركوع الركعة الثانية" },
  { pose: "sujud", caption: "الركعة 2: سجود الركعة الثانية" },
  { pose: "julus", caption: "الركعة 2: التشهد والجلوس الأخير" }
];

export default function AIPrayerFeature() {
  const [activePoseKey, setActivePoseKey] = useState("qiyam");
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [rakah, setRakah] = useState(1);
  const [lastSpeechText, setLastSpeechText] = useState("");
  const intervalRef = useRef(null);

  const activePose = POSTURES[activePoseKey] || POSTURES.qiyam;

  // Autoplay handler: cycles through positions and increments Rakat
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStepIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % AUTO_PRAYER_STEPS.length;
          const nextStep = AUTO_PRAYER_STEPS[nextIndex];
          setActivePoseKey(nextStep.pose);

          // Update Rakah count dynamically
          if (nextIndex >= 5) {
            setRakah(2);
          } else {
            setRakah(1);
          }

          // Simulate Speech synthesis notification
          const speechMsg = POSTURES[nextStep.pose].audioAlert;
          setLastSpeechText(speechMsg);

          return nextIndex;
        });
      }, 4000); // Transition every 4 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  const handleManualPoseSelect = (key) => {
    setIsPlaying(false);
    setActivePoseKey(key);
    setLastSpeechText(POSTURES[key].audioAlert);
    
    // Set simulated step context
    if (key === "qiyam") {
      setRakah(1);
      setCurrentStepIndex(0);
    } else if (key === "ruku") {
      setCurrentStepIndex(1);
    } else if (key === "sujud") {
      setCurrentStepIndex(2);
    } else if (key === "julus") {
      setCurrentStepIndex(8);
      setRakah(2);
    }
  };

  const pts = activePose.points;

  return (
    <section id="ai-prayer" className="relative py-section-gap px-4 md:px-margin-desktop max-w-container-max mx-auto overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute -left-10 top-1/4 w-[250px] h-[250px] md:w-[450px] md:h-[450px] bg-primary bloom-effect rounded-full"></div>
      <div className="absolute right-10 bottom-10 w-[200px] h-[200px] md:w-[350px] md:h-[350px] bg-secondary bloom-effect rounded-full"></div>

      {/* Title Header */}
      <div className="text-center mb-16 md:mb-20">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-label-sm text-label-sm uppercase tracking-widest mb-4">
          ميزة حصرية لتطبيق الهواتف الذكية
        </span>
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-stack-md">
          مصحح الصلاة التفاعلي بالذكاء الاصطناعي
        </h2>
        <p className="text-on-surface-variant font-body-lg text-body-lg max-w-2xl mx-auto leading-relaxed">
          التقنية الأولى من نوعها لمرافقتك في صلاتك. من خلال كاميرا الهاتف، يقوم التطبيق بمتابعة حركاتك للتأكد من ترتيب أركان الصلاة وتنبيهك فوراً وتصحيح السهو بشكل ذكي.
        </p>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg items-center relative z-10">
        
        {/* Left Column: Interactive Phone Mockup (Spans 5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          
          {/* Phone Frame */}
          <div className="relative w-[290px] h-[580px] md:w-[320px] md:h-[640px] iphone-mockup bg-[#031c15] border-[#1f3e34] shadow-[0px_35px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
            
            {/* Camera notch / dynamic island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-2xl z-50 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-gray-900 mr-2"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-900"></span>
            </div>

            {/* Mobile Header Bar */}
            <div className="h-10 pt-3 px-6 flex justify-between items-center text-[10px] text-on-surface-variant font-bold z-40 select-none bg-black/10">
              <span>12:30</span>
              <div className="flex gap-1 items-center">
                <span className="material-symbols-outlined text-[12px]">signal_cellular_4_bar</span>
                <span className="material-symbols-outlined text-[12px]">wifi</span>
                <span className="material-symbols-outlined text-[12px]">battery_5_bar</span>
              </div>
            </div>

            {/* Simulated Live Viewport Area */}
            <div className="flex-1 relative bg-gradient-to-b from-[#02130e] to-[#000906] flex flex-col justify-between p-4 overflow-hidden">
              
              {/* Grid scanning lines overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(117,255,158,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(117,255,158,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
              
              {/* Scanline glow animation */}
              <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent top-0 animate-[scan_6s_linear_infinite] pointer-events-none"></div>

              {/* HUD Header */}
              <div className="flex justify-between items-start z-30">
                <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                  <span className="text-[9px] font-bold text-primary uppercase tracking-wider">AI CAMERA: ACTV</span>
                </div>
                <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-right">
                  <div className="text-[8px] text-on-surface-variant leading-none">معدل الإطارات</div>
                  <div className="text-[10px] font-bold text-white font-mono">60.2 FPS</div>
                </div>
              </div>

              {/* Vector Skeleton Overlay Container */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pt-8 pb-4">
                <svg
                  viewBox="0 0 100 125"
                  className="w-[85%] h-[85%] drop-shadow-[0_0_12px_rgba(117,255,158,0.4)]"
                >
                  {/* Bone Lines with smooth CSS transitions */}
                  {/* Spine & Torso */}
                  <line x1={pts.head.x} y1={pts.head.y} x2={pts.neck.x} y2={pts.neck.y} stroke="#75ff9e" strokeWidth="2.5" strokeLinecap="round" className="transition-all duration-700 ease-in-out" />
                  <line x1={pts.neck.x} y1={pts.neck.y} x2={pts.hip.x} y2={pts.hip.y} stroke="#75ff9e" strokeWidth="2.5" strokeLinecap="round" className="transition-all duration-700 ease-in-out" />
                  
                  {/* Shoulders */}
                  <line x1={pts.neck.x} y1={pts.neck.y} x2={pts.lShoulder.x} y2={pts.lShoulder.y} stroke="#75ff9e" strokeWidth="2.5" strokeLinecap="round" className="transition-all duration-700 ease-in-out" />
                  <line x1={pts.neck.x} y1={pts.neck.y} x2={pts.rShoulder.x} y2={pts.rShoulder.y} stroke="#75ff9e" strokeWidth="2.5" strokeLinecap="round" className="transition-all duration-700 ease-in-out" />
                  
                  {/* Arms */}
                  <line x1={pts.lShoulder.x} y1={pts.lShoulder.y} x2={pts.lElbow.x} y2={pts.lElbow.y} stroke="#75ff9e" strokeWidth="2" strokeLinecap="round" className="transition-all duration-700 ease-in-out" />
                  <line x1={pts.lElbow.x} y1={pts.lElbow.y} x2={pts.lHand.x} y2={pts.lHand.y} stroke="#75ff9e" strokeWidth="2" strokeLinecap="round" className="transition-all duration-700 ease-in-out" />
                  
                  <line x1={pts.rShoulder.x} y1={pts.rShoulder.y} x2={pts.rElbow.x} y2={pts.rElbow.y} stroke="#75ff9e" strokeWidth="2" strokeLinecap="round" className="transition-all duration-700 ease-in-out" />
                  <line x1={pts.rElbow.x} y1={pts.rElbow.y} x2={pts.rHand.x} y2={pts.rHand.y} stroke="#75ff9e" strokeWidth="2" strokeLinecap="round" className="transition-all duration-700 ease-in-out" />

                  {/* Hips */}
                  <line x1={pts.hip.x} y1={pts.hip.y} x2={pts.lHip.x} y2={pts.lHip.y} stroke="#75ff9e" strokeWidth="2" strokeLinecap="round" className="transition-all duration-700 ease-in-out" />
                  <line x1={pts.hip.x} y1={pts.hip.y} x2={pts.rHip.x} y2={pts.rHip.y} stroke="#75ff9e" strokeWidth="2" strokeLinecap="round" className="transition-all duration-700 ease-in-out" />

                  {/* Legs */}
                  <line x1={pts.lHip.x} y1={pts.lHip.y} x2={pts.lKnee.x} y2={pts.lKnee.y} stroke="#75ff9e" strokeWidth="2" strokeLinecap="round" className="transition-all duration-700 ease-in-out" />
                  <line x1={pts.lKnee.x} y1={pts.lKnee.y} x2={pts.lFoot.x} y2={pts.lFoot.y} stroke="#75ff9e" strokeWidth="2.5" strokeLinecap="round" className="transition-all duration-700 ease-in-out" />
                  
                  <line x1={pts.rHip.x} y1={pts.rHip.y} x2={pts.rKnee.x} y2={pts.rKnee.y} stroke="#75ff9e" strokeWidth="2" strokeLinecap="round" className="transition-all duration-700 ease-in-out" />
                  <line x1={pts.rKnee.x} y1={pts.rKnee.y} x2={pts.rFoot.x} y2={pts.rFoot.y} stroke="#75ff9e" strokeWidth="2.5" strokeLinecap="round" className="transition-all duration-700 ease-in-out" />

                  {/* Joints Rings */}
                  <circle cx={pts.head.x} cy={pts.head.y} r="5" fill="#0d231d" stroke="#75ff9e" strokeWidth="2.5" className="transition-all duration-700 ease-in-out" />
                  <circle cx={pts.neck.x} cy={pts.neck.y} r="2.5" fill="#75ff9e" className="transition-all duration-700 ease-in-out" />
                  <circle cx={pts.lShoulder.x} cy={pts.lShoulder.y} r="2" fill="#75ff9e" className="transition-all duration-700 ease-in-out" />
                  <circle cx={pts.rShoulder.x} cy={pts.rShoulder.y} r="2" fill="#75ff9e" className="transition-all duration-700 ease-in-out" />
                  <circle cx={pts.lElbow.x} cy={pts.lElbow.y} r="2" fill="#75ff9e" className="transition-all duration-700 ease-in-out" />
                  <circle cx={pts.rElbow.x} cy={pts.rElbow.y} r="2" fill="#75ff9e" className="transition-all duration-700 ease-in-out" />
                  <circle cx={pts.lHand.x} cy={pts.lHand.y} r="3.5" fill="#dcc48f" stroke="#75ff9e" strokeWidth="1" className="transition-all duration-700 ease-in-out animate-pulse" />
                  <circle cx={pts.rHand.x} cy={pts.rHand.y} r="3.5" fill="#dcc48f" stroke="#75ff9e" strokeWidth="1" className="transition-all duration-700 ease-in-out animate-pulse" />
                  <circle cx={pts.lHip.x} cy={pts.lHip.y} r="2" fill="#75ff9e" className="transition-all duration-700 ease-in-out" />
                  <circle cx={pts.rHip.x} cy={pts.rHip.y} r="2" fill="#75ff9e" className="transition-all duration-700 ease-in-out" />
                  <circle cx={pts.lKnee.x} cy={pts.lKnee.y} r="2" fill="#75ff9e" className="transition-all duration-700 ease-in-out" />
                  <circle cx={pts.rKnee.x} cy={pts.rKnee.y} r="2" fill="#75ff9e" className="transition-all duration-700 ease-in-out" />
                  <circle cx={pts.lFoot.x} cy={pts.lFoot.y} r="2.5" fill="#75ff9e" className="transition-all duration-700 ease-in-out" />
                  <circle cx={pts.rFoot.x} cy={pts.rFoot.y} r="2.5" fill="#75ff9e" className="transition-all duration-700 ease-in-out" />
                </svg>
              </div>

              {/* Floating Posture Badge (Centered overlay) */}
              <div className="absolute inset-x-0 bottom-24 flex justify-center z-30 px-4">
                <div className={`px-4 py-1.5 rounded-full border text-[10px] md:text-xs font-bold shadow-lg backdrop-blur-md transition-all duration-500 flex items-center gap-1.5 ${activePose.badgeColor}`}>
                  <span className="material-symbols-outlined text-xs animate-pulse">check_circle</span>
                  {activePose.statusBadge}
                </div>
              </div>

              {/* Lower HUD Metrics Panel */}
              <div className="bg-black/70 backdrop-blur-md border border-[#143d32]/40 rounded-2xl p-3 z-30 space-y-2.5">
                
                {/* Rakah Counter & Accuracy */}
                <div className="flex justify-between items-center text-right">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-on-surface-variant">الركعة الحالية</span>
                    <span className="text-sm font-bold text-primary font-headline-md leading-none mt-1">الركعة {rakah} / 2</span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[8px] text-on-surface-variant">دقة الوضعية</span>
                    <span className="text-sm font-bold text-secondary font-headline-md leading-none mt-1">{activePose.accuracy}%</span>
                  </div>
                </div>

                {/* Progress Bar of active pose */}
                <div className="w-full bg-[#051c14] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-700 ease-in-out shadow-[0_0_8px_#75ff9e]"
                    style={{ width: `${activePose.accuracy}%` }}
                  ></div>
                </div>

                {/* Calibration Status & Audio Speech feedback */}
                <div className="grid grid-cols-2 gap-2 text-[8px] border-t border-white/5 pt-2 select-none">
                  <div>
                    <span className="text-on-surface-variant block text-right">معايرة الهيكل</span>
                    <div className="flex items-center gap-1 mt-1 justify-end">
                      <span className="font-bold text-primary font-headline-md text-[9px]">ممتازة</span>
                      <span className="material-symbols-outlined text-[10px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                  </div>
                  <div className="text-left border-l border-white/5 pl-2">
                    <span className="text-on-surface-variant block">المساعد الصوتي</span>
                    <span className="text-[9px] text-[#cfe8de] font-medium block truncate mt-0.5" title={lastSpeechText || activePose.audioAlert}>
                      🎙️ {lastSpeechText || activePose.audioAlert}
                    </span>
                  </div>
                </div>

              </div>

            </div>

            {/* Simulated Mobile Footer (Start/Pause & indicator) */}
            <div className="h-12 bg-[#010907] flex justify-between items-center px-4 border-t border-[#143d32]/30 select-none z-40">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all text-[10px] font-bold border border-primary/20"
              >
                <span className="material-symbols-outlined text-[12px] font-bold">
                  {isPlaying ? "pause" : "play_arrow"}
                </span>
                <span>{isPlaying ? "إيقاف المحاكاة" : "تشغيل المحاكاة"}</span>
              </button>
              
              <span className="text-[9px] text-on-surface-variant font-medium">
                {isPlaying ? "تحديث تلقائي..." : "تحكم يدوي"}
              </span>
            </div>
          </div>

          {/* Interactive Poses Selector Dots (Below phone mockup) */}
          <div className="mt-6 flex justify-center gap-2">
            {Object.keys(POSTURES).map((key) => {
              const active = activePoseKey === key;
              return (
                <button
                  key={key}
                  onClick={() => handleManualPoseSelect(key)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                    active
                      ? "bg-primary text-[#00210b] border-primary shadow-lg shadow-primary/20"
                      : "bg-[#031c15] text-[#bacbb9] border-white/5 hover:border-primary/20"
                  }`}
                >
                  {POSTURES[key].name}
                </button>
              );
            })}
          </div>

        </div>

        {/* Right Column: Detailed Explanation & Highlights (Spans 7 cols on lg) */}
        <div className="lg:col-span-7 space-y-8 text-right">
          
          {/* Main Info Card */}
          <div className="glass-card p-6 md:p-8 rounded-2xl space-y-4 border border-[#143d32]/30">
            <div className="flex items-center gap-3 justify-end text-primary">
              <h3 className="font-headline-md text-headline-md text-white font-bold">كيف تعمل ميزة مراقبة الصلاة؟</h3>
              <span className="material-symbols-outlined text-3xl">psychology</span>
            </div>
            <p className="text-on-surface-variant font-body-md leading-relaxed text-sm md:text-base">
              تعتمد الميزة على نماذج الذكاء الاصطناعي المدمجة بالكامل داخل تطبيق الهاتف، والتي تعمل بأمان تام وتضمن خصوصيتك بنسبة 100% حيث تتم معالجة الفيديو في الوقت الفعلي على جهازك دون إرسال أي صورة أو فيديو إلى أي خوادم خارجية.
            </p>
          </div>

          {/* Feature List Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Feature 1 */}
            <div
              onClick={() => handleManualPoseSelect("qiyam")}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer group text-right ${
                activePoseKey === "qiyam"
                  ? "bg-primary/5 border-primary/30"
                  : "bg-surface-container/40 border-transparent hover:border-primary/20"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform float-right">
                <span className="material-symbols-outlined text-2xl">accessibility_new</span>
              </div>
              <div className="clear-both"></div>
              <h4 className="font-bold text-sm text-white mb-2 group-hover:text-primary transition-colors">التعرف الفوري على الهيكل العظمي</h4>
              <p className="text-[12px] text-on-surface-variant leading-relaxed">
                يقوم محرك الذكاء الاصطناعي برسم 17 نقطة تتبع على المفاصل الرئيسية للجسد لمتابعة انحناءات وزوايا الحركة بدقة تامة.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              onClick={() => handleManualPoseSelect("ruku")}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer group text-right ${
                activePoseKey === "ruku"
                  ? "bg-primary/5 border-primary/30"
                  : "bg-surface-container/40 border-transparent hover:border-primary/20"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform float-right">
                <span className="material-symbols-outlined text-2xl">fact_check</span>
              </div>
              <div className="clear-both"></div>
              <h4 className="font-bold text-sm text-white mb-2 group-hover:text-secondary transition-colors">التحقق من ترتيب الأركان</h4>
              <p className="text-[12px] text-on-surface-variant leading-relaxed">
                يتابع التطبيق تسلسل أركان الصلاة خطوة بخطوة للتأكد من الإتيان بكل ركن في موضعه الصحيح، وتنبيهك فوراً في حال حدوث أي سهو أو خلل في الترتيب.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              onClick={() => handleManualPoseSelect("sujud")}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer group text-right ${
                activePoseKey === "sujud"
                  ? "bg-primary/5 border-primary/30"
                  : "bg-surface-container/40 border-transparent hover:border-primary/20"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform float-right">
                <span className="material-symbols-outlined text-2xl">track_changes</span>
              </div>
              <div className="clear-both"></div>
              <h4 className="font-bold text-sm text-white mb-2 group-hover:text-primary transition-colors">حساب الركعات وتجنب السهو</h4>
              <p className="text-[12px] text-on-surface-variant leading-relaxed">
                لا داعي للقلق بشأن نسيان الركعة أو التردد في عدد السجدات؛ حيث يسجل النظام كل سجدة وركعة بدقة ويعرضها في لوحة التحكم.
              </p>
            </div>

            {/* Feature 4 */}
            <div
              onClick={() => handleManualPoseSelect("julus")}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer group text-right ${
                activePoseKey === "julus"
                  ? "bg-primary/5 border-primary/30"
                  : "bg-surface-container/40 border-transparent hover:border-primary/20"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform float-right">
                <span className="material-symbols-outlined text-2xl">monitoring</span>
              </div>
              <div className="clear-both"></div>
              <h4 className="font-bold text-sm text-white mb-2 group-hover:text-secondary transition-colors">تقارير الالتزام اليومية</h4>
              <p className="text-[12px] text-on-surface-variant leading-relaxed">
                بعد الانتهاء من صلاتك، يزودك التطبيق بتقرير أداء متكامل يوضح مستوى الخشوع، الطمأنينة، ويسجلها في رصيد إنجازاتك اليومية.
              </p>
            </div>

          </div>

          {/* Download CTA Action box */}
          <div className="p-6 rounded-2xl bg-gradient-to-l from-surface-container-high to-surface-container-low border border-primary/15 flex flex-col md:flex-row justify-between items-center gap-4 text-right">
            <div>
              <h4 className="font-bold text-base text-white">جرّب ميزة مصحح الصلاة الآن مجاناً</h4>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                قم بتحميل تطبيق مبين على جهازك الآيفون أو الأندرويد واستفد من أحدث تقنيات تصحيح الصلاة والعد التلقائي.
              </p>
            </div>
            <a
              href="#download"
              className="px-6 py-3 rounded-xl bg-primary text-on-primary font-bold hover:scale-105 active:scale-95 transition-all text-xs md:text-sm shrink-0 flex items-center gap-2 shadow-lg shadow-primary/15"
            >
              <span className="material-symbols-outlined font-bold text-base">download</span>
              تحميل تطبيق الهاتف
            </a>
          </div>

        </div>

      </div>

    </section>
  );
}
