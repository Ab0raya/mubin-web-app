import React, { useEffect, useMemo, useRef, useState } from "react";

// Standard Madani mushaf ayah counts per surah (114) — used to compute
// the global ayah number required by cdn.islamic.network per-ayah audio:
//   https://cdn.islamic.network/quran/audio/128/{edition}/{globalAyahId}.mp3
const AYAH_COUNTS = [
  7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128,
  111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30, 73,
  54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60,
  49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52, 52,
  44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17, 19,
  26, 30, 20, 15, 21, 11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3,
  6, 3, 5, 4, 5, 6,
];

// Verified islamic.network audio editions (per-ayah works for all of these)
const EDITIONS = [
  { id: "ar.alafasy", label: "مشاري العفاسي" },
  { id: "ar.ahmedajamy", label: "أحمد بن علي العجمي" },
  { id: "ar.husary", label: "محمود خليل الحصري" },
  { id: "ar.minshawi", label: "محمد صديق المنشاوي" },
  { id: "ar.mahermuaiqly", label: "ماهر المعيقلي" },
  { id: "ar.abdulbasitmurattal", label: "عبد الباسط (مرتل)" },
  { id: "ar.abdullahbasfar", label: "عبد الله بصفر" },
  { id: "ar.abdurrahmaansudais", label: "عبد الرحمن السديس" },
];

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];
const REPEAT_OPTIONS = [1, 2, 3, 5, 10, 20];

function globalAyahId(surahNum, ayahNum) {
  let offset = 0;
  for (let i = 0; i < surahNum - 1; i++) offset += AYAH_COUNTS[i];
  return offset + ayahNum;
}

