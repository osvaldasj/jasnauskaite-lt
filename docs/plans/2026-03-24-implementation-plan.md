# jasnauskaite.lt Media Kit Integration — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Perdizainuoti jasnauskaite.lt svetainę su interaktyviu media kit portfolio, naudojant esamą Next.js app'ą.

**Architecture:** Next.js 16 App Router su Tailwind CSS 4, Framer Motion animacijomis, light/dark mode. 7 sekcijų single-page svetainė su interaktyviu Portfolio kaip pagrindine sekcija. Duomenys iš statinių JSON failų (vėliau auto-update per Meta API).

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion 12, next-themes, Lenis

**Esamas projektas:** `/Users/osvaldasjonaitis/Documents/Projektai/Claude AI/jasnauskaite.lt/next-app/`
**Dev server:** `npm run dev` (port 3005)
**Design doc:** `docs/plans/2026-03-24-media-kit-integration-design.md`

**SVARBU:**
- TIK localhost — nedeployinti
- BE demografijos (amžius, lytis, šalys) viešai
- BE kainų
- Tik absoliutūs skaičiai (ne procentai)

---

## Kontekstas

Jau egzistuoja:
- Layout su Outfit + Inter fontais, ThemeProvider, SmoothScroll
- 30+ komponentų (Hero, About, Stats, Services, CaseStudies, etc.)
- CSS variables su light/dark mode
- Framer Motion setup
- Media kit HTML failai su base64 thumbnails: `Obsidian-Vault/Business/Growth/Pitch-Templates/brand-media-kit.html`
- Meta API duomenys: `/tmp/meta_all_posts_enriched.json` (1000 postų)
- Profilio analizė: `Obsidian-Vault/Business/Social-Analytics/Profiles/jasnauskaite-full-analysis.json`

## Duomenų paruošimas

Prieš pradedant komponentus, sukurti data failus next-app/src/data/:

### Data failai (iš esamų šaltinių):

**stats.json** — KPI skaičiai:
```json
{
  "followers": 358518,
  "avgViews": 321000,
  "avgLikes": 24400,
  "totalViews": "295M+",
  "totalReach": "217M+",
  "viralPosts": 89,
  "avgSaves": 2396,
  "totalPosts": "1,000+",
  "engagementRate": 6.8,
  "monthlyReach": "7.3M"
}
```

**brands.json** — Case studies (iš brand-media-kit.html):
```json
[
  {"name": "Mionetto", "posts": 23, "reach": "9.1M", "avgViews": "443K", "desc": "Lifestyle, events", "thumbnails": ["shortcode1"], "bestPostUrl": "https://instagram.com/reel/..."},
  {"name": "Akropolis", ...},
  {"name": "Hellmann's", ...},
  {"name": "Nissan", ...},
  {"name": "Maxima", ...},
  {"name": "Luminor", ...}
]
```

**partners.json** — Brand partners su linkais (iš media kit):
```json
[
  {"name": "Mionetto", "views": "3.7M", "url": "https://instagram.com/reel/..."},
  {"name": "Akropolis", "views": "797K", "url": "..."},
  ...
]
```

