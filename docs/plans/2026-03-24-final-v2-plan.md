# jasnauskaite.lt v2 — Galutinė versija planas

**Data:** 2026-03-24
**Statusas:** Laukia implementacijos

---

## Kas jau padaryta
- v2 dizainas veikia `/v2/portfolio` — light tema, IG gradient vibe
- 13 komponentų sukurti (Hero, About, BrandWall, Services, CaseStudies, FAQ, CTA, Footer, Navbar, effects)
- Kompaktiškas layoutas (no scroll-pinning)
- Media kit tikri duomenys integruoti (358K, 125K, 6.8%, 295M+ views, 217M+ reach)
- Case studies su tikrais skaičiais (Mionetto 9.1M, Hellmann's 8.5M, Akropolis 6.4M...)
- Sena versija saugi `/portfolio`

---

## Kas reikia galutinei versijai

### 1. Vizualų scrappinimas (Apify)
- Scrappinti @jasnauskaite Instagram profilio top postus — thumbnailai, metrikos
- Top branded content thumbnailai (Mionetto, Hellmann's, Akropolis, Nissan, Maxima)
- Profilio nuotrauka
- Išsaugoti į `/public/images/` su optimizuotais dydžiais (WebP)

### 2. Citatų integracija
- **Turimos citatos apie Inidę** — surinktos iš žiniasklaidos, interviu
- Pabrėžti aktualumą Lietuvoje — LT influencer scenos kontekstas
- Integruoti kaip Testimonials/Press sekcija arba About sekcijos dalis
- Patikrinti vault failus dėl surinktų citatų

### 3. Vizualų integracija į sekcijas
- **Hero:** Tikra profilio nuotrauka arba branded video loop
- **Case Studies:** Kiekviena kortelė su top posto thumbnail
- **About:** Lifestyle nuotrauka
- **Brand logos:** Tikri SVG logotipai (jau turime 11)

### 4. Dizaino polish
- Light temos kontrastas — stipresnis (hero tekstas gerai matomas)
- Branded content performance sekcija (192 posts, 296K avg views, 20.7K avg likes)
- Lithuania deep dive sekcija (~90K LT followers, 358K reach/mo, 95% Stories LT)
- Services su kainų diapazonais (arba "Inquire")

### 5. Techniniai darbai
- Backup senos versijos (git tag arba kopija)
- v2 pakeičia pagrindinį `/portfolio` route
- Links page `/` atnaujintas su v2 stiliumi
- Build + deploy ready
- Mobile responsiveness final check

---

## Duomenų šaltiniai
- **Media kit:** `/Users/osvaldasjonaitis/Documents/Obsidian-Vault/Business/Growth/Pitch-Templates/brand-media-kit.html`
- **Brand logos:** `/next-app/public/logos/*.svg`
- **Translations:** `/next-app/src/translations/en.ts`, `lt.ts`
- **Citatos:** Patikrinti vault (Agentas/Learning/, Business/Growth/)
- **Instagram:** Apify scraperis @jasnauskaite

---

## Prioritetų tvarka
1. Backup senos versijos
2. Apify scrape vizualams
3. Citatų surinkimas iš vault
4. Vizualų integracija + citatos + LT aktualumas
5. Dizaino polish (kontrastas, spacing, branded content stats)
6. Route swap (v2 → pagrindinis)
7. Final build + verify + deploy ready
