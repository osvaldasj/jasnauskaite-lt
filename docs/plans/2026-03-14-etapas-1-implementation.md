# jasnauskaite.lt Etapas 1 — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Sukurti Next.js svetainės Home puslapį su 8 sekcijomis, dark/light mode, LT/EN switch, ir deploy į Hostinger.

**Architecture:** Next.js 14 App Router su static export. Tailwind CSS brand spalvos. Framer Motion animacijos. Aceternity UI ir Magic UI komponentai (copy-paste). next-themes dark mode. next-intl i18n. Turinys hardcoded (CMS vėliau Etape 2+).

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS 3.4, Framer Motion 11, next-themes, next-intl, shadcn/ui, Aceternity UI (copy-paste), Magic UI (copy-paste)

---

## Task 1: Next.js projekto inicializacija

**Files:**
- Create: `next-app/` (visas Next.js projektas)

**Step 1: Sukurti Next.js projektą**

```bash
cd /Users/osvaldasjonaitis/Documents/Projektai/Claude\ AI/jasnauskaite.lt
npx create-next-app@latest next-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Expected: Sukurtas `next-app/` folderis su Next.js projektu.

**Step 2: Patikrinti ar veikia**

```bash
cd next-app && npm run dev
```

Expected: Svetainė veikia `localhost:3000`

**Step 3: Sustabdyti dev server ir commit**

```bash
git add next-app/
git commit -m "feat: initialize Next.js 14 project with TypeScript and Tailwind"
```

---

## Task 2: Tailwind brand konfigūracija

**Files:**
- Modify: `next-app/tailwind.config.ts`
- Modify: `next-app/src/app/globals.css`

**Step 1: Sukonfigūruoti Tailwind su brand spalvomis ir fontais**

`next-app/tailwind.config.ts`:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        muted: "var(--muted)",
        border: "var(--border-color)",
        graphite: "#1A1A1A",
        "mid-graphite": "#4A4A4A",
        "light-bg": "#F5F5F3",
        "line-color": "#E5E5E0",
        "ig-purple": "#833AB4",
        "ig-magenta": "#C13584",
        "ig-pink": "#E1306C",
        "ig-orange": "#F77737",
        "ig-yellow": "#FCAF45",
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        brand: "0.02em",
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 2: Sukonfigūruoti CSS variables dark/light mode**

`next-app/src/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: #FFFFFF;
    --foreground: #1A1A1A;
    --surface: #F5F5F3;
    --muted: #4A4A4A;
    --border-color: #E5E5E0;
  }

  .dark {
    --background: #0A0A0A;
    --foreground: #E5E5E0;
    --surface: #1A1A1A;
    --muted: #888888;
    --border-color: #2A2A2A;
  }

  body {
    @apply bg-background text-foreground font-inter antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-outfit tracking-brand;
  }
}

