import React from "react";
import qrCode from "../assets/qr-code.png";

export default function DownloadCTA() {
  return (
    <section id="download" className="py-section-gap px-4 md:px-margin-desktop">
      <div className="max-w-container-max mx-auto bg-gradient-to-br from-surface-container-highest via-surface-container-high to-surface p-8 md:p-12 rounded-[40px] relative overflow-hidden border border-primary/20 shadow-2xl shadow-primary/5">
        {/* Glowing background blooms */}
        <div className="absolute -top-24 -left-24 w-[300px] h-[300px] bg-primary bloom-effect rounded-full opacity-10"></div>
        <div className="absolute -bottom-24 -right-24 w-[300px] h-[300px] bg-secondary bloom-effect rounded-full opacity-10"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Badge links and description (Right side, RTL) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-label-sm text-xs font-bold uppercase tracking-wider">
              متوفر الآن للهواتف الذكية
            </span>
            
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface leading-tight">
              احمل مصحفك معك <br/>
              <span className="text-primary bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">في كل مكان وزمان</span>
            </h2>
            
            <p className="text-on-surface-variant font-body-lg text-base md:text-lg leading-relaxed max-w-2xl">
              ابدأ رحلتك الروحانية اليوم وكن من المداومين على تلاوة كتاب الله وتتبع حفظك. تطبيق مبين يوفر لك واجهة خلابة، إحصائيات دقيقة، وتلاوات خاشعة بدون اتصال بالإنترنت.
            </p>
            
            {/* Platforms and badging - Redesigned to show Direct APK only */}
            <div className="flex flex-wrap gap-4 pt-4 justify-end items-center">
              {/* Direct APK Link */}
              <a
                id="download-apk-btn"
                href="https://github.com/Ab0raya/mubin-web-app/releases/download/mubin/mubin.apk"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl border border-white/10 bg-primary text-on-primary font-bold text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-lg glow-primary"
              >
                <span className="material-symbols-outlined font-bold">android</span>
                تحميل مباشر APK
              </a>
            </div>
          </div>

          {/* QR code scanner area (Left side, RTL) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
            <div className="p-6 bg-surface-container rounded-[32px] border border-white/10 shadow-2xl relative group flex flex-col items-center justify-center max-w-[280px] w-full">
              
              {/* Glowing ring behind QR on hover */}
              <div className="absolute inset-0 rounded-[32px] bg-primary opacity-0 group-hover:opacity-5 transition-opacity blur-xl"></div>
              
              {/* QR Container */}
              <div className="p-2.5 bg-white rounded-2xl w-52 h-52 shadow-inner transform group-hover:scale-105 transition-transform duration-500 border border-white/15 relative z-10 flex items-center justify-center">
                <img
                  className="w-full h-full object-contain"
                  alt="Mobin App QR Code"
                  src={qrCode}
                />
              </div>
              
              <div className="text-center mt-4">
                <span className="text-xs font-bold text-secondary tracking-widest block uppercase">QR Code</span>
                <p className="text-[11px] text-on-surface-variant mt-1">
                  امسح الكود بكاميرا الهاتف للتحميل السريع
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