**thumbnails/** — Parsisiųsti iš base64 media kit arba Apify scrape

---

## Task 1: Duomenų failai

**Files:**
- Create: `src/data/stats.json`
- Create: `src/data/brands.json`
- Create: `src/data/partners.json`
- Create: `src/data/services.json`

**Step 1:** Sukurti stats.json iš Meta API duomenų (nuo 2024)
**Step 2:** Sukurti brands.json iš brand-media-kit.html duomenų
**Step 3:** Sukurti partners.json su visų brendų linkais
**Step 4:** Sukurti services.json su 6 services
**Step 5:** Commit

---

## Task 2: Page layout overhaul

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx` (jei reikia)

**Step 1:** Perrašyti page.tsx su 7 sekcijų struktūra:
```tsx
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Portfolio from '@/components/sections/Portfolio'
import Brands from '@/components/sections/Brands'
import Feed from '@/components/sections/Feed'
import Collaborate from '@/components/sections/Collaborate'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Portfolio />
      <Brands />
      <Feed />
      <Collaborate />
    </>
  )
}
```

**Step 2:** Patikrinti kad layout.tsx turi teisingus fontus ir theme provider
**Step 3:** Dev server test
**Step 4:** Commit

---

## Task 3: Hero sekcija

**Files:**
- Modify: `src/components/sections/Hero.tsx`

**Dizainas:**
- Avatar su gradient ring (IJ fallback)
- Vardas + handle
- 4 KPI su AnimatedCounter (followers, avg views, total views, viral)
- Social links (IG, TikTok)
- "Work With Me" CTA
- Framer Motion entrance animation

**Step 1:** Perrašyti Hero komponentą su nauju dizainu
**Step 2:** Sukurti AnimatedCounter komponentą (`src/components/ui/AnimatedCounter.tsx`)
**Step 3:** Test dev server
**Step 4:** Commit

---

## Task 4: About sekcija

**Files:**
- Modify: `src/components/sections/About.tsx`

**Dizainas:**
- Trumpas bio
- 4 highlight badges
- whileInView animacija

**Step 1:** Perrašyti About
**Step 2:** Test
**Step 3:** Commit

---

## Task 5: Portfolio sekcija (PAGRINDINĖ — media kit integracija)

**Files:**
- Create: `src/components/sections/Portfolio.tsx`
- Create: `src/components/portfolio/KpiRow.tsx`
- Create: `src/components/portfolio/CaseStudyCard.tsx`
- Create: `src/components/portfolio/FeaturedGallery.tsx`
- Create: `src/components/portfolio/ServiceCard.tsx`
- Create: `src/components/portfolio/BrandBadge.tsx`

**Subkomponentai:**

### 5a: KpiRow
- 4 KPI kortelės su AnimatedCounter
- Avg Views 321K, Avg Likes 24.4K, Avg Saves 2,396, Total Reach 217M+
- whileInView trigger

### 5b: CaseStudyCard
- Thumbnail + brendo pavadinimas + metrikos
- Gradient border (background-clip trick)
- Hover: scale + shadow
- Click → Instagram

### 5c: FeaturedGallery
- 6 thumbnails horizontalus scroll
- Framer Motion drag
- Views badge overlay

### 5d: ServiceCard
- Icon + title + description
- 6 services grid
- Hover: lift + gradient border

### 5e: BrandBadge
- Pill style, clickable
- Views badge
- Click → geriausias postas

### 5f: Portfolio wrapper
- Sujungia visus subkomponentus
- Section title + staggered animations

**Step 1-6:** Po vieną subkomponentą
**Step 7:** Portfolio wrapper
**Step 8:** Test viskas kartu
**Step 9:** Commit

---

## Task 6: Brands sekcija

**Files:**
- Modify: `src/components/sections/ClientLogos.tsx` (arba naujas Brands.tsx)

**Dizainas:**
- Brendų pavadinimai/logotipai
- Marquee animacija (infinite scroll)
- Grayscale → color hover

**Step 1:** Implementuoti
**Step 2:** Commit

---

## Task 7: Feed sekcija

**Files:**
- Modify: `src/components/sections/SocialFeed.tsx` (arba naujas Feed.tsx)

**Dizainas:**
- 6-9 postų grid
- Thumbnails iš Apify arba statiniai
- Hover: stats overlay (likes, views)

**Step 1:** Implementuoti su statiniais duomenimis
**Step 2:** Commit

---

## Task 8: Collaborate sekcija

**Files:**
- Create: `src/components/sections/Collaborate.tsx`

**Dizainas:**
- "Let's Create Together" heading
- Contact forma (Brand, Contact, Email, Message)
- Submit → API route (vėliau, dabar UI only)
- Success animation

**Step 1:** Implementuoti
**Step 2:** Commit

---

## Task 9: Navbar + Footer polish

**Files:**
- Modify: `src/components/layout/Navbar.tsx`
- Modify: `src/components/layout/Footer.tsx`

**Navbar:**
- Simplified links: About, Portfolio, Feed, Collaborate
- Dark/Light toggle
- Backdrop blur on scroll

**Footer:**
- Social links
- Email
- Copyright

**Step 1:** Polish navbar
**Step 2:** Polish footer
**Step 3:** Commit

---

## Task 10: Animacijos + Dark mode polish

**Files:**
- Modify: `src/lib/animations.ts`
- Modify: `src/app/globals.css`
- Various component tweaks

**Step 1:** Scroll-triggered animations visoms sekcijoms
**Step 2:** Dark mode spalvos visiem komponentam
**Step 3:** Smooth transitions tarp light/dark
**Step 4:** Responsive breakpoints patikrinimas
**Step 5:** Final commit

---

## Vykdymo eiliškumas

```
Task 1: Data files                    (10 min)
Task 2: Page layout                   (5 min)
Task 3: Hero                          (15 min)
Task 4: About                         (10 min)
Task 5: Portfolio (6 subkomponentai)  (45 min)
Task 6: Brands                        (10 min)
Task 7: Feed                          (15 min)
Task 8: Collaborate                   (10 min)
Task 9: Navbar + Footer               (10 min)
Task 10: Animations + Dark mode       (15 min)
```

**Total: ~2.5 val**

---

## Thumbnails

Media kit thumbnails (base64) yra per dideli Next.js komponentams. Reikia:
1. Parsisiųsti iš `/tmp/media-kit-thumbs/small/` kaip .jpg failus
2. Padėti į `next-app/public/images/portfolio/`
3. Naudoti `<Image>` komponentą su lokaliomis nuotraukomis

Arba naudoti Instagram CDN URLs tiesiogiai (bet jos expireuoja).

Geriausia: kopijuoti .jpg failus į public/ ir naudoti Next.js Image.
