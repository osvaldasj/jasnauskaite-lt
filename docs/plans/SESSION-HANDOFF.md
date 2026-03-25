# jasnauskaite.lt v2 — Session Handoff

**Duok šį failą naujai Claude sesijai kaip kontekstą.**

---

## Projektas
jasnauskaite.lt — content creator Inidės Jasnauskaitės portfolio svetainė.
**Working directory:** `/Users/osvaldasjonaitis/Documents/Projektai/Claude AI/jasnauskaite.lt/next-app`

## Kas padaryta
- Next.js 16 + React 19 + Tailwind v4 + Framer Motion app
- **Sena versija** (v1): `/portfolio` — bento grid, conventional dizainas. NELIESTI.
- **Nauja versija** (v2): `/v2/portfolio` — "Instagram Reimagined" dizainas su:
  - Light tema (default), IG gradient spalvų paletė visur
  - Syne + DM Sans + Space Mono fontai
  - KineticHero (milžiniškas vardas, parallax, 6 metrikos iš media kit)
  - StatsTicker (bėgantys skaičiai)
  - SplitAbout (editorial split su "01" numeriu)
  - BrandWall (3 eilučių staggered marquee)
  - EditorialCaseStudies (horizontal scroll kortelės su tikrais skaičiais)
  - StackedServices (3-column grid: Reels, Stories, TikToks)
  - MinimalFAQ (accordion su numeriais)
  - KineticCTA + Footer
  - GrainOverlay, CursorGlow efektai
- Build praėjo be klaidų, veikia `localhost:3000/v2/portfolio`

## Tikri duomenys (iš media kit)
**Šaltinis:** `/Users/osvaldasjonaitis/Documents/Obsidian-Vault/Business/Growth/Pitch-Templates/brand-media-kit.html`

### Pagrindinės metrikos
- 358K Instagram followers, 125K TikTok, 6.8% engagement rate
- 321K avg views, 24.4K avg likes, 2,396 avg saves
- 217M+ total reach, 295M+ total views
- 89 viral posts (500K+ views), 1,000+ total posts, 25+ brand partners
- Branded content: 192 posts, 296K avg views, 20.7K avg likes

### Auditorija (NERODYTI demografijos — tik LT aktualumas)
- Lithuania: ~90K followers, 358K reach/mo, ~1.3M views/mo, 95% Stories LT
- 4.3x more Lithuanians see content than follow
- 28% of LT Instagram users see content monthly

### Case studies su tikrais skaičiais
| Brendas | Kategorija | Reach | Views | Postai |
|---------|-----------|-------|-------|--------|
| Mionetto | Lifestyle, Events | 9.1M | 443K | 23 |
| Akropolis | Fashion, Shopping | 6.4M | 199K | 37 |
| Hellmann's | FMCG, Viral | 8.5M | 2.2M | 4 |
| Nissan | Automotive | 4.3M | 188K | 24 |
| Maxima | FMCG, Lifestyle | 1.7M | 193K | 11 |
| Luminor | Finance | 1.3M | 527K | 3 |

### Top branded content (su views)
Hellmann's 8.1M, Visit Dubai 5.7M, Mionetto 3.8M, Nissan 3.1M, Maxima 2.4M, Mionetto 1.8M

### Brand partners su total reach
Mionetto 3.7M, Akropolis 797K, Nissan 3.3M, Hellmann's 8.1M, Lancome 174K, Armani Beauty 212K, Moroccanoil 854K, H&M 273K, Luminor 842K, Maxima 834K, Burga 27K, ICI 1.6M, Wolf 42K, Dione 215K, Peninsula Paris, Visit Dubai 6.1M

### Services
Reels (cinematic video, 321K avg views), Photo (hi-res lifestyle, UGC), Stories (real-time + links, 25-30K views), TikTok (125K+ additional reach), UGC (content for brand channels), Production (TV & editorial quality)

## Ką reikia padaryti (GALUTINĖ VERSIJA)

### 1. Backup senos versijos
- `git tag v1-backup` arba kopija
- Sena versija turi likti nepaliesta

