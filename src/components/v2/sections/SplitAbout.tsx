"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useTranslation } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/*  Word-by-word reveal (desktop only)                                 */
/* ------------------------------------------------------------------ */

function WordReveal({
  text,
  className,
  scrollProgress,
  range,
}: {
  text: string;
  className?: string;
  scrollProgress: import("framer-motion").MotionValue<number>;
  range: [number, number];
}) {
  const words = text.split(" ");
  const totalWords = words.length;

  return (
    <span className={className}>
      {words.map((word, i) => {
        const start = range[0] + ((range[1] - range[0]) * i) / totalWords;
        const end = start + (range[1] - range[0]) / totalWords;
        return (
          <WordFade
            key={`${word}-${i}`}
            word={word}
            scrollProgress={scrollProgress}
            range={[start, Math.min(end, range[1])]}
          />
        );
      })}
    </span>
  );
}

function WordFade({
  word,
  scrollProgress,
  range,
}: {
  word: string;
  scrollProgress: import("framer-motion").MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(scrollProgress, range, [0.15, 1]);
  const y = useTransform(scrollProgress, range, [4, 0]);

  return (
    <motion.span
      className="inline-block mr-[0.3em] will-change-[opacity,transform]"
      style={{ opacity, y }}
    >
      {word}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile paragraph (simple fade in)                                  */
/* ------------------------------------------------------------------ */

function MobileParagraph({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.p
      ref={ref}
      className="text-sm md:text-base leading-relaxed text-[var(--v2-text-muted)] font-[family-name:var(--font-body)]"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.p>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function SplitAbout() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.3"],
  });

  // Left side number animation
  const numberOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const numberX = useTransform(scrollYProgress, [0, 0.15], [-40, 0]);

  const paragraph1 = t("about.paragraph1");
  const paragraph2 = t("about.paragraph2");
  const paragraph3Pre = t("about.paragraph3Pre");
  const paragraph3Post = t("about.paragraph3Post");
  const rawCompany = t("about.paragraph3Company");
  const reelizeName = rawCompany === "about.paragraph3Company" ? "" : rawCompany;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-16 md:py-24 px-6 md:px-12 overflow-hidden"
      style={{ background: "var(--v2-bg)", position: "relative" }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Mobile header: "01 --- ABOUT" horizontal */}
        <div className="flex items-center gap-4 mb-12 md:hidden">
          <span
            className="text-5xl font-bold font-[family-name:var(--font-mono)] v2-gradient-text"
          >
            01
          </span>
          <div className="h-px flex-1 bg-[var(--v2-border)]" />
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--v2-text-muted)] font-[family-name:var(--font-mono)]">
            About
          </span>
        </div>

        {/* Split layout */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          {/* Left column — number + vertical label (desktop only) */}
          <motion.div
            className="hidden md:flex md:w-[35%] lg:w-[30%] flex-col items-start sticky top-32 self-start"
            style={{ opacity: numberOpacity, x: numberX }}
          >
            <span
              className="text-[120px] lg:text-[160px] font-bold font-[family-name:var(--font-mono)] leading-none v2-gradient-text"
            >
              01
            </span>
            <div className="mt-6 flex flex-col items-center ml-6">
              {"ABOUT".split("").map((letter, i) => (
                <span
                  key={i}
                  className="text-xs tracking-[0.3em] text-[var(--v2-text-muted)] font-[family-name:var(--font-mono)] leading-[2.2]"
                >
                  {letter}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right column — content */}
          <div className="md:w-[65%] lg:w-[70%] flex flex-col gap-8">
            {/* Section label */}
            <motion.span
              className="text-xs uppercase tracking-[0.3em] font-[family-name:var(--font-mono)]"
              style={{ color: "var(--v2-ig-purple)" }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {t("about.label")}
            </motion.span>

            {/* Title */}
            <motion.h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] text-[var(--v2-text)] leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t("about.title")}{" "}
              <span className="v2-gradient-text">
                {t("about.titleHighlight")}
              </span>
            </motion.h2>

            {/* Paragraphs */}
            <div className="mt-4 flex flex-col gap-6">
              {/* Desktop: word-by-word reveal */}
              {!isMobile && (
                <>
                  <p className="text-sm md:text-base leading-relaxed text-[var(--v2-text-muted)] font-[family-name:var(--font-body)]">
                    <WordReveal
                      text={paragraph1}
                      scrollProgress={scrollYProgress}
                      range={[0.1, 0.35]}
                    />
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-[var(--v2-text-muted)] font-[family-name:var(--font-body)]">
                    <WordReveal
                      text={paragraph2}
                      scrollProgress={scrollYProgress}
                      range={[0.3, 0.55]}
                    />
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-[var(--v2-text-muted)] font-[family-name:var(--font-body)]">
                    <WordReveal
                      text={paragraph3Pre}
                      scrollProgress={scrollYProgress}
                      range={[0.5, 0.65]}
                    />
                    {reelizeName ? (
                      <>
                        {" "}
                        <span className="v2-gradient-text font-semibold">
                          {reelizeName}
                        </span>{" "}
                      </>
                    ) : " "}
                    <WordReveal
                      text={paragraph3Post}
                      scrollProgress={scrollYProgress}
                      range={[0.65, 0.8]}
                    />
                  </p>
                </>
              )}

              {/* Mobile: simple fade-in */}
              {isMobile && (
                <>
                  <MobileParagraph>{paragraph1}</MobileParagraph>
                  <MobileParagraph delay={0.1}>{paragraph2}</MobileParagraph>
                  <MobileParagraph delay={0.2}>
                    {paragraph3Pre}
                    {reelizeName ? (
                      <>
                        {" "}
                        <span className="v2-gradient-text font-semibold">
                          {reelizeName}
                        </span>{" "}
                      </>
                    ) : " "}
                    {paragraph3Post}
                  </MobileParagraph>
                </>
              )}
            </div>

            {/* Decorative gradient line */}
            <motion.div
              className="mt-8 h-px w-full max-w-sm"
              style={{ background: "var(--v2-gradient)" }}
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
