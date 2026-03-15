"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { en, lt, type TranslationKeys } from "@/translations";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Language = "en" | "lt";

interface I18nContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// ---------------------------------------------------------------------------
// Translations map
// ---------------------------------------------------------------------------

const translations: Record<Language, TranslationKeys> = { en, lt };

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const STORAGE_KEY = "jasnauskaite-lang";

/**
 * Resolve a dot-notation key like "hero.description" against a nested object.
 * Returns the value if it's a string, or the key itself as a fallback.
 */
function resolve(obj: Record<string, unknown>, path: string): string {
  const parts = path.split(".");
  let current: unknown = obj;

  for (const part of parts) {
    if (current === null || current === undefined) return path;
    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === "string" ? current : path;
}

/**
 * Detect initial language:
 * 1. localStorage (returning visitor)
 * 2. Browser language (navigator.language)
 * 3. Fallback to "en"
 */
function detectLanguage(): Language {
  // Check localStorage
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "lt") return stored;
  }

  // Check browser language
  if (typeof navigator !== "undefined") {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("lt")) return "lt";
  }

  return "en";
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const LanguageContext = createContext<I18nContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export function LanguageProvider({
  children,
  defaultLanguage,
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(
    defaultLanguage ?? "en"
  );
  const [hydrated, setHydrated] = useState(false);

  // After hydration, detect stored / browser language
  useEffect(() => {
    if (!defaultLanguage) {
      setLanguageState(detectLanguage());
    }
    setHydrated(true);
  }, [defaultLanguage]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, lang);
    }
    // Update html lang attribute
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      return resolve(
        translations[language] as unknown as Record<string, unknown>,
        key
      );
    },
    [language]
  );

  // Prevent hydration mismatch: render children only after client-side
  // language detection. During SSR / first render we use the default.
  // The brief flash is avoided because the default ("en") matches the
  // server render; once hydrated we swap if needed.
  const value: I18nContextValue = { language, setLanguage, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useTranslation(): I18nContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return ctx;
}