### 2. Scrappinti vizualus
- Naudoti Apify Instagram scraper'į @jasnauskaite profiliui
- Parsisiųsti top 6 branded content thumbnailius (Hellmann's, Visit Dubai, Mionetto, Nissan, Maxima, Mionetto #2)
- Parsisiųsti profilio nuotrauką
- Optimizuoti į WebP, išsaugoti `/public/images/`
- ARBA: naudoti Instagram embed iframe'us (jau veikia BentoHero v1)

### 3. Citatų integracija
- Patikrinti vault failus dėl surinktų citatų apie Inidę:
  - `Agentas/Learning/` direktorija
  - `Business/Growth/` direktorija
  - Google Drive dokumentai
- Citatos turi pabrėžti aktualumą Lietuvoje
- Integruoti kaip Press/Testimonials sekcija arba About dalis

### 4. Naujų sekcijų kūrimas
- **Branded Content Performance** banda: "192 branded posts · 296K avg views · 20.7K avg likes · 25+ brands" (kaip StatsTicker, bet branded)
- **Top Content** showcase: 6 geriausių branded postų thumbnailai su views (horizontal scroll)
- **Lithuania Impact** sekcija: "~90K LT followers · 358K reach/mo · 95% Stories LT" + citata apie aktualumą
- **Press/Quotes** sekcija su citatomis

### 5. Dizaino polish
- Hero: profilio nuotrauka/video integruoti
- Case Studies kortelės: thumbnail vizualai
- Light temos kontrastas stipresnis
- About: lifestyle nuotrauka
- Mobile responsiveness final check
- Navbar: desktop links veikia su smooth scroll

### 6. Route swap
- v2 portfolio pakeičia pagrindinį `/portfolio`
- Links page `/` atnaujintas su v2 stiliumi
- `/media-kit` arba pašalintas, arba atnaujintas

### 7. Final
- `npm run build` — 0 errors
- Visų sekcijų visual check (desktop + mobile)
- Deploy ready (`.htaccess` jau yra)

## Failų struktūra
```
src/app/v2/
├── layout.tsx          # Syne + DM Sans + Space Mono, ThemeProvider
├── v2-globals.css      # IG spalvų sistema, light/dark mode
├── portfolio/page.tsx  # Pagrindinis portfolio puslapis

src/components/v2/
├── layout/
│   ├── Navbar.tsx      # Fixed, floating, smooth scroll links
│   └── Footer.tsx      # Minimal, IG gradient line
├── sections/
│   ├── KineticHero.tsx          # Milžiniškas vardas, 6 metrikos, parallax
│   ├── SplitAbout.tsx           # Editorial split "01" + teksto reveal
│   ├── BrandWall.tsx            # 3-row staggered marquee
│   ├── EditorialCaseStudies.tsx # Horizontal scroll kortelės su stats
│   ├── StackedServices.tsx      # 3-column grid
│   ├── StatsTicker.tsx          # Bėgantys skaičiai
│   ├── MinimalFAQ.tsx           # Accordion su numeriais
│   └── KineticCTA.tsx           # Full-screen CTA
└── effects/
    ├── GrainOverlay.tsx    # Film grain
    ├── CursorGlow.tsx      # IG gradient cursor follow
    └── GradientText.tsx    # Reusable gradient text
```

## Reusable dalys (NEPERRAŠYTI)
- `src/translations/en.ts`, `lt.ts` — i18n tekstai
- `src/lib/i18n.tsx` — kalbos sistema
- `src/hooks/useSanity.ts` — Sanity hookai
- `public/logos/*.svg` — 11 brand logotipų
- `public/robots.txt`, `public/sitemap.xml`

## Dizaino principai
- IG gradient spalvos = visa atmosfera (ne tik akcentas)
- Light tema default, dark per toggle
- Syne (headings), DM Sans (body), Space Mono (monospace/stats)
- Kompaktiška — jokio scroll-pinning, greitas scrollas
- Jokios demografijos — tik performance ir LT aktualumas
- Citatos pabrėžia LT rinkos poziciją
