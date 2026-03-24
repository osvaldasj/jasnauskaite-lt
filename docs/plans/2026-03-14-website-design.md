# jasnauskaite.lt — Galutinis dizaino dokumentas

**Data:** 2026-03-14
**Statusas:** Patvirtintas

---

## Sprendimai

| Klausimas | Sprendimas | Priežastis |
|-----------|-----------|------------|
| Kalba | Dvikalbė LT/EN (switch) | Tarptautiniai brendai + LT auditorija |
| Vizualinis stilius | Bold & modern | Creator energija + profesionalumas |
| Hero | Video reel loop | Video creator = video hero |
| Navigacija | Floating navbar (desktop) + hamburger (mobile) | Pragmatiškiausia, brandai mato visus puslapius |
| Etapo 1 apimtis | Vizualinis pirma, CMS vėliau | Greičiau rezultatas, lengviau koreguoti |
| Default tema | Dark mode | Video geriau atrodo tamsiame fone, 82.7% vartotojų preference |
| Deploy | Git deploy per Hostinger | Automatinis deploy per push |

---

## Architektūra (Etapas 1)

```
jasnauskaite.lt/
├── / (Home) — vienas ilgas puslapis
│   ├── Hero — video loop + bold antraštė + CTA
│   ├── Klientų logo marquee (grayscale → color)
│   ├── Apie mane — kas esu, ką darau
│   ├── Portfolio highlight — 6-9 geriausių darbų (bento grid)
│   ├── Skaičiai — engagement rate, reach, followers (animated)
│   ├── Paslaugos — ką siūlau
│   ├── Atsiliepimai — klientų citatos
│   └── CTA — bendradarbiavimo užklausa
├── /portfolio — filtruojamas portfolio
├── /media-kit — interaktyvus + PDF
├── /links — Linktree pakeitimas
├── /bendradarbiauk — struktūruota forma
└── Footer — social links + IG Gradient Line + Reelize
```

**Etape 1 kuriame:** Home puslapis su visomis sekcijomis + baziniai komponentai + i18n + dark mode + deploy.
**Etape 2:** Kiti puslapiai (/portfolio, /media-kit, /links, /bendradarbiauk).

---

## Spalvų sistema

### Light mode
| Elementas | HEX |
|-----------|-----|
| Fonas | `#FFFFFF` |
| Surface | `#F5F5F3` |
| Tekstas | `#1A1A1A` |
| Muted tekstas | `#4A4A4A` |
| Linijos | `#E5E5E0` |
| Akcentas | IG Gradient (`#833AB4` → `#C13584` → `#F77737`) |

### Dark mode (default)
| Elementas | HEX |
|-----------|-----|
| Fonas | `#0A0A0A` |
| Surface | `#1A1A1A` |
| Tekstas | `#E5E5E0` |
| Muted tekstas | `#888888` |
| Linijos | `#2A2A2A` |
| Akcentas | IG Gradient (tas pats — brand consistency) |

---

## Tipografija

| Paskirtis | Fontas | Svoris | Dydis |
|-----------|--------|--------|-------|
| H1 (hero) | Outfit | Semi-Bold (600) | 48-72px (bold & modern) |
| H2 (sekcijos) | Outfit | Semi-Bold (600) | 32-40px |
| H3 | Outfit | Medium (500) | 24-28px |
| Body | Inter | Regular (400) | 16-18px |
| Small / labels | Inter | Regular (400) | 12-14px |

- Letter-spacing: +0.02em antraštėse
- Line-height: 1.6 body tekste
- Casing: Sentence case visur

---

## Komponentų planas

### Hero sekcija
- **Komponentas:** Full-width video loop (HTML5 `<video>` muted autoplay loop)
- **Ant viršaus:** Bold Outfit antraštė su Text Generate Effect (Aceternity UI)
- **CTA:** Shimmer Button "Bendradarbiauk" (Magic UI)
- **Fonas:** Video su dark gradient overlay (apačioje tamsesnis)
- **Scroll indicator:** Animated chevron apačioje
- **Mobile:** Mažesnė video versija arba poster frame + Ken Burns

### Navigacija
- **Desktop:** Floating navbar su backdrop-blur, IG gradient line apačioje
  - Kairė: "Reelize" logo (Outfit Semi-Bold)
  - Centras: Portfolio | Media Kit | Bendradarbiauk
  - Dešinė: LT/EN switch + Dark/Light toggle