/* IG Gradient Line */
.ig-gradient-line {
  height: 2px;
  background: linear-gradient(90deg, #833AB4, #C13584, #E1306C, #F77737, #FCAF45);
}

/* IG Gradient text */
.ig-gradient-text {
  background: linear-gradient(135deg, #833AB4, #C13584, #F77737);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Shimmer effect */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.shimmer-button {
  background: linear-gradient(90deg, #833AB4, #C13584, #F77737, #C13584, #833AB4);
  background-size: 200% 100%;
  animation: shimmer 3s ease-in-out infinite;
}
```

**Step 3: Commit**

```bash
cd next-app
git add tailwind.config.ts src/app/globals.css
git commit -m "feat: configure Tailwind with Reelize brand colors, fonts, dark mode CSS vars"
```

---

## Task 3: Fontai (Outfit + Inter)

**Files:**
- Modify: `next-app/src/app/layout.tsx`

**Step 1: Sukonfigūruoti Google Fonts per next/font**

`next-app/src/app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Inide Jasnauskaite — Content Creator",
  description: "Fashion, Beauty & Lifestyle Content Creator. 354K+ Instagram followers. Available for brand collaborations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lt" suppressHydrationWarning>
      <body className={`${outfit.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
```

**Step 2: Patikrinti naršyklėje**

```bash
npm run dev
```

Atidaryti `localhost:3000`, patikrinti DevTools → Computed Styles kad fontai yra Outfit ir Inter.

**Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add Outfit and Inter fonts with latin-ext (LT support)"
```

---

## Task 4: Dark mode (next-themes)

**Files:**
- Install: `next-themes`
- Create: `next-app/src/components/providers/ThemeProvider.tsx`
- Modify: `next-app/src/app/layout.tsx`

**Step 1: Instaliuoti next-themes**

```bash
cd next-app && npm install next-themes
```

**Step 2: Sukurti ThemeProvider**

`next-app/src/components/providers/ThemeProvider.tsx`:
```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
```

**Step 3: Prijungti prie layout.tsx**

Modifikuoti `next-app/src/app/layout.tsx` — apgaubti `{children}` su `<ThemeProvider>`:
```tsx
import { ThemeProvider } from "@/components/providers/ThemeProvider";

// ... existing code ...

<body className={`${outfit.variable} ${inter.variable}`}>
  <ThemeProvider>
    {children}
  </ThemeProvider>
</body>
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add dark mode with next-themes (default: dark)"
```

---

## Task 5: Framer Motion setup

**Files:**
- Install: `framer-motion`
- Create: `next-app/src/lib/animations.ts`

**Step 1: Instaliuoti**

```bash
cd next-app && npm install framer-motion
```

**Step 2: Sukurti animacijų utility failą**

`next-app/src/lib/animations.ts`:
```typescript
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
```

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add Framer Motion with reusable animation variants"
```

---

## Task 6: IGGradientLine komponentas

**Files:**
- Create: `next-app/src/components/layout/IGGradientLine.tsx`

**Step 1: Sukurti komponentą**

`next-app/src/components/layout/IGGradientLine.tsx`:
```tsx
interface IGGradientLineProps {
  className?: string;
}

export function IGGradientLine({ className = "" }: IGGradientLineProps) {
  return <div className={`ig-gradient-line w-full ${className}`} />;
}
```

**Step 2: Commit**

```bash
git add src/components/layout/IGGradientLine.tsx
git commit -m "feat: add IG Gradient Line signature component"
```

---

## Task 7: Navbar komponentas

**Files:**
- Create: `next-app/src/components/layout/Navbar.tsx`
- Create: `next-app/src/components/layout/ThemeToggle.tsx`

**Step 1: Sukurti ThemeToggle**

`next-app/src/components/layout/ThemeToggle.tsx`:
```tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface transition-colors"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ rotate: isDark ? 0 : 180, scale: 1 }}
        initial={{ scale: 0.8 }}
        transition={{ duration: 0.3 }}
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
```

**Step 2: Sukurti Navbar**

`next-app/src/components/layout/Navbar.tsx`:
```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { IGGradientLine } from "./IGGradientLine";

const navLinks = [
  { href: "#portfolio", label: { lt: "Portfolio", en: "Portfolio" } },
  { href: "#paslaugos", label: { lt: "Paslaugos", en: "Services" } },
  { href: "#kontaktai", label: { lt: "Bendradarbiauk", en: "Collaborate" } },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [locale, setLocale] = useState<"lt" | "en">("lt");
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-lg shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="font-outfit font-semibold text-xl tracking-brand">
            Reelize
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-inter text-muted hover:text-foreground transition-colors relative group"
              >
                {link.label[locale]}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] ig-gradient-line group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLocale(locale === "lt" ? "en" : "lt")}
              className="text-xs font-inter font-medium px-2 py-1 rounded hover:bg-surface transition-colors"
            >
              {locale === "lt" ? "EN" : "LT"}
            </button>
            <ThemeToggle />
            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[2px] bg-foreground"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-[2px] bg-foreground"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[2px] bg-foreground"
              />
            </button>
          </div>
        </div>
        <IGGradientLine className={scrolled ? "opacity-100" : "opacity-0"} />
      </motion.nav>

      {/* Mobile menu overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-outfit text-3xl font-semibold tracking-brand hover:ig-gradient-text transition-colors"
            >
              {link.label[locale]}
            </a>
          ))}
        </motion.div>
      )}
    </>
  );
}
```

**Step 3: Commit**

```bash
git add src/components/layout/
git commit -m "feat: add Navbar with scroll-aware blur, theme toggle, language switch, mobile hamburger"
```

---

## Task 8: Footer komponentas

**Files:**
- Create: `next-app/src/components/layout/Footer.tsx`

**Step 1: Sukurti Footer**

`next-app/src/components/layout/Footer.tsx`:
```tsx
import { IGGradientLine } from "./IGGradientLine";

const socialLinks = [
  { href: "https://instagram.com/jasnauskaite", label: "Instagram" },
  { href: "https://tiktok.com/@jasnauskaite", label: "TikTok" },
  { href: "https://youtube.com/@jasnauskaite", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <IGGradientLine className="mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-outfit font-semibold text-lg tracking-brand">
              Reelize
            </p>
            <p className="text-sm text-muted font-inter mt-1">
              per OS Dives MB
            </p>
          </div>

          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-foreground transition-colors font-inter"
              >
                {link.label}
              </a>
            ))}
          </div>

          <p className="text-xs text-muted font-inter">
            &copy; {new Date().getFullYear()} Reelize. Visos teises saugomos.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add Footer with social links, IG Gradient Line, Reelize branding"
```

---

## Task 9: Hero sekcija

**Files:**
- Create: `next-app/src/components/sections/Hero.tsx`

**Step 1: Sukurti Hero su video loop**

`next-app/src/components/sections/Hero.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Video background — placeholder kol nera tikro video */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background">
        {/* Kai bus video:
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero-reel.mp4" type="video/mp4" />
        </video>
        */}
        {/* Placeholder: animated gradient */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-ig-purple via-ig-magenta to-ig-orange animate-pulse" />
        </div>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm md:text-base text-muted font-inter mb-4 tracking-widest uppercase"
        >
          Content Creator
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-outfit font-semibold text-5xl md:text-7xl lg:text-8xl tracking-brand leading-tight"
        >
          Inide{" "}
          <span className="ig-gradient-text">Jasnauskaite</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-muted font-inter mt-6 max-w-2xl mx-auto"
        >
          Fashion, beauty ir lifestyle turinio kureja. 354K+ Instagram sekejų.
          Dirbu su didžiausiais Lietuvos ir tarptautiniais brendais.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#kontaktai"
            className="shimmer-button text-white font-inter font-medium px-8 py-3 rounded-full text-sm transition-transform hover:scale-105"
          >
            Bendradarbiauk
          </a>
          <a
            href="#portfolio"
            className="border border-border text-foreground font-inter font-medium px-8 py-3 rounded-full text-sm hover:bg-surface transition-colors"
          >
            Portfolio
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-muted flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: add Hero section with animated text, IG gradient name, shimmer CTA, scroll indicator"
```

---

## Task 10: Client Logos Marquee sekcija

**Files:**
- Create: `next-app/src/components/sections/ClientLogos.tsx`

**Step 1: Sukurti Marquee komponentą**

`next-app/src/components/sections/ClientLogos.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

const clients = [
  "Aruelle", "Stiliaus kodas", "Eurovaistine", "ODORO", "Perfectil",
  "Lancome", "Barbora", "McDonald's", "Tele2", "Maxima",
  "Boozt", "Hellmann's", "Mionetto", "GymPlius", "DailySpoon",
];

export function ClientLogos() {
  return (
    <section className="py-16 overflow-hidden">
      <motion.p
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center text-sm text-muted font-inter mb-8 tracking-widest uppercase"
      >
        Patikejo
      </motion.p>

      {/* Marquee wrapper */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling track */}
        <div className="flex gap-12 animate-marquee hover:[animation-play-state:paused]">
          {[...clients, ...clients].map((client, i) => (
            <div
              key={`${client}-${i}`}
              className="flex-shrink-0 text-lg font-outfit font-medium text-muted/40 hover:text-foreground transition-colors duration-300 whitespace-nowrap select-none"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Prideti marquee animacija i globals.css**

Append to `next-app/src/app/globals.css`:
```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}
```

**Step 3: Commit**

```bash
git add src/components/sections/ClientLogos.tsx src/app/globals.css
git commit -m "feat: add Client Logos marquee section with infinite scroll"
```

---

## Task 11: About sekcija

**Files:**
- Create: `next-app/src/components/sections/About.tsx`

**Step 1: Sukurti About**

`next-app/src/components/sections/About.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function About() {
  return (
    <section id="apie" className="py-24 px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center"
      >
        {/* Image placeholder */}
        <motion.div
          variants={fadeInUp}
          className="aspect-[3/4] bg-surface rounded-2xl overflow-hidden"
        >
          {/* Kai bus nuotrauka:
          <Image src="/images/about.jpg" alt="Inide" fill className="object-cover" />
          */}
          <div className="w-full h-full flex items-center justify-center text-muted">
            <span className="font-inter text-sm">Nuotrauka</span>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div variants={fadeInUp}>
          <p className="text-sm text-muted font-inter mb-4 tracking-widest uppercase">
            Apie mane
          </p>
          <h2 className="font-outfit font-semibold text-3xl md:text-4xl tracking-brand mb-6">
            Kuriu turini, kuris{" "}
            <span className="ig-gradient-text">veikia</span>
          </h2>
          <div className="space-y-4 text-muted font-inter leading-relaxed">
            <p>
              Esu Inide Jasnauskaite — turinio kureja, dirbanti su didziausiais
              Lietuvos ir tarptautiniais brendais. Per 5+ metus sukuriau simtus
              reels, stories seriju ir kampaniju.
            </p>
            <p>
              Mano tikslas — ne tik grazus turinys, bet ir realus rezultatai.
              Engagement rate, reach, conversions — kiekvienas projektas
              matuojamas skaiciais.
            </p>
            <p>
              Dirbu per Reelize — savo imonę, kuri uztikrina profesionalu
              procesa nuo idejos iki galutinio rezultato.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/sections/About.tsx
git commit -m "feat: add About section with split layout and scroll animation"
```

---

## Task 12: Stats sekcija (animuoti skaiciai)

**Files:**
- Create: `next-app/src/components/sections/Stats.tsx`

**Step 1: Sukurti Stats su count-up animacija**

`next-app/src/components/sections/Stats.tsx`:
```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { value: 354, suffix: "K+", label: { lt: "Instagram sekejų", en: "Instagram followers" } },
  { value: 4.2, suffix: "%", label: { lt: "Engagement rate", en: "Engagement rate" } },
  { value: 50, suffix: "+", label: { lt: "Brendu", en: "Brands" } },
  { value: 5, suffix: "+", label: { lt: "Metu patirties", en: "Years experience" } },
];

export function Stats() {
  return (
    <section className="py-24 px-6 bg-surface">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label.en}
            variants={fadeInUp}
            className="text-center"
          >
            <p className="font-outfit font-semibold text-4xl md:text-5xl tracking-brand">
              <AnimatedNumber target={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-sm text-muted font-inter mt-2">
              {stat.label.lt}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/sections/Stats.tsx
git commit -m "feat: add Stats section with animated count-up numbers"
```

---

## Task 13: Portfolio Highlight sekcija

**Files:**
- Create: `next-app/src/components/sections/PortfolioHighlight.tsx`

**Step 1: Sukurti Portfolio su bento grid**

`next-app/src/components/sections/PortfolioHighlight.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const portfolioItems = [
  { title: "Aruelle", type: "Stories serija", span: "md:col-span-2 md:row-span-2" },
  { title: "Stiliaus kodas", type: "Long stories", span: "" },
  { title: "Eurovaistine", type: "Stories", span: "" },
  { title: "Lancome", type: "Post + stories", span: "md:col-span-2" },
  { title: "ODORO", type: "Reel + stories", span: "" },
  { title: "Hellmann's", type: "Reel", span: "" },
  { title: "McDonald's", type: "Reel + collab", span: "" },
  { title: "Barbora", type: "Stories", span: "" },
  { title: "Mionetto", type: "Reel + stories", span: "md:col-span-2" },
];

export function PortfolioHighlight() {
  return (
    <section id="portfolio" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-sm text-muted font-inter mb-4 tracking-widest uppercase">
            Portfolio
          </p>
          <h2 className="font-outfit font-semibold text-3xl md:text-4xl tracking-brand">
            Isrinkti darbai
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {portfolioItems.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              className={`group relative bg-surface rounded-xl overflow-hidden cursor-pointer ${item.span}`}
              style={{ minHeight: item.span.includes("row-span-2") ? "400px" : "200px" }}
            >
              {/* Placeholder — kai bus nuotraukos/video */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-muted/30 font-inter text-xs">Media</span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-white font-outfit font-semibold text-lg">
                  {item.title}
                </p>
                <p className="text-white/70 font-inter text-sm">
                  {item.type}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <a
            href="/portfolio"
            className="text-sm font-inter text-muted hover:text-foreground transition-colors inline-flex items-center gap-2"
          >
            Ziureti visus darbus
            <span className="text-lg">&rarr;</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/sections/PortfolioHighlight.tsx
git commit -m "feat: add Portfolio Highlight section with bento grid layout"
```

---

## Task 14: Services sekcija

**Files:**
- Create: `next-app/src/components/sections/Services.tsx`

**Step 1: Sukurti Services**

`next-app/src/components/sections/Services.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const services = [
  {
    title: "Instagram Reels",
    description: "Profesionaliai sukurti reels su storytelling elementais. Nuo idejos iki galutinio produkto.",
    icon: "🎬",
  },
  {
    title: "Stories serijos",
    description: "Ilgos, itraukiancios stories serijos, kurios kuria rysi su auditorija ir didina engagement.",
    icon: "📱",
  },
  {
    title: "TikTok",
    description: "Natūralus, autentiskas turinys TikTok platformai su reshare galimybe.",
    icon: "🎵",
  },
  {
    title: "Kampanijos",
    description: "Pilna kampanijos kūryba — nuo koncepcijos iki realizacijos su matavimo metrikomis.",
    icon: "📊",
  },
  {
    title: "Panauda ir veido naudojimas",
    description: "Brendo ambasadorystė — ilgalaikis bendradarbiavimas su nuosekliu turinio srautu.",
    icon: "🤝",
  },
  {
    title: "Foto sesijos",
    description: "Profesionali produktų ir lifestyle fotografija socialinėms platformoms.",
    icon: "📸",
  },
];

export function Services() {
  return (
    <section id="paslaugos" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-sm text-muted font-inter mb-4 tracking-widest uppercase">
            Paslaugos
          </p>
          <h2 className="font-outfit font-semibold text-3xl md:text-4xl tracking-brand">
            Ka galiu <span className="ig-gradient-text">pasiulyti</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeInUp}
              className="group p-6 rounded-xl border border-border hover:border-ig-magenta/30 transition-colors duration-300"
            >
              <span className="text-2xl mb-4 block">{service.icon}</span>
              <h3 className="font-outfit font-semibold text-lg mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted font-inter leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/sections/Services.tsx
git commit -m "feat: add Services section with grid cards and hover effects"
```

---

## Task 15: Testimonials sekcija

**Files:**
- Create: `next-app/src/components/sections/Testimonials.tsx`

**Step 1: Sukurti Testimonials**

`next-app/src/components/sections/Testimonials.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

const testimonials = [
  {
    quote: "Inide visada pristato auksciausios kokybes turini, kuris virsija musu lukescius.",
    author: "Marketingo vadove",
    company: "Aruelle",
  },
  {
    quote: "Profesionalus procesas nuo pradziu iki galo. Engagement rezultatai kalbejo patys uz save.",
    author: "Brendo menedzeris",
    company: "Stiliaus kodas",
  },
  {
    quote: "Viena is geriausiu content creatoriu Lietuvoje. Rekomenduojame be islygu.",
    author: "Marketingo skyrius",
    company: "Eurovaistine",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="text-sm text-muted font-inter mb-4 tracking-widest uppercase">
            Atsiliepimai
          </p>
          <h2 className="font-outfit font-semibold text-3xl md:text-4xl tracking-brand">
            Ka sako <span className="ig-gradient-text">klientai</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl bg-background border border-border"
            >
              <p className="font-inter text-foreground leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-inter font-medium text-sm">{t.author}</p>
                <p className="font-inter text-xs text-muted">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/sections/Testimonials.tsx
git commit -m "feat: add Testimonials section with client quotes grid"
```

---

## Task 16: CTA sekcija

**Files:**
- Create: `next-app/src/components/sections/CTA.tsx`

**Step 1: Sukurti CTA**

`next-app/src/components/sections/CTA.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";

export function CTA() {
  return (
    <section id="kontaktai" className="py-32 px-6 relative overflow-hidden">
      {/* Subtle gradient glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-ig-magenta/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        <h2 className="font-outfit font-semibold text-4xl md:text-5xl tracking-brand mb-6">
          Kurkime{" "}
          <span className="ig-gradient-text">kartu</span>
        </h2>
        <p className="text-muted font-inter mb-10 leading-relaxed">
          Ieskote turinio kurejojo savo brendui? Susisiekite ir aptarkime,
          kaip galiu padeti pasiekti jusu tikslus.
        </p>
        <a
          href="mailto:osvaldas@reelize.lt"
          className="shimmer-button inline-block text-white font-inter font-medium px-10 py-4 rounded-full text-base transition-transform hover:scale-105"
        >
          Bendradarbiauk
        </a>
      </motion.div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/sections/CTA.tsx
git commit -m "feat: add CTA section with gradient glow and shimmer button"
```

---

## Task 17: Surinkti Home puslapį

**Files:**
- Modify: `next-app/src/app/page.tsx`

**Step 1: Surinkti visas sekcijas į vieną puslapį**

`next-app/src/app/page.tsx`:
```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { About } from "@/components/sections/About";
import { PortfolioHighlight } from "@/components/sections/PortfolioHighlight";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ClientLogos />
        <About />
        <PortfolioHighlight />
        <Stats />
        <Services />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
```

**Step 2: Patikrinti naršyklėje**

```bash
cd next-app && npm run dev
```

Atidaryti `localhost:3000` — turėtų matytis pilnas Home puslapis su visomis 8 sekcijomis.

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble Home page with all 8 sections"
```

---

## Task 18: Static export konfigūracija

**Files:**
- Modify: `next-app/next.config.js` (arba `next.config.mjs`)

**Step 1: Pridėti static export**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Hostinger shared neturi next/image serverio
  },
  trailingSlash: true, // Geriau veikia su Hostinger
};

module.exports = nextConfig;
```

**Step 2: Build test**

```bash
cd next-app && npm run build
```

Expected: Sukurtas `out/` folderis su statiniais failais.

**Step 3: Commit**

```bash
git add next.config.*
git commit -m "feat: configure static export for Hostinger deployment"
```

---

## Task 19: Production build patikrinimas

**Step 1: Paleisti production preview**

```bash
cd next-app
npx serve out
```

Atidaryti pateiktą URL — patikrinti:
- [ ] Visos sekcijos matomos
- [ ] Dark mode veikia
- [ ] Animacijos veikia
- [ ] Mobile responsive (DevTools → toggle device)
- [ ] Navbar scroll efektas veikia
- [ ] Shimmer button animuojasi

**Step 2: Final commit**

```bash
git add -A
git commit -m "feat: complete Etapas 1 — Home page with all sections, dark mode, animations"
```

---

## Execution Summary

| Task | Kas | ~Laikas |
|------|-----|---------|
| 1 | Next.js init | 2 min |
| 2 | Tailwind brand config | 3 min |
| 3 | Fontai (Outfit + Inter) | 2 min |
| 4 | Dark mode (next-themes) | 3 min |
| 5 | Framer Motion setup | 2 min |
| 6 | IG Gradient Line | 1 min |
| 7 | Navbar | 5 min |
| 8 | Footer | 3 min |
| 9 | Hero sekcija | 5 min |
| 10 | Client Logos Marquee | 3 min |
| 11 | About | 3 min |
| 12 | Stats (animated numbers) | 4 min |
| 13 | Portfolio Highlight | 5 min |
| 14 | Services | 3 min |
| 15 | Testimonials | 3 min |
| 16 | CTA | 3 min |
| 17 | Surinkti Home page | 2 min |
| 18 | Static export config | 2 min |
| 19 | Production build check | 3 min |
| **Viso** | | **~55 min** |
