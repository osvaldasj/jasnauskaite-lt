"use client";

import Script from "next/script";

const GA_MEASUREMENT_ID = "G-EVNFT0Y8XX";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export function trackEvent(action: string, category: string, label?: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  }
}

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });

          document.addEventListener('click', function(e) {
            var el = e.target.closest('a[href]');
            if (!el) return;
            var href = el.getAttribute('href') || '';
            if (href.includes('instagram.com')) gtag('event', 'click', {event_category: 'outbound', event_label: 'instagram'});
            else if (href.includes('tiktok.com')) gtag('event', 'click', {event_category: 'outbound', event_label: 'tiktok'});
            else if (href.includes('rentboutique')) gtag('event', 'click', {event_category: 'outbound', event_label: 'rentboutique'});
            else if (href.includes('mailto:')) gtag('event', 'click', {event_category: 'contact', event_label: 'email'});
            else if (href.includes('#contact') || el.textContent.includes('Collaborate') || el.textContent.includes('Bendradarbiauti')) gtag('event', 'click', {event_category: 'cta', event_label: 'collaborate'});
            else if (href.includes('/insights/')) gtag('event', 'click', {event_category: 'content', event_label: href});
          });
        `}
      </Script>
    </>
  );
}
