import React, { useState } from "react";
import textLogo from "../assets/text_logo.png";

export default function Navbar({ currentUser, onLogout, onOpenAuth, currentView, onViewChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "الرئيسية", href: "#hero" },
    { label: "المميزات", href: "#features" },
    { label: "الإحصائيات", href: "#stats" },
    { label: "إستماع", href: "#listen" },
    { label: "تحميل", href: "#download" },
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (href === "#listen") {
      onViewChange("listen");
      return;
    }

    onViewChange("landing");
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 80);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-2xl border-b border-white/10 shadow-[0px_20px_40px_rgba(0,0,0,0.4)]">
      <div className="flex justify-between items-center w-full px-4 md:px-margin-desktop py-4 md:py-6 max-w-container-max mx-auto">
        
        {/* Logo */}
        <div id="nav-logo" className="flex items-center cursor-pointer" onClick={(e) => handleScroll(e, "#hero")}>
          <img src={textLogo} alt="مبين" className="h-8 md:h-9 w-auto" />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-stack-lg items-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              id={`nav-link-${link.href.replace('#', '')}`}
              className={`transition-colors duration-300 font-label-sm text-label-sm ${
                link.href === "#listen" && currentView === "listen"
                  ? "text-primary font-bold"
                  : "text-on-surface/70 hover:text-primary"
              }`}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions / Auth Display */}
        <div className="hidden md:flex gap-stack-md items-center">
          {currentUser ? (
            <div className="flex items-center gap-4">
              <span className="text-secondary font-bold text-sm">مرحباً، {currentUser.name}</span>
              <button
                id="nav-logout-btn"
                onClick={onLogout}
                className="px-5 py-2 rounded-full border border-error text-error hover:bg-error/10 transition-all font-label-sm text-label-sm"
              >
                تسجيل الخروج
              </button>
            </div>
          ) : (
            <button
              id="nav-login-btn"
              onClick={onOpenAuth}
              className="px-6 py-2 rounded-full border border-secondary text-secondary hover:bg-secondary/10 transition-colors font-label-sm text-label-sm"
            >
              تسجيل الدخول
            </button>
          )}
          <a
            id="nav-download-btn"
            href="#download"
            onClick={(e) => handleScroll(e, "#download")}
            className="px-6 py-2 rounded-full bg-primary-container text-on-primary-container font-bold hover:opacity-90 active:scale-95 transition-transform font-label-sm text-label-sm"
          >
            تحميل التطبيق
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          id="nav-burger-btn"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-on-surface hover:text-primary transition-colors flex items-center"
        >
          <span className="material-symbols-outlined text-3xl">
            {isOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-background/95 border-b border-white/10 px-6 py-4 flex flex-col gap-4 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.href}
              id={`nav-link-mobile-${link.href.replace('#', '')}`}
              className={`transition-colors py-2 border-b border-white/5 font-label-sm text-label-sm ${
                link.href === "#listen" && currentView === "listen"
                  ? "text-primary font-bold"
                  : "text-on-surface/80 hover:text-primary"
              }`}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-2">
            {currentUser ? (
              <div className="flex flex-col gap-2">
                <span className="text-secondary font-bold text-center text-sm">مرحباً، {currentUser.name}</span>
                <button
                  id="nav-logout-btn-mobile"
                  onClick={() => {
                    setIsOpen(false);
                    onLogout();
                  }}
                  className="w-full py-2.5 rounded-full border border-error text-error hover:bg-error/10 transition-all font-label-sm text-label-sm"
                >
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <button
                id="nav-login-btn-mobile"
                onClick={() => {
                  setIsOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 rounded-full border border-secondary text-secondary hover:bg-secondary/10 transition-colors font-label-sm text-label-sm"
              >
                تسجيل الدخول
              </button>
            )}
            <a
              id="nav-download-btn-mobile"
              href="#download"
              onClick={(e) => handleScroll(e, "#download")}
              className="w-full py-2.5 text-center rounded-full bg-primary-container text-on-primary-container font-bold hover:opacity-90 active:scale-95 transition-transform font-label-sm text-label-sm"
            >
              تحميل التطبيق
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