- **Mobile:** Logo + hamburger → fullscreen overlay menu su animacija
- **Scroll behavior:** Pasirodo su background po 100px scroll

### Klientų logo juosta
- **Komponentas:** Marquee (Magic UI) — infinite scroll
- **Stilius:** Grayscale default → spalvotas on hover
- **Brendai:** Aruelle, Stiliaus kodas, Eurovaistine, ODORO, Perfectil, Lancome, Barbora, McDonald's, Tele2, Maxima, Boozt
- **Vienodas aukštis:** 40px, skirtingi pločiai

### Apie mane
- **Animacija:** Blur Fade in (Magic UI) arba Fade up on scroll
- **Layout:** Splitscreen — nuotrauka kairėje, tekstas dešinėje
- **Turinys:** 2-3 sakiniai, kas esu, ką darau, su kuo dirbu

### Portfolio highlight
- **Layout:** Bento Grid (Aceternity UI) — 6-9 darbų
- **Kortelės:** 3D Card hover efektas (Aceternity UI)
- **Hover:** Video preview (autoplay muted) + overlay su brendo + metrikos
- **CTA apačioje:** "Žiūrėti visus darbus →"

### Skaičiai
- **Komponentas:** Number Ticker (Magic UI) — count up animacija scroll metu
- **Metrikos:** Followers (200K+), Engagement Rate (4.2%), Brendai (50+), Metai (5+)
- **Layout:** 4 kolonos horizontaliai, centruota

### Paslaugos
- **Komponentas:** shadcn/ui Tabs arba grid kortelės
- **Kategorijos:** Reels | Stories serijos | TikTok | Kampanijos | Panauda
- **Kiekviena:** trumpas aprašymas + ikona

### Atsiliepimai
- **Komponentas:** Infinite Moving Cards (Aceternity UI)
- **Stilius:** Kortelės su citata + brendas + asmuo
- **Automatinis slinkimas:** lėtas, pausina hover

### CTA sekcija
- **Fonas:** IG gradient subtle glow
- **Tekstas:** Bold antraštė "Kurkime kartu"
- **Mygtukas:** Shimmer Button → /bendradarbiauk
- **Erdvė:** Daug padding, minimalu

### Footer
- **Elementai:** Social links (IG, TikTok, YouTube) + IG Gradient Line + "Reelize per OS Dives MB"
- **Stilius:** Minimalus, daug erdvės

---

## i18n sistema

- **Biblioteka:** `next-intl` arba custom su JSON failais
- **Struktūra:**
  ```
  /messages/
    lt.json  — lietuvių tekstai
    en.json  — anglų tekstai
  ```
- **URL:** `jasnauskaite.lt` (LT default) / `jasnauskaite.lt/en` (EN)
- **Switch:** Navbar dešinėje, LT/EN toggle

---

## Tech stack

```
Next.js 14+ (App Router, Static Export)
├── TypeScript
├── Tailwind CSS 3.4+ (brand spalvos per config)
├── Framer Motion 11+ (animacijos)
├── next-themes (dark mode)
├── next-intl (i18n)
├── shadcn/ui (baziniai komponentai)
├── Aceternity UI (premium efektai — copy-paste)
└── Magic UI (animuoti elementai — copy-paste)
```

---

## Performance biudžetas

| Metrika | Tikslas |
|---------|---------|
| LCP | <2.5s |
| FCP | <1.5s |
| TBT | <200ms |
| CLS | <0.1 |
| JS bundle | <150KB gzipped |
| Hero video | <3MB mobile, <8MB desktop |
| Nuotraukos | WebP, <200KB |

---

## Failų struktūra (Etapas 1)

```
jasnauskaite.lt/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx        # Root layout su providers
│   │   │   └── page.tsx          # Home puslapis
│   │   ├── globals.css           # Tailwind + custom CSS
│   │   └── layout.tsx            # Root layout
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── IGGradientLine.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── ClientLogos.tsx
│   │   │   ├── About.tsx
│   │   │   ├── PortfolioHighlight.tsx
│   │   │   ├── Stats.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── CTA.tsx
│   │   ├── ui/                   # shadcn/ui + custom
│   │   └── animations/           # Aceternity/Magic UI komponentai
│   ├── lib/
│   │   ├── utils.ts
│   │   └── i18n.ts
│   └── messages/
│       ├── lt.json
│       └── en.json
├── public/
│   ├── videos/
│   ├── images/
│   └── fonts/
├── tailwind.config.ts
├── next.config.js
└── package.json
```
