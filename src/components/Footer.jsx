import React from "react";

export default function Footer() {
  const handleScroll = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full py-16 bg-surface border-t border-white/5 pb-[100px]">
      <div className="flex flex-col items-center justify-center space-y-stack-lg px-4 md:px-margin-desktop w-full mx-auto max-w-container-max">
        
        {/* Footer Logo */}
        <div
          onClick={(e) => handleScroll(e, "#hero")}
          className="font-headline-md text-headline-md font-bold text-primary cursor-pointer hover:opacity-85 transition-opacity"
        >
          مبين
        </div>

        {/* Footer Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-stack-lg">
          <a className="text-on-surface-variant hover:text-secondary transition-colors duration-200 font-label-sm text-label-sm" href="#">
            سياسة الخصوصية
          </a>
          <a className="text-on-surface-variant hover:text-secondary transition-colors duration-200 font-label-sm text-label-sm" href="#">
            شروط الاستخدام
          </a>
          <a className="text-on-surface-variant hover:text-secondary transition-colors duration-200 font-label-sm text-label-sm" href="#">
            اتصل بنا
          </a>
        </div>

        {/* Social media SVGs */}
        <div className="flex gap-stack-md pt-4">
          <a
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors hover:border-primary/30"
            href="#"
            aria-label="Twitter"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
          </a>
          <a
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors hover:border-primary/30"
            href="#"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0.013-3.583 0.07-4.849 0.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259 0.014 3.668 0.072 4.948 0.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98 0.059-1.28 0.073-1.689 0.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
            </svg>
          </a>
        </div>

        <p className="text-label-sm text-on-surface-variant font-body-md opacity-60 text-center">
          © 2026 مبين. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
