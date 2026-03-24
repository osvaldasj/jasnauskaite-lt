# jasnauskaite.lt — Dizaino Research

**Data:** 2026-03-14
**Tikslas:** Surinkti geriausias praktikas, UI bibliotekas ir dizaino patternus prieš svetainės kūrimą

---

## 1. UI komponentų bibliotekos (Next.js + Tailwind)

### Tier 1 — Rekomenduojamos (aukšta kokybė, aktyviai palaikomos)

#### Aceternity UI
- **URL:** ui.aceternity.com
- **Kas tai:** 50+ premium animuotų komponentų su Tailwind + Framer Motion
- **Nemokama:** Taip (copy-paste modelis kaip shadcn)
- **Geriausi komponentai tavo svetainei:**
  - **Spotlight Card** — portfolio kortelės su šviesos sekimo efektu
  - **3D Card Effect** — hover efektas portfolio darbams
  - **Lamp Effect** — hero sekcijos apšvietimo efektas
  - **Text Generate Effect** — teksto animacija hero sekcijoje
  - **Floating Navbar** — plaukiojanti navigacija su blur efektu
  - **Infinite Moving Cards** — klientų logotipų juosta
  - **Bento Grid** — portfolio išdėstymas bento stiliumi
  - **Sparkles** — subtilus žėrėjimo efektas
  - **Background Beams** — foniniai šviesos efektai
  - **Tracing Beam** — scroll progress indikatorius
- **Kodėl tinka:** Premium feel, modernūs efektai, gerai veikia su dark mode

#### Magic UI
- **URL:** magicui.design
- **Kas tai:** 150+ animuotų Tailwind komponentų, shadcn ekosistema
- **Nemokama:** Dauguma komponentų nemokami
- **Geriausi komponentai:**
  - **Marquee** — klientų logotipų begalinis slinkimas
  - **Number Ticker** — animuoti skaičiai (followers, engagement rate)
  - **Dock** — macOS stiliaus navigacija (mobile)
  - **Globe** — 3D pasaulio vizualizacija (auditorijos geografija)
  - **Shimmer Button** — CTA mygtukai su šviesos efektu
  - **Border Beam** — kortelių rėmeliai su judančia šviesa
  - **Animated Grid Pattern** — foniniai patternai
  - **Blur Fade** — turinio atidengimas su blur
  - **Particles** — foninės dalelės
- **Kodėl tinka:** Didelis pasirinkimas, lengva integruoti, shadcn compatible

#### shadcn/ui
- **URL:** ui.shadcn.com
- **Kas tai:** Bazinė komponentų sistema (Radix UI + Tailwind)
- **Nemokama:** Taip, visiškai
- **Naudojimas:** Pagrindas — formos, mygtukai, dialogai, tabs, navigation menu
- **Kodėl būtina:** Accessibility, keyboard navigation, screen reader support. Bazinė infrastruktūra ant kurios stato Aceternity ir Magic UI

### Tier 2 — Papildomi šaltiniai

#### React Bits
- **URL:** reactbits.dev
- **Kas tai:** 90+ minimalistinių animuotų komponentų
- **Geriausi:** Split text animations, magnetic buttons, tilt cards
- **Privalumas:** Minimal dependencies, lengvos animacijos

#### Hover.dev
- **URL:** hover.dev
- **Kas tai:** Hover ir scroll animacijos komponentai
- **Geriausi:** Animated tabs, reveal cards, stagger animations

#### Animata
- **URL:** animata.design
- **Kas tai:** Animuoti Tailwind komponentai
- **Geriausi:** Text animations, card hover effects, loading states

### Tier 3 — Inspiracijos šaltiniai (ne copy-paste, o idėjos)

- **Awwwards** (awwwards.com) — geriausios svetainės pasaulyje
- **Godly** (godly.website) — kuruota kolekcija
- **Mobbin** (mobbin.com) — mobile dizaino patternai
- **Refero** (refero.design) — realių svetainių screenshots
- **SaaS Landing Page** (saaslandingpage.com) — landing page patternai

