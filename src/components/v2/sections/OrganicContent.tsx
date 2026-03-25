"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Organic / personal content grid                                    */
/* ------------------------------------------------------------------ */

const ORGANIC_POSTS = [
  {
    image: "/images/branded/organic-C4SX92Zt6pN.jpg",
    label: "Lifestyle",
    stat: "2.2M views",
    url: "https://www.instagram.com/reel/C4SX92Zt6pN/",
  },
  {
    image: "/images/branded/organic-DRjZN_fCLXa.jpg",
    label: "Fashion",
    stat: "511K views",
    url: "https://www.instagram.com/reel/DRjZN_fCLXa/",
  },
  {
    image: "/images/branded/organic-DR6npUDCK23.jpg",
    label: "Style",
    stat: "425K views",
    url: "https://www.instagram.com/reel/DR6npUDCK23/",
  },
  {
    image: "/images/branded/organic-DEsVR0TtO64.jpg",
    label: "Everyday",
    stat: "258K views",
    url: "https://www.instagram.com/reel/DEsVR0TtO64/",
  },
  {
    image: "/images/branded/organic-DTndqTCiLFF.jpg",
    label: "Travel",
    stat: "247K views",
    url: "https://www.instagram.com/reel/DTndqTCiLFF/",
  },
  {
    image: "/images/branded/organic-DNz2mq70H81.jpg",
    label: "Beauty",
    stat: "185K views",
    url: "https://www.instagram.com/reel/DNz2mq70H81/",
  },
];

export default function OrganicContent() {
  return (
    <section className="py-14 md:py-20 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[var(--v2-ig-purple)] font-[family-name:var(--font-mono)]">
            Personal feed
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--v2-text)] font-[family-name:var(--font-heading)]">
            Beyond{" "}
            <span className="v2-gradient-text">brands</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-[var(--v2-text-muted)] font-[family-name:var(--font-body)] max-w-xl">
            Not everything is a collaboration. Fashion, travel, beauty and
            everyday moments that keep the feed authentic.
          </p>
        </motion.div>

        {/* Grid — 2 rows, asymmetric */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {ORGANIC_POSTS.map((post, i) => (
            <motion.a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              key={post.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden border border-[var(--v2-border)] cursor-pointer"
            >
              <Image
                src={post.image}
                alt={post.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />

              {/* Overlay with label + stat */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <span className="bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1 text-white text-[9px] uppercase tracking-[0.12em] font-[family-name:var(--font-mono)]">
                  {post.label}
                </span>
                <span className="bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1 text-white text-[9px] font-bold font-[family-name:var(--font-mono)]">
                  {post.stat}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Instagram link */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="https://instagram.com/jasnauskaite"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[var(--v2-text-muted)] hover:text-[var(--v2-ig-magenta)] transition-colors font-[family-name:var(--font-mono)]"
          >
            <span>View more on Instagram</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
