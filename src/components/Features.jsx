import React from "react";

export default function Features() {
  const features = [
    {
      icon: "menu_book",
      title: "مصحف متكامل",
      description: "قراءة القرآن الكريم بخطوط عثمانية واضحة مع إمكانية تغيير أحجام الخطوط وأنماط القراءة الليلية.",
      colorClass: "bg-primary/10 text-primary group-hover:border-primary/30",
      targetId: "hero",
    },
    {
      icon: "record_voice_over",
      title: "أشهر القراء",
      description: "استمع إلى تلاوات خاشعة بأصوات أكثر من 100 قارئ من مختلف دول العالم الإسلامي بجودة عالية.",
      colorClass: "bg-secondary/10 text-secondary group-hover:border-secondary/30",
      targetId: "reciters",
    },
    {
      icon: "analytics",
      title: "إحصائيات دقيقة",
      description: "تتبع تقدمك اليومي في الحفظ والتلاوة من خلال رسوم بيانية وتحليلات ذكية لأدائك.",
      colorClass: "bg-error/10 text-error group-hover:border-error/30",
      targetId: "stats",
    },
  ];

  const handleCardClick = (targetId) => {
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="features" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-stack-md">
          مميزات ذكية لروحانية أعمق
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Render standard cards */}
        {features.map((feat, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(feat.targetId)}
            onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && feat.targetId) { e.preventDefault(); handleCardClick(feat.targetId); } }}
            role={feat.targetId ? "button" : undefined}
            tabIndex={feat.targetId ? 0 : undefined}
            aria-label={feat.targetId ? `${feat.title} — انتقل إلى القسم` : feat.title}
            className={`glass-card p-6 md:p-8 rounded-2xl group hover:border-primary/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] transition-colors duration-200 ${feat.targetId ? "cursor-pointer" : ""}`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feat.colorClass.split(" ")[0]} ${feat.colorClass.split(" ")[1]}`}>
              <span className="material-symbols-outlined text-3xl" aria-hidden="true">{feat.icon}</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{feat.title}</h3>
            <p className="text-on-surface-variant font-body-md leading-relaxed">{feat.description}</p>
          </div>
        ))}

        {/* Feature 4 (Large Bento Item) */}
        <div className="glass-card p-6 md:p-8 rounded-2xl group hover:border-primary/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] transition-colors duration-200 md:col-span-2 overflow-hidden relative">
          <div className="relative z-10 max-w-lg">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined text-3xl" aria-hidden="true">local_fire_department</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">التحدي والتحفيز</h3>
            <p className="text-on-surface-variant font-body-md leading-relaxed">
              نظام الأوسمة والإنجازات يحفزك على المداومة اليومية، مع ميزة التنبيهات الذكية التي تذكرك بأورادك في الوقت المناسب.
            </p>
          </div>
        </div>

        {/* Feature 5 */}
        <div className="glass-card p-6 md:p-8 rounded-2xl group hover:border-primary/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] transition-colors duration-200">
          <div className="w-12 h-12 rounded-xl bg-on-tertiary-fixed-variant/10 flex items-center justify-center text-on-tertiary-fixed-variant mb-4">
            <span className="material-symbols-outlined text-3xl" aria-hidden="true">sync</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">مزامنة سحابية</h3>
          <p className="text-on-surface-variant font-body-md leading-relaxed">
            جميع بياناتك محفوظة ومزامنة بين كافة أجهزتك بشكل آمن ومشفر تماماً.
          </p>
        </div>
      </div>
    </section>
  );
}