---

## 2. Animacijų patternai

### 2.1 Hero sekcija

**Rekomenduojamas požiūris tavo svetainei:**

```
Variantas A: Video Loop Hero (REKOMENDUOJAMA)
├── Full-width video (reel compilacija arba behind-the-scenes)
├── Overlay su gradientu (tamsesnis apačioje)
├── Vardas + tagline su text reveal animacija
├── Scroll indicator (animated chevron)
└── Video muted by default, play/pause toggle
```

**Implementacija:**
- HTML5 `<video>` su `autoPlay muted loop playsInline`
- Next.js `next/image` poster frame (kol video kraunasi)
- Framer Motion `motion.div` text reveal (stagger children)
- Performance: video compress su FFmpeg (H.264, 720p, <5MB)
- Mobile: mažesnė video versija arba statinis vaizdas su Ken Burns efektu

**Alternatyvos:**
- **Parallax hero** — nuotrauka su parallax scrolling (paprasčiau, bet mažiau wow)
- **Gradient mesh hero** — animuotas gradient fonas (modernu, bet generic)
- **Slider hero** — kelios nuotraukos su fade transition (klasikinis, bet ne trending)

### 2.2 Scroll animacijos

**Framer Motion + Intersection Observer (rekomenduojama):**

```tsx
// Bazinis scroll reveal pattern
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

// Stagger children (portfolio grid)
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};
```

**Patternai pagal sekciją:**

| Sekcija | Animacija | Priemonė |
|---------|-----------|----------|
| Hero teksto | Text reveal (character by character) | Framer Motion |
| Apie mane | Fade in + slide up | Framer Motion whileInView |
| Portfolio grid | Stagger fade in | Framer Motion staggerChildren |
| Skaičiai | Number counter (count up) | Magic UI Number Ticker |
| Klientų logotipai | Infinite scroll marquee | Magic UI Marquee |
| Atsiliepimai | Card carousel su fade | Framer Motion AnimatePresence |
| CTA sekcija | Scale up + glow | Framer Motion + CSS |

**Ko vengti:**
- Per daug parallax — lėtina, ypač mobile
- Bounce/spring efektai — atrodo pigiai
- Animacijos ilgesnės nei 0.8s — vartotojas nebelaukia
- Animacijos be `prefers-reduced-motion` palaikymo

### 2.3 Page transitions

