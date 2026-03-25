"use client";

import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <polyline points="22,4 12,13 2,4" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  KineticCTA section                                                 */
/* ------------------------------------------------------------------ */

export default function KineticCTA() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[var(--v2-bg)] px-6">
      {/* Ambient gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(193, 53, 132, 0.4) 0%, rgba(131, 58, 180, 0.2) 40%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Secondary glow — offset */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-2/3 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(247, 119, 55, 0.4) 0%, transparent 60%)",
          }}
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.08, 0.18, 0.08],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-3xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Label */}
        <p className="font-[family-name:var(--font-mono)] text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--v2-ig-purple)] mb-6">
          Get in touch
        </p>

        {/* Main heading */}
        <h2
          className="font-[family-name:var(--font-heading)] font-bold text-[var(--v2-text)] mb-6 leading-[1.05]"
          style={{
            fontSize: "clamp(40px, 8vw, 100px)",
          }}
        >
          Let&apos;s create
          <br />
          <span className="v2-gradient-text">together</span>
        </h2>

        {/* Description */}
        <p className="text-[var(--v2-text-muted)] text-base md:text-lg max-w-lg mx-auto mb-10 leading-relaxed font-[family-name:var(--font-body)]">
          Ready to bring your brand to life through authentic, engaging
          content? Let&apos;s talk about your next campaign.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary — email */}
          <motion.a
            href="mailto:osvaldas@reelize.lt"
            className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-[family-name:var(--font-body)] font-medium text-sm md:text-base overflow-hidden w-full sm:w-auto justify-center"
            style={{
              background:
                "linear-gradient(135deg, #833AB4, #C13584, #F77737)",
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shimmer overlay */}
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "v2-shimmer 3s ease-in-out infinite",
              }}
            />
            <MailIcon className="w-5 h-5 relative z-10" />
            <span className="relative z-10">osvaldas@reelize.lt</span>
          </motion.a>

          {/* Tertiary — Instagram */}
          <motion.a
            href="https://instagram.com/jasnauskaite"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-[family-name:var(--font-body)] font-medium text-sm md:text-base text-[var(--v2-text)] border border-[var(--v2-border)] hover:border-[var(--v2-ig-purple)] transition-colors duration-300 w-full sm:w-auto justify-center glow-hover"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
          >
            <InstagramIcon className="w-5 h-5" />
            <span>@jasnauskaite</span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
