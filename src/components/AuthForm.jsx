import React, { useState } from "react";

export default function AuthForm({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email || !password || (isSignUp && !name)) {
      setErrorMsg("الرجاء تعبئة كافة الحقول المطلوبة.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("يجب أن تكون كلمة المرور 6 خانات على الأقل.");
      return;
    }

    if (isSignUp) {
      // Mock Registration
      const user = { name, email, password };
      try {
        localStorage.setItem(`mobin_user_${email}`, JSON.stringify(user));
        setSuccessMsg("تم إنشاء الحساب بنجاح! يتم الآن تسجيل دخولك...");
        setTimeout(() => {
          onLoginSuccess(user);
        }, 1500);
      } catch (err) {
        setErrorMsg("حدث خطأ أثناء حفظ البيانات.");
      }
    } else {
      // Mock Login
      try {
        const stored = localStorage.getItem(`mobin_user_${email}`);
        if (!stored) {
          setErrorMsg("لم يتم العثور على هذا البريد الإلكتروني. الرجاء التسجيل أولاً.");
          return;
        }
        const user = JSON.parse(stored);
        if (user.password !== password) {
          setErrorMsg("كلمة المرور غير صحيحة.");
          return;
        }
        setSuccessMsg("تم تسجيل الدخول بنجاح!");
        setTimeout(() => {
          onLoginSuccess(user);
        }, 1200);
      } catch (err) {
        setErrorMsg("حدث خطأ أثناء تسجيل الدخول.");
      }
    }
  };

  return (
    <section id="auth" className="py-section-gap px-4 md:px-margin-desktop max-w-container-max mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-stack-lg items-center">
        
        {/* Auth form card */}
        <div className="glass-card p-6 md:p-stack-lg rounded-[32px] max-w-md mx-auto w-full border border-secondary/20 shadow-2xl relative">
          
          <div className="flex border-b border-white/10 mb-6 justify-center gap-6">
            <button
              id="auth-tab-signup"
              onClick={() => {
                setIsSignUp(true);
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className={`pb-3 font-bold text-sm md:text-base border-b-2 transition-all ${
                isSignUp ? "text-primary border-primary" : "text-on-surface-variant border-transparent"
              }`}
            >
              إنشاء حساب جديد
            </button>
            <button
              id="auth-tab-signin"
              onClick={() => {
                setIsSignUp(false);
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className={`pb-3 font-bold text-sm md:text-base border-b-2 transition-all ${
                !isSignUp ? "text-primary border-primary" : "text-on-surface-variant border-transparent"
              }`}
            >
              تسجيل الدخول
            </button>
          </div>

          <h3 className="font-headline-md text-headline-md text-on-surface mb-6 text-center">
            {isSignUp ? "انضم إلى مجتمع مبين" : "أهلاً بك مجدداً"}
          </h3>

          {errorMsg && (
            <div className="mb-4 p-3 bg-error/10 border border-error/30 text-error rounded-xl text-xs text-right">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-primary/10 border border-primary/30 text-primary rounded-xl text-xs text-right">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-stack-md text-right">
            {isSignUp && (
              <div>
                <label className="block text-label-sm text-on-surface-variant mb-1.5">الاسم الكامل</label>
                <input
                  id="auth-name-input"
                  className="w-full bg-[#071F18] border border-[#0D2B22] text-on-surface rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all text-right"
                  placeholder="محمد عبد الله"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div>
              <label className="block text-label-sm text-on-surface-variant mb-1.5">البريد الإلكتروني</label>
              <input
                id="auth-email-input"
                className="w-full bg-[#071F18] border border-[#0D2B22] text-on-surface rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all text-right"
                placeholder="example@mail.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-label-sm text-on-surface-variant mb-1.5">كلمة المرور</label>
              <input
                id="auth-password-input"
                className="w-full bg-[#071F18] border border-[#0D2B22] text-on-surface rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all text-right"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              id="auth-submit-btn"
              type="submit"
              className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl mt-4 hover:scale-[1.02] active:scale-95 transition-transform"
            >
              {isSignUp ? "إنشاء حساب جديد" : "تسجيل الدخول"}
            </button>
          </form>

          {/* Social Auth Providers */}
          <div className="flex items-center gap-2 py-4">
            <div className="flex-1 h-px bg-white/5"></div>
            <span className="text-label-sm text-on-surface-variant">أو عبر</span>
            <div className="flex-1 h-px bg-white/5"></div>
          </div>
          
          <div className="flex gap-2">
            <button
              id="auth-google-btn"
              onClick={() => onLoginSuccess({ name: "مستخدم جوجل", email: "google@user.com" })}
              className="flex-1 py-3 border border-white/10 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-colors text-sm text-on-surface-variant"
            >
              <span className="material-symbols-outlined text-lg">google</span>
              Google
            </button>
            <button
              id="auth-apple-btn"
              onClick={() => onLoginSuccess({ name: "مستخدم أبل", email: "apple@user.com" })}
              className="flex-1 py-3 border border-white/10 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-colors text-sm text-on-surface-variant"
            >
              <span className="material-symbols-outlined text-lg">apps</span>
              Apple
            </button>
          </div>

          {/* Download App redirect link prompt */}
          <div className="text-center mt-6 pt-4 border-t border-white/10">
            <p className="text-xs text-on-surface-variant font-medium">
              تفضل استخدام تطبيق الهاتف المحمول؟{" "}
              <button
                id="auth-go-to-download-btn"
                type="button"
                onClick={() => {
                  const el = document.getElementById("download");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-primary font-bold hover:underline inline-flex items-center gap-1 focus:outline-none"
              >
                <span>حمّله الآن مجاناً</span>
                <span className="material-symbols-outlined text-xs font-bold">download</span>
              </button>
            </p>
          </div>
        </div>

        {/* Benefits list */}
        <div className="lg:pr-stack-lg space-y-stack-md text-right w-full">
          <div className="p-stack-md glass-card rounded-2xl flex items-center gap-stack-md justify-between border border-white/5 hover:border-primary/20 transition-all duration-300">
            <div className="text-right">
              <h4 className="font-bold text-on-surface">بياناتك في أمان</h4>
              <p className="text-on-surface-variant text-sm mt-1">تشفير تام لكل بيانات التلاوة والحفظ الخاصة بك.</p>
            </div>
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary flex-shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
            </div>
          </div>

          <div className="p-stack-md glass-card rounded-2xl flex items-center gap-stack-md justify-between border border-white/5 hover:border-secondary/20 transition-all duration-300">
            <div className="text-right">
              <h4 className="font-bold text-on-surface">مزايا حصرية للمشتركين</h4>
              <p className="text-on-surface-variant text-sm mt-1">وصول غير محدود لكل القراء والتفاسير المتميزة.</p>
            </div>
            <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center text-secondary flex-shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                workspace_premium
              </span>
            </div>
          </div>

          {/* Redesigned third card: Download CTA Card in Auth benefits list */}
          <div className="p-stack-md bg-gradient-to-br from-surface-container-highest to-surface rounded-2xl flex flex-col md:flex-row md:items-center justify-between border border-primary/20 hover:border-primary/40 transition-all duration-300 gap-4">
            <div className="text-right flex-1">
              <h4 className="font-bold text-primary flex items-center gap-1.5 justify-end">
                <span>تطبيق مبين للهواتف الذكية</span>
                <span className="material-symbols-outlined text-sm font-bold">smartphone</span>
              </h4>
              <p className="text-on-surface-variant text-sm mt-1">
                تصفح مصحفك، تتبع إنجازاتك اليومية، واستمع لقارئك المفضل مباشرة من جوالك.
              </p>
            </div>
            <button
              id="auth-download-app-btn"
              type="button"
              onClick={() => {
                const el = document.getElementById("download");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-1.5 shrink-0 self-end md:self-auto shadow-md shadow-primary/10"
            >
              <span className="material-symbols-outlined text-sm font-bold">download</span>
              تحميل التطبيق مجاناً
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
