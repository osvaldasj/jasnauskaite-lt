"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/*  Service data with examples                                         */
/* ------------------------------------------------------------------ */

const SERVICES = [
  {
    key: "reels",
    icon: "reels",
    example: {
      image: "/images/branded/mionetto1.jpg",
      brand: "Mionetto",
      stat: "3.8M views",
    },
  },
  {
    key: "stories",
    icon: "stories",
    example: {
      image: "/images/branded/akropolis.jpg",
      brand: "Akropolis",
      stat: "37 stories",
    },
  },
  {
    key: "posts",
    icon: "posts",
    example: {
      image: "/images/branded/cover-1.jpg",
      brand: "Personal",
      stat: "High engagement",
    },
  },
  {
    key: "tiktoks",
    icon: "tiktoks",
    example: {
      image: "/images/branded/maxima-DMK9spgtfv-.jpg",
      brand: "Maxima",
      stat: "542K views",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function ReelsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="4" />
      <line x1="2" y1="8" x2="22" y2="8" />
      <polygon points="10,12 10,18 16,15" fill="currentColor" stroke="none" />
    </svg>
  );
}

function StoriesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="7" strokeDasharray="4 3" />
    </svg>
  );
}

function PostsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.78a8.18 8.18 0 004.76 1.52V6.86a4.85 4.85 0 01-1-.17z" />
    </svg>
  );
}

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  reels: ReelsIcon,
  stories: StoriesIcon,
  posts: PostsIcon,
  tiktoks: TikTokIcon,
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function StackedServices() {
  const { t } = useTranslation();

  return (
    <section className="px-6 py-14 md:py-20">
      {/* Header */}
      <div className="mx-auto max-w-5xl mb-12 md:mb-16">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[var(--v2-ig-purple)] font-[family-name:var(--font-mono)]">
          {t("services.label")}
        </p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--v2-text)] font-[family-name:var(--font-heading)]">
          {t("services.title")}{" "}
          <span className="v2-gradient-text">{t("services.titleHighlight")}</span>
        </h2>
      </div>

      {/* Services grid */}
      <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {SERVICES.map((s, i) => {
          const Icon = ICONS[s.icon] ?? ReelsIcon;
          const num = String(i + 1).padStart(2, "0");
          const title = t(`services.${s.key}.title`);
          const description = t(`services.${s.key}.description`);

          return (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group rounded-2xl border border-[var(--v2-border)] hover:border-[var(--v2-ig-magenta)]/30 transition-colors overflow-hidden"
              style={{ background: "var(--v2-surface)" }}
            >
              {/* Example image */}
              <div className="relative h-[180px] md:h-[280px] overflow-hidden">
                <Image
                  src={s.example.image}
                  alt={`${title} example — ${s.example.brand}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-white text-[10px] uppercase tracking-[0.15em] font-[family-name:var(--font-mono)]">
                    {s.example.brand}
                  </span>
                  <span className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-white text-[10px] font-bold font-[family-name:var(--font-mono)]">
                    {s.example.stat}
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="w-5 h-5 text-[var(--v2-text-muted)]" />
                  <span className="text-xs font-[family-name:var(--font-mono)] v2-gradient-text font-bold">
                    {num}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-bold mb-2 text-[var(--v2-text)] font-[family-name:var(--font-heading)]">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--v2-text-muted)] font-[family-name:var(--font-body)]">
                  {description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
