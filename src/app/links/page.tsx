"use client";

import { useEffect, useState } from "react";
/* eslint-disable @next/next/no-img-element */

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function ClosetIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.38 3.46L16 2 12 5.5 8 2 3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
    </svg>
  );
}

function WebIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const links = [
  {
    title: "Instagram",
    subtitle: "358K followers",
    href: "https://instagram.com/jasnauskaite",
    icon: <InstagramIcon />,
    color: "#C13584",
  },
  {
    title: "TikTok",
    subtitle: "125K followers",
    href: "https://tiktok.com/@jasnauskaite",
    icon: <TikTokIcon />,
    color: "#1A1A1A",
  },
  {
    title: "Rent my looks",
    subtitle: "Rent Boutique",
    href: "https://www.rentboutique.com/lt/katalogas/inides-spinta/",
    icon: <ClosetIcon />,
    color: "#E1306C",
  },
  {
    title: "Portfolio",
    subtitle: "jasnauskaite.lt",
    href: "/",
    icon: <WebIcon />,
    color: "#833AB4",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function LinksPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col items-center justify-center px-5 py-10">

      {/* ── Profile ─────────────────────────── */}
      <div
        className="text-center mb-10 transition-all duration-700"
        style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)" }}
      >
        {/* Avatar */}
        <div className="relative w-28 h-28 mx-auto mb-5">
          <div
            className="absolute inset-0 rounded-full p-[2.5px]"
            style={{ background: "linear-gradient(135deg, #833AB4, #C13584, #E1306C, #F77737, #FCAF45)" }}
          >
            <div className="w-full h-full rounded-full bg-white p-[3px]">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src="/images/profile.jpg"
                  alt="Inidė Jasnauskaitė-Jonaitė"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Name */}
        <h1 style={{ fontFamily: "var(--font-syne), sans-serif" }} className="font-bold text-xl tracking-tight text-[#1A1A1A] leading-tight">
          <span className="block">Inidė</span>
          <span
            className="block text-3xl bg-clip-text text-transparent mt-0.5"
            style={{ backgroundImage: "linear-gradient(90deg, #833AB4, #C13584, #E1306C)" }}
          >
            Jasnauskaitė
          </span>
          <span className="block text-[#999] font-normal text-[11px] tracking-[0.2em] uppercase mt-1" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
            Jonaitė
          </span>
        </h1>

        <p className="text-[13px] text-[#888] mt-3 max-w-[260px] mx-auto leading-relaxed" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
          Fashion, beauty & lifestyle content creator
        </p>
      </div>

      {/* ── Links 2x2 Grid ──────────────────── */}
      <div className="w-full max-w-[280px] grid grid-cols-2 gap-2.5">
        {links.map((link, i) => (
          <a
            key={link.title}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="relative rounded-2xl p-4 pt-4 pb-3 bg-white border border-[#E5E5E0] hover:shadow-md active:scale-[0.97] transition-all duration-200 flex flex-col justify-between aspect-square group"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transition: `all 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${0.15 + i * 0.07}s`,
            }}
          >
            {/* Arrow */}
            <div className="self-end opacity-0 group-hover:opacity-50 transition-opacity" style={{ color: link.color }}>
              <ArrowIcon />
            </div>

            {/* Icon + Text */}
            <div className="mt-auto">
              <div className="mb-2 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: link.color }}>
                {link.icon}
              </div>
              <p className="font-semibold text-[14px] leading-tight" style={{ color: link.color, fontFamily: "var(--font-outfit), sans-serif" }}>
                {link.title}
              </p>
              <p className="text-[10px] text-[#999] mt-0.5" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                {link.subtitle}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* ── Footer ──────────────────────────── */}
      <div
        className="mt-8 text-center transition-opacity duration-700"
        style={{ opacity: mounted ? 1 : 0, transitionDelay: "0.7s" }}
      >
        <div
          className="w-12 h-[1.5px] mx-auto mb-2.5 rounded-full opacity-40"
          style={{ background: "linear-gradient(90deg, #833AB4, #C13584, #E1306C, #F77737, #FCAF45)" }}
        />
        <p className="text-[10px] text-[#bbb] tracking-[0.08em]" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
          jasnauskaite.lt
        </p>
      </div>
    </div>
  );
}
