# jasnauskaite.lt — Deploy-Ready Design

**Data:** 2026-03-24
**Statusas:** Draft

---

## Current State

The Next.js app builds successfully with 4 static pages:
- `/` — Links/Linktree page (Instagram bio link destination)
- `/portfolio` — Main portfolio site (BentoHero, CaseStudies, ClientLogos, About, Services, Testimonials, FAQ, CTA)
- `/media-kit` — Media kit page
- `/_not-found` — 404 page

### Tech Stack (confirmed working)
- Next.js 16.1.6 (static export)
- React 19.2.3 + TypeScript
- Tailwind CSS v4
- Framer Motion 12.36
- next-themes (dark mode)
- Lenis (smooth scrolling)
- Sanity hooks (ready, using fallback data)

### Assets
- 11 brand logo SVGs in `/public/logos/`
- robots.txt + sitemap.xml
- favicon.ico

---

## Scope: Deploy-Ready Sprint

### What we're doing
1. Verify build passes (DONE)
2. Preview site locally and fix visual issues
3. Fix nav link behavior on /portfolio page
4. Verify dark/light mode across all sections
5. Verify mobile responsiveness
6. Prepare Hostinger deploy instructions

### What we're NOT doing
- Sanity CMS configuration
- Real content replacement (placeholder data stays)
- Contact form backend
- Newsletter/Beehiiv integration
- Instagram Graph API integration

---

## Deploy Strategy

**Method:** Static export (`output: "export"`) to Hostinger shared hosting
**Upload:** FTP/SFTP to `public_html/` directory
**Domain:** jasnauskaite.lt (DNS already configured at Hostinger)

### File structure on Hostinger
```
public_html/
├── index.html          (links page)
├── portfolio/
│   └── index.html      (main portfolio)
├── media-kit/
│   └── index.html      (media kit)
├── _next/              (JS/CSS assets)
├── logos/              (brand SVGs)
├── images/             (photos)
├── videos/             (hero video)
├── robots.txt
├── sitemap.xml
└── favicon.ico
```

### .htaccess for Hostinger
- Force HTTPS
- Handle 404 fallback
- Cache headers for static assets
- Gzip compression
