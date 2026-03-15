"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IGGradientLine } from "@/components/layout/IGGradientLine";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { GrainTexture } from "@/components/effects/GrainTexture";
import { trackPageView, trackFormStart, trackFormStep, trackFormComplete, trackFormAbandon } from "@/lib/analytics";

const contentTypes = [
  "Instagram Reels",
  "Story series",
  "TikTok",
  "Campaign",
  "Brand ambassadorship",
  "Photo shoot",
  "Other",
];

const timelines = [
  "Within 1-2 weeks",
  "Within a month",
  "Within 2-3 months",
  "No rush — planning ahead",
];

export default function CollaboratePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    contentType: [] as string[],
    timeline: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const formStarted = useRef(false);
  const [emailError, setEmailError] = useState("");

  const totalSteps = 3;

  const handleFormStart = useCallback(() => {
    if (!formStarted.current) {
      formStarted.current = true;
      trackFormStart("collaborate");
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (formStarted.current && !submitted) {
        trackFormAbandon("collaborate", step);
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [step, submitted]);

  useEffect(() => {
    trackPageView("/collaborate");
  }, []);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!validateEmail(formData.email)) {
        setEmailError("Please enter a valid email address");
        return;
      }
      setEmailError("");
    }
    const nextStep = step + 1;
    setStep(nextStep);
    trackFormStep("collaborate", nextStep);
  };

  const toggleContentType = (type: string) => {
    handleFormStart();
    setFormData((prev) => ({
      ...prev,
      contentType: prev.contentType.includes(type)
        ? prev.contentType.filter((t) => t !== type)
        : [...prev.contentType, type],
    }));
  };

  const handleSubmit = () => {
    trackFormComplete("collaborate");

    const subject = `Collaboration inquiry — ${formData.company || formData.name}`;
    const body = `Hi,

Name: ${formData.name}
Company/Brand: ${formData.company}
Email: ${formData.email}

Content type: ${formData.contentType.join(", ")}
Timeline: ${formData.timeline}

Message:
${formData.message}`;

    window.location.href = `mailto:osvaldas@reelize.lt?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <>
      <CursorGlow />
      <GrainTexture />
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-center mb-12"
          >
            <h1 className="font-[family-name:var(--font-outfit)] font-semibold text-4xl md:text-5xl tracking-[0.02em] mb-4">
              Let&apos;s create{" "}
              <span className="ig-gradient-text">together</span>
            </h1>
            <p className="text-[var(--muted)] font-[family-name:var(--font-inter)] max-w-md mx-auto">
              Fill out the form and I&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>

          {/* Progress bar */}
          <div className="mb-10">
            <div className="flex justify-between text-xs text-[var(--muted)] font-[family-name:var(--font-inter)] mb-2">
              <span>Step {step} of {totalSteps}</span>
            </div>
            <div className="h-1 bg-[var(--surface)] rounded-full overflow-hidden">
              <motion.div
                className="h-full ig-gradient-line rounded-full"
                style={{ height: "100%" }}
                animate={{ width: `${(step / totalSteps) * 100}%` }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #833AB4, #C13584, #F77737)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-2xl mb-2">
                Thank you for reaching out!
              </h2>
              <p className="text-[var(--muted)] font-[family-name:var(--font-inter)]">
                I&apos;ll respond within 24 hours.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            >
              {/* Step 1: Contact info */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-[family-name:var(--font-inter)] font-medium mb-2">
                      Your name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onFocus={handleFormStart}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Full name"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background)] font-[family-name:var(--font-inter)] text-sm focus:outline-none focus:border-[#C13584]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-[family-name:var(--font-inter)] font-medium mb-2">
                      Company / Brand
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your brand or agency"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background)] font-[family-name:var(--font-inter)] text-sm focus:outline-none focus:border-[#C13584]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-[family-name:var(--font-inter)] font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onFocus={handleFormStart}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (emailError) setEmailError("");
                      }}
                      placeholder="you@company.com"
                      className={`w-full px-4 py-3 rounded-xl border bg-[var(--background)] font-[family-name:var(--font-inter)] text-sm focus:outline-none transition-colors ${
                        emailError
                          ? "border-red-400 focus:border-red-400"
                          : "border-[var(--border-color)] focus:border-[#C13584]/50"
                      }`}
                    />
                    {emailError && (
                      <p className="text-xs text-red-400 font-[family-name:var(--font-inter)] mt-1">
                        {emailError}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Content type + timeline */}
              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-[family-name:var(--font-inter)] font-medium mb-4">
                      What content do you need? (select multiple)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {contentTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => toggleContentType(type)}
                          className={`px-4 py-3 rounded-xl border text-sm font-[family-name:var(--font-inter)] text-left transition-all cursor-pointer ${
                            formData.contentType.includes(type)
                              ? "border-[#C13584]/50 bg-[#C13584]/5 text-[var(--foreground)]"
                              : "border-[var(--border-color)] text-[var(--muted)] hover:border-[var(--muted)]/30"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-[family-name:var(--font-inter)] font-medium mb-4">
                      When do you need the content?
                    </label>
                    <div className="space-y-2">
                      {timelines.map((t) => (
                        <button
                          key={t}
                          onClick={() => setFormData({ ...formData, timeline: t })}
                          className={`w-full px-4 py-3 rounded-xl border text-sm font-[family-name:var(--font-inter)] text-left transition-all cursor-pointer ${
                            formData.timeline === t
                              ? "border-[#C13584]/50 bg-[#C13584]/5 text-[var(--foreground)]"
                              : "border-[var(--border-color)] text-[var(--muted)] hover:border-[var(--muted)]/30"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Message */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-[family-name:var(--font-inter)] font-medium mb-2">
                      Tell me more about your project
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="What's the idea? What's the goal? Any additional info helps..."
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background)] font-[family-name:var(--font-inter)] text-sm focus:outline-none focus:border-[#C13584]/50 transition-colors resize-none"
                    />
                  </div>

                  {/* Summary */}
                  <div className="p-4 rounded-xl bg-[var(--surface)] space-y-2">
                    <p className="text-xs text-[var(--muted)] font-[family-name:var(--font-inter)] uppercase tracking-widest mb-3">Summary</p>
                    <p className="text-sm font-[family-name:var(--font-inter)]">
                      <span className="text-[var(--muted)]">Name:</span> {formData.name || "—"}
                    </p>
                    <p className="text-sm font-[family-name:var(--font-inter)]">
                      <span className="text-[var(--muted)]">Brand:</span> {formData.company || "—"}
                    </p>
                    <p className="text-sm font-[family-name:var(--font-inter)]">
                      <span className="text-[var(--muted)]">Content:</span> {formData.contentType.join(", ") || "—"}
                    </p>
                    <p className="text-sm font-[family-name:var(--font-inter)]">
                      <span className="text-[var(--muted)]">Timeline:</span> {formData.timeline || "—"}
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between mt-10">
                {step > 1 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="text-sm font-[family-name:var(--font-inter)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                  >
                    &larr; Back
                  </button>
                ) : (
                  <div />
                )}

                {step < totalSteps ? (
                  <button
                    onClick={handleNextStep}
                    disabled={step === 1 && (!formData.name || !formData.email)}
                    className="shimmer-button text-white font-[family-name:var(--font-inter)] font-medium px-8 py-3 rounded-full text-sm transition-transform hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 cursor-pointer"
                  >
                    Next &rarr;
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="shimmer-button text-white font-[family-name:var(--font-inter)] font-medium px-8 py-3 rounded-full text-sm transition-transform hover:scale-105 cursor-pointer"
                  >
                    Send inquiry
                  </button>
                )}
              </div>
            </motion.div>
          )}

          <IGGradientLine className="mt-16" />
        </div>
      </main>
      <Footer />
    </>
  );
}
