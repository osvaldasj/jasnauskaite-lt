"use client";

import { useEffect, useState } from "react";

const RENTAL_URL = "https://www.rentboutique.com/lt/katalogas/inides-spinta/";

type Platform = "ios" | "android" | "other";

function detectInAppBrowser(): { inApp: boolean; app: string | null } {
  if (typeof navigator === "undefined") return { inApp: false, app: null };
  const ua = navigator.userAgent || "";
  if (/Instagram/i.test(ua)) return { inApp: true, app: "Instagram" };
  if (/FBAN|FBAV|FB_IAB/i.test(ua)) return { inApp: true, app: "Facebook" };
  if (/Messenger/i.test(ua)) return { inApp: true, app: "Messenger" };
  if (/TikTok|musical_ly|BytedanceWebview/i.test(ua)) return { inApp: true, app: "TikTok" };
  if (/Line\//i.test(ua)) return { inApp: true, app: "LINE" };
  if (/Twitter/i.test(ua)) return { inApp: true, app: "Twitter" };
  if (/Snapchat/i.test(ua)) return { inApp: true, app: "Snapchat" };
  return { inApp: false, app: null };
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
  const [state, setState] = useState<{
    checked: boolean;
    inApp: boolean;
    app: string | null;
    platform: Platform;
    autoAttempted: boolean;
  }>({ checked: false, inApp: false, app: null, platform: "other", autoAttempted: false });

  useEffect(() => {
    const { inApp, app } = detectInAppBrowser();
    const platform = detectPlatform();

    if (!inApp) {
      window.location.replace(RENTAL_URL);
      return;
    }

    if (platform === "android") {
      try {
        window.location.href = buildAndroidIntent(RENTAL_URL);
      } catch {}
      setState({ checked: true, inApp, app, platform, autoAttempted: true });
      return;
    }

    if (platform === "ios") {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = buildChromeIosUrl(RENTAL_URL);
      document.body.appendChild(iframe);

      setTimeout(() => {
        try {
          document.body.removeChild(iframe);
        } catch {}
        setState({ checked: true, inApp, app, platform, autoAttempted: true });
      }, 600);
      return;
    }

    setState({ checked: true, inApp, app, platform, autoAttempted: false });
  }, []);

  const openAndroidChrome = () => {
    window.location.href = buildAndroidIntent(RENTAL_URL);
  };

  const openIosChrome = () => {
    window.location.href = buildChromeIosUrl(RENTAL_URL);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(RENTAL_URL);
    } catch {
      const input = document.createElement("input");
      input.value = RENTAL_URL;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
  };

  if (!state.checked) {
    return (
      <div className="min-h-[100dvh] bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E1306C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const appName = state.app || "programėlės";

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col items-center justify-center px-6 py-10">
      <div className="max-w-[380px] w-full text-center">
        <div
          className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #833AB4, #C13584, #E1306C)" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.38 3.46L16 2 12 5.5 8 2 3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
          </svg>
        </div>

        <h1
          style={{ fontFamily: "var(--font-syne), sans-serif" }}
          className="text-2xl font-bold text-[#1A1A1A] mb-3"
        >
          {state.platform === "android"
            ? "Atidaroma Chrome…"
            : state.platform === "ios"
            ? "Bandau atidaryti naršyklėje…"
            : "Atidaryk naršyklėje"}
        </h1>

        <p
          className="text-[14px] text-[#666] leading-relaxed mb-6"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          {state.platform === "android"
            ? "Jei sistema klausia — patvirtink „Chrome“. Jei nepavyksta automatiškai, paspausk mygtuką žemiau."
            : state.platform === "ios"
            ? `${appName} naršyklė riboja nuomos parduotuvės funkcijas. Pabandyk mygtuką žemiau arba atidaryk rankiniu būdu.`
            : `${appName} naršyklė riboja nuomos parduotuvės funkcijas. Atidaryk nuorodą išorinėje naršyklėje — patyrimas bus sklandesnis.`}
        </p>

        {state.platform === "android" && (
          <button
            onClick={openAndroidChrome}
            className="w-full py-3.5 px-5 rounded-2xl text-white font-semibold text-[15px] active:scale-[0.98] transition-transform mb-3"
            style={{
              background: "linear-gradient(135deg, #833AB4, #C13584, #E1306C)",
              fontFamily: "var(--font-outfit), sans-serif",
            }}
          >
            Atidaryti Chrome
          </button>
        )}

        {state.platform === "ios" && (
          <button
            onClick={openIosChrome}
            className="w-full py-3.5 px-5 rounded-2xl text-white font-semibold text-[15px] active:scale-[0.98] transition-transform mb-3"
            style={{
              background: "linear-gradient(135deg, #833AB4, #C13584, #E1306C)",
              fontFamily: "var(--font-outfit), sans-serif",
            }}
          >
            Atidaryti Chrome (jei įdiegta)
          </button>
        )}

        <div className="rounded-2xl bg-[#F7F7F5] border border-[#E5E5E0] p-4 mb-3 text-left">
          <p
            className="text-[12px] font-semibold text-[#1A1A1A] mb-2 tracking-[0.08em] uppercase"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            Rankiniu būdu — {state.app || "in-app"}
          </p>
          <ol
            className="text-[13px] text-[#555] space-y-1.5 list-decimal list-inside leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            <li>
              Paspausk <b>⋯</b> (arba <b>⋮</b>) viršutiniame dešiniame kampe
            </li>
            <li>
              Pasirink{" "}
              <b>
                {state.platform === "ios"
                  ? "„Open in external browser" + '"'
                  : "„Open in browser" + '"'}
              </b>
            </li>
          </ol>
        </div>

        <button
          onClick={copyLink}
          className="w-full py-3 px-5 rounded-2xl text-[#1A1A1A] font-medium text-[14px] bg-white border border-[#E5E5E0] active:scale-[0.98] transition-transform mb-3"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          Nukopijuoti nuorodą
        </button>

        <a
          href={RENTAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-[12px] text-[#999] underline underline-offset-4"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          Tęsti vis tiek čia
        </a>
      </div>
    </div>
  );
}