```tsx
// Next.js App Router + Framer Motion
// layout.tsx
<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

### 2.4 Navigation

**Rekomenduojama: Floating Navbar**
- Fiksuota viršuje, pasirodo scroll metu
- `backdrop-blur-md` efektas (glass morphism)
- Sumažėja aukštis scroll metu (shrink on scroll)
- Mobile: hamburger → full-screen overlay menu
- Dark/light mode toggle dešinėje

```tsx
// Scroll-aware navbar
const { scrollY } = useScroll();
const navBg = useTransform(scrollY, [0, 100],
  ['rgba(255,255,255,0)', 'rgba(255,255,255,0.8)']
);
```

### 2.5 Micro-interactions

| Elementas | Efektas | Kaip |
|-----------|---------|------|
| Nuorodos | Underline slide-in iš kairės | CSS `::after` + transition |
| Mygtukai | Scale 1.02 + shadow lift | Framer Motion whileHover |
| Kortelės | Subtle lift + shadow | `hover:translate-y-[-2px]` |
| Ikonos | Rotate/bounce on hover | Framer Motion |
| Cursor | Custom cursor (optional) | CSS + JS |
| Toggle | Smooth slide + color change | Framer Motion layout animation |

### 2.6 Loading states

- **Skeleton screens** — ne spinner, o content placeholder shapes
- **Blur-up images** — maža blurinta versija → pilna (next/image automatinis)
- **Page loader** — IG gradient line animacija viršuje (progress bar)

---

## 3. Dark Mode patternai

### Spalvų sistema

```
Light Mode:                    Dark Mode:
┌─────────────────┐           ┌─────────────────┐
│ BG: #FFFFFF      │           │ BG: #0A0A0A      │
│ Surface: #F5F5F3 │           │ Surface: #1A1A1A  │
│ Text: #1A1A1A    │           │ Text: #E5E5E0     │
│ Muted: #4A4A4A   │           │ Muted: #888888    │
│ Border: #E5E5E0  │           │ Border: #2A2A2A   │
│ IG Gradient: ═══ │           │ IG Gradient: ═══  │
└─────────────────┘           └─────────────────┘
```

**Implementacija:**
- `next-themes` — system preference detection + manual toggle
- Tailwind `darkMode: 'class'` — CSS variables per tema
- IG Gradient Line — NESIKEIČIA tarp temų (brand consistency)
- Video/nuotraukos — geriau atrodo dark mode (šviečia)

**Toggle dizainas:**
- Saulė/mėnulis ikona su smooth morph animacija
- Vieta: navbar dešinėje
- Pirmas load: pagal sistemos nustatymą

---

## 4. Portfolio dizaino patternai

### 4.1 Grid layout

**Bento Grid (rekomenduojama):**
```
┌──────────┬─────┬─────┐
│          │     │     │
│  DIDELIS │ MAŽ │ MAŽ │
│  REEL    │     │     │
├─────┬────┴─────┤     │
│     │          ├─────┤
│ MAŽ │ VIDUTINIS│     │
│     │          │ MAŽ │
└─────┴──────────┴─────┘
```
- Masonry/bento stilius — ne vienodas grid
- Hover: overlay su projekto pavadinimu + metrikomis
- Click: expand arba navigate to detail page
- Filtrai: tabs viršuje (Visi / Reels / Stories / Kampanijos)

**Alternatyva: Horizontal scroll gallery**
- Viena eilė, scroll horizontaliai
- Kiekvienas item'as — video thumbnail su overlay
- Modernu, bet mažiau SEO-friendly

### 4.2 Portfolio kortelė

```
┌─────────────────────┐
│                     │
│   VIDEO THUMBNAIL   │
│   ▶ play overlay    │
│                     │
├─────────────────────┤
│ Brendas · Tipas     │
│ Projekto pavadinimas│
│ 📊 125K views · 4.2%│
└─────────────────────┘
```

- Hover: video preview (autoplay muted)
- Metrikos: views, engagement rate, likes
- Brendas kaip tag/badge

### 4.3 Case study layout

```
Hero (video/nuotrauka)
↓
Briefas — ką klientas norėjo
↓
Sprendimas — ką sugalvojai
↓
Procesas — behind the scenes (nuotraukų galerija)
↓
Rezultatai — metrikos (animuoti skaičiai)
↓
CTA — "Norite panašių rezultatų?"
```

---

## 5. Klientų logotipai

**Infinite Marquee (rekomenduojama):**
- Begalinis slinkimas viena kryptimi
- Grayscale → spalvotas on hover
- Vienodas aukštis, skirtingi pločiai
- Pausina hover metu
- Magic UI Marquee komponentas

---

## 6. Kontaktų / bendradarbiavimo forma

**Multi-step forma (Typeform stilius):**
```
Step 1: Kas jūs? (Brendas / Agentūra / Kitas)
Step 2: Kokio turinio reikia? (Reel / Stories / TikTok / Kampanija)
Step 3: Biudžeto diapazonas (select)
Step 4: Timeline (kada reikia)
Step 5: Trumpas aprašymas (textarea)
Step 6: Kontaktai (vardas, el. paštas)
```

- Kiekvienas step su animacija (slide/fade)
- Progress bar viršuje
- react-hook-form validacija
- Siuntimas: nodemailer arba Formspree/Getform

---

## 7. Komponentų planas pagal sekciją

| Sekcija | Komponentas | Šaltinis |
|---------|-------------|----------|
| **Hero** | Lamp/Spotlight + Text Generate Effect | Aceternity UI |
| **Klientų logo juosta** | Marquee (infinite scroll, grayscale→color) | Magic UI |
| **Apie mane** | Sticky Scroll Reveal arba Blur Fade | Aceternity UI / Magic UI |
| **Statistikos** | Number Ticker (followers, brands, years) | Magic UI |
| **Portfolio grid** | Bento Grid su 3D Card hover | Aceternity UI |
| **Paslaugos** | Tabs + Accordion | shadcn/ui |
| **Klientų atsiliepimai** | Infinite Moving Cards | Aceternity UI |
| **CTA** | Shimmer Button | Magic UI |
| **Navigacija** | Floating Navbar su backdrop-blur | Aceternity UI |
| **Fonas** | Particles arba Wavy Background | Aceternity UI / Magic UI |
| **Media Kit** | Dialog/Sheet su PDF viewer | shadcn/ui |
| **Dark mode toggle** | Saulė/mėnulis morph | next-themes + custom |

**Svarbu:** Visos bibliotekos veikia copy-paste principu (ne npm install), todėl puikiai dera tarpusavyje.

---

## 8. Rekomendacinis tech stack (galutinis)

```
Pagrindas:
├── Next.js 14+ (App Router, Static Export)
├── Tailwind CSS 3.4+
├── TypeScript
└── Framer Motion 11+

