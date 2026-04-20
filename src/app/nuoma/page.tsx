"use client";

import { useEffect, useState } from "react";

const RENTAL_URL = "https://www.rentboutique.com/lt/katalogas/inides-spinta/";

type Platform = "ios" | "android" | "other";

function detectInAppBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return /Instagram|FBAN|FBAV|FB_IAB|Messenger|TikTok|musical_ly|BytedanceWebview|Line\/|Twitter|Snapchat/i.test(
    ua
  );
}

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent || "";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "other";
}

function buildAndroidIntent(target: string): string {
  const noProtocol = target.replace(/^https?:\/\//, "");
  return `intent://${noProtocol}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(
    target
  )};end`;
}

function buildChromeIosUrl(target: string): string {
  return `googlechrome-x-callback://x-callback-url/open/?url=${encodeURIComponent(target)}`;
}

export default function NuomaPage() {
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [inApp, setInApp] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || "";
    const hasChromeIos = /CriOS/i.test(ua);
    const isInApp = detectInAppBrowser();
    const p = detectPlatform();

    if (!isInApp) {
      window.location.replace(RENTAL_URL);
      return;
    }

    setInApp(true);
    setPlatform(p);

    if (p === "android") {
      try {
        window.location.href = buildAndroidIntent(RENTAL_URL);
      } catch {}
      return;
    }

    if (p === "ios") {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = buildChromeIosUrl(RENTAL_URL);
      document.body.appendChild(iframe);
      setTimeout(() => {
        try {
          document.body.removeChild(iframe);
        } catch {}
      }, 600);
      return;
    }

    void hasChromeIos;
  }, []);

  const openAndroidChrome = () => {
    window.location.href = buildAndroidIntent(RENTAL_URL);
  };

  const openIosChrome = () => {
    window.location.href = buildChromeIosUrl(RENTAL_URL);
  };

  if (!inApp || !platform) {
    return (
      <div className="min-h-[100dvh] bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E1306C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col items-center justify-center px-6 py-10">
      <div className="max-w-[320px] w-full text-center">
        <div
          className="w-14 h-14 mx-auto mb-6 rounded-2xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #833AB4, #C13584, #E1306C)" }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.38 3.46L16 2 12 5.5 8 2 3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
          </svg>
        </div>

        <button
          onClick={platform === "android" ? openAndroidChrome : openIosChrome}
          className="w-full py-3.5 px-5 rounded-2xl text-white font-semibold text-[15px] active:scale-[0.98] transition-transform mb-3"
          style={{
            background: "linear-gradient(135deg, #833AB4, #C13584, #E1306C)",
            fontFamily: "var(--font-outfit), sans-serif",
          }}
        >
          Atidaryti Chrome
        </button>

        {platform === "ios" && (
          <p
            className="text-[11px] text-[#999] leading-relaxed mt-4"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Jei Chrome neatsidaro — viršuje <b>⋯</b> → „Open in external browser"
          </p>
        )}
      </div>
    </div>
  );
}
