"use client";

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.81a8.23 8.23 0 0 0 4.76 1.5v-3.4a4.85 4.85 0 0 1-1-.22z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

export default function Footer() {
  return (
    <footer className="relative bg-[var(--v2-bg)]">
      {/* Top gradient line */}
      <div
        className="h-[2px] w-full"
        style={{
          background:
            "linear-gradient(90deg, #833AB4, #C13584, #E1306C, #F77737, #FCAF45)",
        }}
      />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* Three columns (desktop) / stacked (mobile) */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-4">
          {/* Left — identity */}
          <div className="text-center md:text-left">
            <p className="font-[family-name:var(--font-mono)] text-[var(--v2-text)] text-base md:text-lg tracking-wide">
              @jasnauskaite
            </p>
            <p className="font-[family-name:var(--font-body)] text-[var(--v2-text-muted)] text-sm mt-1">
              Content Creator
            </p>
          </div>

          {/* Center — social links */}
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/jasnauskaite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--v2-text-muted)] hover:text-[var(--v2-ig-magenta)] transition-colors duration-300"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-6 h-6" />
            </a>
            <a
              href="https://tiktok.com/@jasnauskaite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--v2-text-muted)] hover:text-[var(--v2-ig-magenta)] transition-colors duration-300"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-6 h-6" />
            </a>
          </div>

          {/* Right — contact */}
          <div className="text-center md:text-right">
            <a
              href="mailto:osvaldas@reelize.lt"
              className="font-[family-name:var(--font-mono)] text-[var(--v2-text-muted)] hover:text-[var(--v2-ig-magenta)] text-sm tracking-wide transition-colors"
            >
              osvaldas@reelize.lt
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-[var(--v2-border)]">
          <p className="text-center font-[family-name:var(--font-body)] text-[var(--v2-text-muted)]/40 text-xs tracking-wide">
            &copy; 2026 Inidė Jasnauskaitė-Jonaitė
          </p>
        </div>
      </div>
    </footer>
  );
}
