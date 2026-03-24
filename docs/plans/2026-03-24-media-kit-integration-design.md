# jasnauskaite.lt — Media Kit Integration Design

**Data:** 2026-03-24
**Statusas:** Patvirtintas
**Aplinka:** Tik localhost (nedeployinti be atskiros komandos)

---

## Sprendimai

| Klausimas | Sprendimas |
|---|---|
| Tech stack | Next.js (App Router, TypeScript) |
| Stilius | Light default + dark mode toggle |
| Struktūra | 7 sekcijos (hero, about, portfolio, brands, feed, collaborate, footer) |
| Media kit | Interaktyvus Portfolio tab kaip svetainės sekcija |
| Demografija | NERODOMA viešai |
| Kainos | NERODOMOS viešai |
| Deploy | TIK localhost, kol nebus atskira komanda |

---

## Tech Stack

- **Framework:** Next.js 16+ (App Router, TypeScript, static export capable)
- **Styling:** Tailwind CSS 4
- **Animacijos:** Framer Motion 12+
- **Dark mode:** next-themes (light default)
- **Fontai:** Outfit (headings, 600-700) + Inter (body, 300-600)
- **Spalvos:** #FFFFFF bg, #1A1A1A text, #E5E5E0 lines, IG gradient akcentas
- **Dev server:** next dev (port 3000)
- **Smooth scroll:** Lenis

## Puslapio struktūra

### 1. Hero
- Avatar (nuotrauka arba IJ fallback) + gradient ring
- Vardas: Inidė Jasnauskaitė
- @jasnauskaite handle
- 4 KPI strip su counter animacija:
  - 358K followers
  - 321K avg views
  - 295M+ total views
  - 89 viral posts
- Social links: Instagram, TikTok (icon buttons)
- CTA: "Work With Me" → scrollina į Collaborate

### 2. About
- 2-3 sakiniai bio
- 4 highlight badges: 89 viral, 25+ brands, TV production, Long-term partnerships
- Framer Motion whileInView fade-in

### 3. Portfolio / Media Kit (pagrindinė sekcija)

**Šaltinis:** Duomenys iš media kit JSON + Meta API

**Komponentai:**
- **KPI Row** — 4 kortelės su animuotais skaičiais (avg views, likes, saves, total reach)
- **Case Studies Grid** — 3x2 (desktop), 2x2 (tablet), 1x (mobile)
  - Kiekviena kortelė: thumbnail + brendo pavadinimas + reach + avg views
  - Hover: slight scale + shadow
  - Click: atidaro Instagram postą naujam tab'e
- **Featured Content** — horizontalus scroll/swipe galerija
  - 6 thumbnails su views badge overlay
  - Touch swipe mobile
  - Framer Motion drag gestures
- **Services** — 6 kortelės (Reels 321K, Photo, Stories 25-30K, TikTok 125K, UGC, Production)
  - Hover: lift + gradient border
- **Brand Partners** — pill badges, clickable
  - Kiekvienas su geriausio posto views
  - Click → atidaro Instagram postą

**NERODOMA:**
- Demografija (amžius, lytis, šalys, donut chart)
- Kainos, rate card
- Procentai (tik absoliutūs skaičiai)

### 4. Brands (logo wall)
- Brendų logotipai arba pavadinimai
- Infinite scroll marquee animacija
- Grayscale default → color on hover

### 5. Feed (IG embed)
- Paskutiniai 6-9 postai
- Grid layout su hover stats overlay (likes, views)
- Duomenys: Apify scrape arba behold.so widget

### 6. Collaborate
- "Let's Create Together" heading
- Forma: Brand Name, Contact Person, Email, Message
- Submit → email notification (API route)
- Success state su animacija

### 7. Footer
- Social links (IG, TikTok)
- Email: osvaldas@reelize.lt
- "Available for collaborations"
- Copyright

---

## Duomenų flow

```
Meta API (weekly) → /data/stats.json → KPI skaičiai
Apify (monthly) → /data/posts.json → Feed + thumbnails
media-kit thumbnails (base64) → Portfolio section
Brand analysis vault failai → Case studies data
```

## Komponentų struktūra

```
src/
├── app/
│   ├── layout.tsx          (fonts, theme provider, metadata)
│   ├── page.tsx            (home — sekcijų kompozicija)
│   └── globals.css         (Tailwind + custom properties)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Portfolio.tsx   (pagrindinė — media kit integracija)
│   │   ├── Brands.tsx
│   │   ├── Feed.tsx
│   │   └── Collaborate.tsx
│   ├── ui/
│   │   ├── AnimatedCounter.tsx
│   │   ├── GradientBorder.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── SwipeGallery.tsx
│   └── portfolio/
│       ├── KpiRow.tsx
│       ├── CaseStudyCard.tsx
│       ├── FeaturedGallery.tsx
│       ├── ServiceCard.tsx
│       └── BrandBadge.tsx
├── data/
│   ├── stats.json          (KPI skaičiai — auto-updated)
│   ├── brands.json         (case studies + thumbnails)
│   └── posts.json          (feed postai)
└── lib/
    ├── animations.ts       (Framer Motion variants)
    └── utils.ts
```

## Animacijos

| Elementas | Animacija | Trigger |
|---|---|---|
| KPI skaičiai | Counter (0 → target) | whileInView |
| Sekcijos | Fade up (opacity 0→1, y 20→0) | whileInView |
| Case study kortelės | Staggered fade in | whileInView |
| Featured galerija | Drag/swipe | User gesture |
| Brand badges | Fade in staggered | whileInView |
| Dark/Light toggle | Color transition 300ms | Click |
| Navbar | Backdrop blur on scroll | Scroll |

## Responsive breakpoints

| Breakpoint | Layout |
|---|---|
| Desktop (>1024px) | Full width, 3-col grids |
| Tablet (768-1024px) | 2-col grids |
| Mobile (<768px) | 1-col, stacked, swipe galerija |

## Kas NE šiame etape

- Deploy (tik localhost)
- SEO optimizacija (vėliau)
- Analytics (vėliau)
- i18n LT/EN (vėliau, bet struktūra paruošta)
- CMS integracija (vėliau, Sanity jau configured)
- Contact forma backend (vėliau, kol kas UI only)

---

## Implementacijos eiliškumas

1. Next.js projekto setup (Tailwind, fonts, theme)
2. Layout (Navbar + Footer)
3. Hero sekcija
4. About sekcija
5. Portfolio sekcija (pagrindinė — media kit integracija)
6. Brands sekcija
7. Feed sekcija
8. Collaborate sekcija
9. Animacijos polish
10. Dark mode polish