UI komponentai (copy-paste):
├── shadcn/ui — bazė (formos, navigation, accessibility)
├── Aceternity UI — premium efektai (hero, cards, navbar)
└── Magic UI — animuoti elementai (marquee, numbers, buttons)

Papildomi šaltiniai (jei reikės):
├── hover.dev — testimonials, feature grids
├── Animata — text animacijos, background efektai
└── React Bits — magnetic buttons, split text

CMS:
└── Sanity v3 (Studio + GROQ queries)

Kita:
├── next-themes (dark mode)
├── next-seo (SEO meta)
├── react-hook-form (formos)
├── sharp (image optimization)
└── @vercel/og (social media preview images)
```

---

## 8. Performance biudžetas

| Metrika | Tikslas | Kodėl |
|---------|---------|-------|
| First Contentful Paint | <1.5s | Google Core Web Vitals |
| Largest Contentful Paint | <2.5s | SEO ranking faktorius |
| Total Blocking Time | <200ms | Interaktyvumas |
| Cumulative Layout Shift | <0.1 | Vizualinis stabilumas |
| Bundle size (JS) | <150KB gzipped | Hostinger shared = ne CDN |
| Hero video | <3MB (mobile), <8MB (desktop) | Bandwidth |
| Nuotraukos | WebP, <200KB each | next/image auto-optimize |

---

## 9. Specifinės rekomendacijos tavo brendui

1. **IG Gradient Line kaip signature** — naudoti kaip section divider, progress bar, hover accent. Tai tavo vizualinis parašas
2. **Dark mode kaip default?** — kadangi video content, dark mode geriau rodo darbą. Galima default dark + toggle
3. **Erdvė > dekoracijos** — brand book sako 40%+ tuščio ploto. Tai reiškia didelės margins, padding, mažai elementų per ekraną
4. **Outfit + Inter combo** — antraštės Outfit Semi-Bold, body Inter Regular. Letter-spacing +0.02em antraštėse
5. **Animacijos subtilios** — ne cirko numeriai, o elegantiškas turinio atskleidimas. Ease [0.22, 1, 0.36, 1] (smooth deceleration)
6. **Mobile-first tikrai** — ne "responsive", o mobile-first. Portfolio kortelės vertikaliai, navigacija hamburger, hero video optimizuotas

---

> **Šaltiniai:** Aceternity UI, Magic UI, shadcn/ui dokumentacijos, Awwwards tendencijos, Framer Motion best practices, Next.js performance guidelines, Google Core Web Vitals, Tailwind CSS patterns
