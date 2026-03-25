"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useTranslation, type Language } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/*  Nav links config                                                   */
/* ------------------------------------------------------------------ */

const navLinks = [
  { labelKey: "nav.portfolio", href: "/#work" },
  { labelKey: "nav.ourWork", href: "/#services" },
  { labelKey: "nav.insights", href: "/insights" },
  { labelKey: "nav.links", href: "/links" },
  { labelKey: "nav.collaborate", href: "/#contact" },
];

/* ------------------------------------------------------------------ */
/*  Theme toggle (inline, v2-styled)                                   */
/* ------------------------------------------------------------------ */

function V2ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-8 h-8" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-8 h-8 flex items-center justify-center rounded-full text-[var(--v2-text-muted)] hover:text-[var(--v2-text)] transition-colors cursor-pointer"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        key={isDark ? "sun" : "moon"}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {isDark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </>
        ) : (
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        )}
      </motion.svg>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Language switcher (v2-styled)                                       */
/* ------------------------------------------------------------------ */

function V2LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();
  const langs: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "lt", label: "LT" },
  ];

  return (
    <div className="flex items-center gap-0.5 text-xs font-[family-name:var(--font-mono)]">
      {langs.map((lang, i) => (
        <span key={lang.code} className="flex items-center">
          {i > 0 && (
            <span className="text-[var(--v2-border)] mx-1">|</span>
          )}
          <button
            onClick={() => setLanguage(lang.code)}
            className={`px-1 py-0.5 transition-colors cursor-pointer ${
              language === lang.code
                ? "v2-gradient-text font-medium"
                : "text-[var(--v2-text-muted)] hover:text-[var(--v2-text)]"
            }`}
            aria-label={`Switch language to ${lang.label}`}
            aria-current={language === lang.code ? "true" : undefined}
          >
            {lang.label}
          </button>
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile menu                                                        */
/* ------------------------------------------------------------------ */

function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: "var(--v2-bg)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-[var(--v2-text)] cursor-pointer"
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Nav links */}
          <nav className="flex flex-col items-center gap-10">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith("#")) {
                    e.preventDefault();
                    onClose();
                    setTimeout(() => {
                      const target = document.querySelector(link.href);
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }, 350);
                  } else {
                    onClose();
                  }
                }}
                className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] font-semibold text-[var(--v2-text)] hover:v2-gradient-text transition-colors"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {t(link.labelKey)}
              </motion.a>
            ))}
          </nav>

          {/* Bottom controls */}
          <motion.div
            className="absolute bottom-10 flex items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <V2LanguageSwitcher />
            <V2ThemeToggle />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Hamburger icon                                                     */
/* ------------------------------------------------------------------ */

function HamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] cursor-pointer"
      aria-label="Open menu"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block w-5 h-[1.5px] bg-[var(--v2-text)] rounded-full"
        />
      ))}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Nav link with gradient underline hover                             */
/* ------------------------------------------------------------------ */

function NavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    },
    [href]
  );

  return (
    <a
      href={href}
      onClick={handleClick}
      className="relative text-xs uppercase tracking-[0.2em] text-[var(--v2-text)]/70 hover:text-[var(--v2-text)] transition-colors font-[family-name:var(--font-body)] py-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      <motion.span
        className="absolute bottom-0 left-0 right-0 h-[1.5px] rounded-full"
        style={{ background: "var(--v2-gradient)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 100);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 px-6 md:px-12 transition-colors duration-300 ${
          scrolled
            ? "bg-[var(--v2-bg)]/80 backdrop-blur-xl border-b border-[var(--v2-border)]"
            : "bg-transparent"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto max-w-7xl h-16 md:h-20 flex items-center justify-between">
          {/* Left — handle */}
          <a
            href="#"
            className="text-xs md:text-sm font-[family-name:var(--font-mono)] text-[var(--v2-text)] hover:text-[var(--v2-ig-magenta)] transition-colors"
          >
            @jasnauskaite
          </a>

          {/* Center — desktop nav links */}
          <nav className="hidden md:flex items-center gap-8" role="navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={t(link.labelKey)}
              />
            ))}
          </nav>

          {/* Right — controls */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <V2LanguageSwitcher />
            </div>
            <div className="hidden md:block">
              <V2ThemeToggle />
            </div>
            <HamburgerButton onClick={() => setMenuOpen(true)} />
          </div>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
