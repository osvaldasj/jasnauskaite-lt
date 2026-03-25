"use client";

import { motion } from "framer-motion";
import { useTranslation, type Language } from "@/lib/i18n";

const languages: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "lt", label: "LT" },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="relative flex items-center gap-1 font-[family-name:var(--font-inter)] text-xs">
      {languages.map((lang) => {
        const isActive = language === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`relative px-2 py-1 rounded transition-colors duration-200 cursor-pointer ${
              isActive
                ? "text-[var(--foreground)] font-medium"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
            aria-label={`Switch to ${lang.label}`}
            aria-current={isActive ? "true" : undefined}
          >
            {lang.label}
            {isActive && (
              <motion.span
                layoutId="lang-indicator"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-4 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #833AB4, #C13584, #F77737)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