export default function AyahIntervalTrainer({ surahId, surahArabicName }) {
  const surahNum = parseInt(surahId, 10) || 1;

  const [verses, setVerses] = useState([]);
  const [totalVerses, setTotalVerses] = useState(AYAH_COUNTS[surahNum - 1] || 7);
  const [loadingVerses, setLoadingVerses] = useState(false);
  const [versesError, setVersesError] = useState("");

  const [fromAyah, setFromAyah] = useState(1);
  const [toAyah, setToAyah] = useState(Math.min(7, AYAH_COUNTS[surahNum - 1] || 7));
  const [repeatTimes, setRepeatTimes] = useState(3);
  const [infiniteRepeat, setInfiniteRepeat] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [edition, setEdition] = useState("ar.alafasy");

  const [isActive, setIsActive] = useState(false);
  const [currentAyah, setCurrentAyah] = useState(null);
  const [loopCount, setLoopCount] = useState(1);
  const [audioError, setAudioError] = useState("");

  const audioRef = useRef(null);
  const activeAyahRef = useRef(null);

  // Fetch ayah texts for the active surah:
  // https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/{surah}.json
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoadingVerses(true);
      setVersesError("");
      try {
        const res = await fetch(
          `https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/${surahNum}.json`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        const list = Array.isArray(data.verses) ? data.verses : [];
        const total = data.total_verses || AYAH_COUNTS[surahNum - 1] || list.length;
        setVerses(list);
        setTotalVerses(total);
        setFromAyah(1);
        setToAyah(Math.min(7, total));
        stopPlayback();
      } catch (e) {
        if (!cancelled) {
          setVersesError("تعذر تحميل نص الآيات. تحقق من الاتصال بالإنترنت.");
          const fallbackTotal = AYAH_COUNTS[surahNum - 1] || 7;
          setTotalVerses(fallbackTotal);
          setVerses([]);
        }
      } finally {
        if (!cancelled) setLoadingVerses(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surahNum]);

  // Keep playbackRate in sync
  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, [speed, currentAyah, isActive]);

  // Drive the <audio> element whenever the current ayah changes
  useEffect(() => {
    if (!isActive || currentAyah == null || !audioRef.current) return;
    const gid = globalAyahId(surahNum, currentAyah);
    audioRef.current.src = `https://cdn.islamic.network/quran/audio/128/${edition}/${gid}.mp3`;
    audioRef.current.playbackRate = speed;
    setAudioError("");
    audioRef.current.play().catch((e) => {
      console.error("Ayah playback error:", e);
      setAudioError("تعذر تشغيل صوت هذه الآية. جرب قارئًا آخر.");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, currentAyah, edition, surahNum]);

  // Auto-scroll the active ayah into view
  useEffect(() => {
    if (isActive && activeAyahRef.current) {
      activeAyahRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [currentAyah, isActive]);

  const clampInterval = (from, to) => {
    let f = Math.max(1, Math.min(totalVerses, Math.floor(Number(from) || 1)));
    let t = Math.max(1, Math.min(totalVerses, Math.floor(Number(to) || 1)));
    if (f > t) [f, t] = [t, f];
    return [f, t];
  };

  const startPlayback = () => {
    const [f, t] = clampInterval(fromAyah, toAyah);
    setFromAyah(f);
    setToAyah(t);
    setLoopCount(1);
    setCurrentAyah(f);
    setIsActive(true);
  };

  const stopPlayback = () => {
    setIsActive(false);
    setCurrentAyah(null);
    if (audioRef.current) audioRef.current.pause();
  };

  const handleAyahEnded = () => {
    if (!isActive || currentAyah == null) return;
    if (currentAyah < toAyah) {
      setCurrentAyah(currentAyah + 1);
    } else {
      // Finished one full pass over [from, to]
      if (infiniteRepeat || loopCount < repeatTimes) {
        setLoopCount((c) => c + 1);
        setCurrentAyah(fromAyah);
      } else {
        stopPlayback();
      }
    }
  };

  const stepAyah = (dir) => {
    if (currentAyah == null) return;
    const next = currentAyah + dir;
    if (next >= fromAyah && next <= toAyah) setCurrentAyah(next);
  };

  const ayahText = useMemo(() => {
    const map = new Map(verses.map((v) => [Number(v.id), v.text]));
    return map;
  }, [verses]);

  const intervalLabel = useMemo(() => {
    if (currentAyah == null) return `الآيات ${fromAyah} - ${toAyah}`;
    return `الآية ${currentAyah} من ${fromAyah}-${toAyah}`;
  }, [currentAyah, fromAyah, toAyah]);

  const progress = useMemo(() => {
    if (currentAyah == null) return 0;
    const span = Math.max(1, toAyah - fromAyah + 1);
    return Math.min(100, Math.max(0, ((currentAyah - fromAyah + 1) / span) * 100));
  }, [currentAyah, fromAyah, toAyah]);

  const chipClass = (selected) =>
    `chip-btn ${selected
      ? "bg-primary text-on-primary-fixed border-primary shadow-[0_0_16px_rgba(117,255,158,0.35)]"
      : "bg-white/5 text-on-surface-variant border-white/10 hover:border-primary/40 hover:text-on-surface"
    }`;

  return (
    <section aria-label={`التكرار والحفظ — سورة ${surahArabicName}`} className="w-full max-w-2xl glass-card rounded-3xl p-5 sm:p-6 md:p-7 flex flex-col gap-5 md:gap-6 text-right">
      {/* Hidden per-ayah audio node */}
      <audio ref={audioRef} preload="none" onEnded={handleAyahEnded} onError={() => setAudioError("تعذر تحميل الصوت لهذه الآية.")} />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl" aria-hidden="true">repeat</span>
          </span>
          <div>
            <h3 className="font-bold text-on-surface text-sm md:text-base leading-tight">التكرار والحفظ</h3>
            <p className="text-xs text-on-surface-variant mt-0.5">سورة {surahArabicName} • {totalVerses} آية</p>
          </div>
        </div>
        <span aria-live="polite" className={`text-xs text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5 font-bold ${isActive ? "" : "opacity-70"}`}>
          {isActive ? `${intervalLabel} • التكرار ${infiniteRepeat ? "∞" : `${loopCount}/${repeatTimes}`}` : `المجال ${fromAyah} - ${toAyah}`}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="تقدم التكرار في المجال">
        <div className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
        اختر مجال الآيات (من — إلى)، ثم شغّلها بالتتابع مع التحكم في السرعة وعدد مرات التكرار.
      </p>

      {/* From / To selectors */}
      <fieldset className="grid grid-cols-2 gap-3">
        <legend className="sr-only">مجال الآيات</legend>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ayah-from" className="text-xs font-bold text-on-surface">من آية</label>
          <select
            id="ayah-from"
            value={fromAyah}
            disabled={isActive || loadingVerses}
            onChange={(e) => {
              const [f, t] = clampInterval(Number(e.target.value), toAyah);
              setFromAyah(f);
              setToAyah(t);
            }}
            className="input-field cursor-pointer"
          >
            {Array.from({ length: totalVerses }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                آية {n}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ayah-to" className="text-xs font-bold text-on-surface">إلى آية</label>
          <select
            id="ayah-to"
            value={toAyah}
            disabled={isActive || loadingVerses}
            onChange={(e) => {
              const [f, t] = clampInterval(fromAyah, Number(e.target.value));
              setFromAyah(f);
              setToAyah(t);
            }}
            className="input-field cursor-pointer"
          >
            {Array.from({ length: totalVerses }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                آية {n}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      {/* Edition + Speed */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ayah-edition" className="text-xs font-bold text-on-surface">القارئ</label>
          <select
            id="ayah-edition"
            value={edition}
            onChange={(e) => setEdition(e.target.value)}
            className="input-field cursor-pointer"
          >
            {EDITIONS.map((e) => (
              <option key={e.id} value={e.id}>
                {e.label}
              </option>
            ))}
          </select>
        </div>
        <fieldset>
          <legend className="text-xs font-bold text-on-surface mb-1.5">السرعة: <span className="text-primary">{speed}x</span></legend>
          <div className="flex flex-wrap gap-2" role="group" aria-label="سرعة التشغيل">
            {SPEEDS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSpeed(s)}
                aria-pressed={speed === s}
                className={chipClass(speed === s)}
              >
                {s}x
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Repeat controls */}
      <fieldset>
        <legend className="text-xs font-bold text-on-surface mb-1.5">
          عدد مرات التكرار {infiniteRepeat ? "(مستمر ∞)" : `(${repeatTimes})`}
        </legend>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="عدد مرات التكرار">
          {REPEAT_OPTIONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setRepeatTimes(r);
                setInfiniteRepeat(false);
              }}
              aria-pressed={!infiniteRepeat && repeatTimes === r}
              className={chipClass(!infiniteRepeat && repeatTimes === r)}
            >
              {r}x
            </button>
          ))}
          <button
            type="button"
            onClick={() => setInfiniteRepeat(!infiniteRepeat)}
            aria-pressed={infiniteRepeat}
            title="تكرار مستمر بدون توقف"
            className={chipClass(infiniteRepeat)}
          >
            ∞ مستمر
          </button>
        </div>
      </fieldset>

      {/* Transport */}
      <div className="flex items-center justify-center gap-3 pt-1">
        <button
          type="button"
          onClick={() => stepAyah(-1)}
          disabled={!isActive}
          aria-label="الآية السابقة في المجال"
          className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full border border-white/10 text-on-surface-variant hover:text-on-surface hover:border-primary/40 flex items-center justify-center transition-colors duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-xl" aria-hidden="true">skip_next</span>
        </button>
        {!isActive ? (
          <button
            type="button"
            onClick={startPlayback}
            disabled={loadingVerses}
            className="min-h-[48px] px-7 rounded-full bg-primary text-on-primary-fixed font-bold text-sm flex items-center gap-2 shadow-lg hover:brightness-110 active:brightness-95 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
              play_arrow
            </span>
            تشغيل الآيات {fromAyah}-{toAyah}
          </button>
        ) : (
          <button
            type="button"
            onClick={stopPlayback}
            className="min-h-[48px] px-7 rounded-full bg-surface border border-error/40 text-error font-bold text-sm flex items-center gap-2 hover:bg-error/10 transition-colors duration-200 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl" aria-hidden="true">stop</span>
            إيقاف التكرار
          </button>
        )}
        <button
          type="button"
          onClick={() => stepAyah(1)}
          disabled={!isActive}
          aria-label="الآية التالية في المجال"
          className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full border border-white/10 text-on-surface-variant hover:text-on-surface hover:border-primary/40 flex items-center justify-center transition-colors duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-xl" aria-hidden="true">skip_previous</span>
        </button>
      </div>

      {audioError && <p role="alert" className="text-xs text-error text-center bg-error/10 border border-error/20 rounded-xl px-3 py-2">{audioError}</p>}
      {versesError && <p role="alert" className="text-xs text-error text-center bg-error/10 border border-error/20 rounded-xl px-3 py-2">{versesError}</p>}

      {/* Ayah list */}
      <div aria-live="polite" aria-busy={loadingVerses} className="bg-black/40 rounded-2xl border border-white/10 max-h-72 overflow-y-auto p-3 space-y-2">
        {loadingVerses && (
          <div className="space-y-2 p-1" aria-label="جاري تحميل الآيات">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-start gap-3 px-3 py-2.5">
                <div className="skeleton w-7 h-7 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-4 rounded-lg w-full" />
                  <div className="skeleton h-4 rounded-lg w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}
        {!loadingVerses &&
          Array.from({ length: toAyah - fromAyah + 1 }, (_, i) => fromAyah + i).map((n) => {
            const text = ayahText.get(n);
            const active = n === currentAyah && isActive;
            return (
              <button
                key={n}
                type="button"
                ref={active ? activeAyahRef : null}
                aria-current={active ? "true" : undefined}
                aria-label={`آية ${n}${active ? " — تُشغَّل الآن" : ""}`}
                onClick={() => {
                  const [f, t] = clampInterval(fromAyah, toAyah);
                  if (n >= f && n <= t && isActive) setCurrentAyah(n);
                }}
                className={`w-full text-right px-3 py-3 rounded-xl border transition-colors duration-200 cursor-pointer flex items-start gap-3 min-h-[52px] ${
                  active
                    ? "bg-primary/10 border-primary/40"
                    : "bg-transparent border-transparent hover:bg-white/5 hover:border-white/10"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border ${
                    active ? "bg-primary text-on-primary-fixed border-primary" : "text-primary border-primary/30"
                  }`}
                >
                  {n}
                </span>
                <span className={`font-quran text-base md:text-lg leading-9 ${active ? "text-white" : "text-on-surface"}`}>
                  {text || `آية ${n} — النص غير محمّل`}
                </span>
                {active && <span aria-hidden="true" className="mr-auto mt-2.5 w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />}
              </button>
            );
          })}
      </div>
    </section>
  );
}
