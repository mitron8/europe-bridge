"use client";

import React, { useEffect, useState, useId } from "react";
import Link from "next/link";
import {
  X,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  User,
  Phone,
} from "lucide-react";

export default function OfferConsultationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const nameId = useId();
  const contactId = useId();
  const degreeId = useId();

  // Form inputs
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    degree: "Winter Intake 2025/26",
  });

  useEffect(() => {
    // Check if dismissed previously in this session
    const isDismissed = sessionStorage.getItem("eb_offer_popup_dismissed");
    if (isDismissed) return;

    let triggered = false;

    const triggerPopup = () => {
      if (triggered) return;
      triggered = true;
      setIsOpen(true);
      window.removeEventListener("scroll", handleScroll);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      // Triggers when user scrolls down a little (e.g. > 260px)
      if (scrollY > 260) {
        triggerPopup();
      }
    };

    // Also allow opening via custom window event from any CTA button
    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("open-offer-modal", handleCustomOpen);

    // Initial check in case user is already scrolled
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("open-offer-modal", handleCustomOpen);
    };
  }, []);

  // Lock Lenis & body scroll while modal is active
  useEffect(() => {
    if (!isOpen) return;

    const lenis = window.__lpLenis;
    if (lenis) lenis.stop();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem("eb_offer_popup_dismissed", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim()) return;

    setLoading(true);
    // Lead capture reservation
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      sessionStorage.setItem("eb_offer_popup_dismissed", "true");
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book a Free Germany Admissions Consultation"
      className="fixed inset-0 z-[120] flex items-center justify-center p-3.5 sm:p-5 overflow-y-auto bg-[#0d0d10]/55 backdrop-blur-sm transition-all duration-300 animate-in fade-in"
    >
      {/* Click outside backdrop */}
      <div
        className="fixed inset-0 -z-10"
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Modal Container — Light Bavarian Stationery Card */}
      <div className="relative w-full max-w-[500px] overflow-hidden rounded-[24px] border border-[#e2ddd4] bg-[#faf8f4] text-[#16161a] shadow-[0_24px_65px_-12px_rgba(22,22,26,0.22)] transition-all animate-in zoom-in-95 duration-200">
        
        {/* Subtle Architectural Outline Illustration in background — natural pencil sketch engraving */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center overflow-hidden opacity-[0.09] select-none"
          style={{
            mixBlendMode: "multiply",
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 45%, transparent 95%)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 45%, transparent 95%)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/landing/german-landmarks-outline.jpg"
            alt=""
            className="h-[210px] w-full object-cover object-bottom"
            loading="lazy"
          />
        </div>

        {/* Modal Inner Content */}
        <div className="relative z-10 p-6 sm:p-7">
          {!submitted ? (
            <>
              {/* Top row: Eyebrow + Close Button */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#807a70]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--lp-red)]" />
                  Free 1-on-1 Consultation
                </div>

                <button
                  onClick={handleDismiss}
                  aria-label="Close popup"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ede7dc] text-[#6b665d] transition hover:bg-[#e0d9cd] hover:text-[#16161a]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Editorial Serif Headline */}
              <h3 className="lp-serif mt-3 text-[24px] sm:text-[27px] font-semibold leading-[1.22] tracking-[-0.02em] text-[#16161a]">
                Plan your Germany journey with alumni of top universities.
              </h3>

              <p className="mt-2 text-[13.5px] leading-relaxed text-[#66625a]">
                Review your prerequisites, calculate your German GPA, and explore €0 tuition English-taught programs tailored to your profile.
              </p>

              {/* Clean, Non-AI Human Form */}
              <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                <div>
                  <label htmlFor={nameId} className="block text-[12px] font-medium text-[#3b3832] mb-1">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9c9588] pointer-events-none" />
                    <input
                      id={nameId}
                      type="text"
                      required
                      placeholder="e.g. Aryan Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-[#dbd5c9] bg-white pl-10 pr-3.5 py-2.5 text-[14px] text-[#16161a] placeholder-[#a69f92] outline-none transition focus:border-[#16161a] focus:ring-1 focus:ring-[#16161a]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={contactId} className="block text-[12px] font-medium text-[#3b3832] mb-1">
                      WhatsApp / Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9c9588] pointer-events-none" />
                      <input
                        id={contactId}
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="w-full rounded-xl border border-[#dbd5c9] bg-white pl-10 pr-3.5 py-2.5 text-[14px] text-[#16161a] placeholder-[#a69f92] outline-none transition focus:border-[#16161a] focus:ring-1 focus:ring-[#16161a]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={degreeId} className="block text-[12px] font-medium text-[#3b3832] mb-1">
                      Target Intake
                    </label>
                    <select
                      id={degreeId}
                      value={formData.degree}
                      onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                      className="w-full rounded-xl border border-[#dbd5c9] bg-white px-3.5 py-2.5 text-[14px] text-[#16161a] outline-none transition focus:border-[#16161a] focus:ring-1 focus:ring-[#16161a] cursor-pointer"
                    >
                      <option value="Winter Intake 2025/26">Winter Intake 2025/26</option>
                      <option value="Summer Intake 2026">Summer Intake 2026</option>
                      <option value="Master's (English-Taught)">Master&apos;s (English-Taught)</option>
                      <option value="Bachelor's Degree">Bachelor&apos;s Degree</option>
                    </select>
                  </div>
                </div>

                {/* Primary Action Button — Elevated EuropeBridge Signature Red Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-2.5 w-full flex items-center justify-center gap-2.5 rounded-full bg-[var(--lp-red)] hover:bg-[#d42d3a] active:scale-[0.99] h-[48px] px-6 text-[14.5px] font-semibold text-white shadow-[0_6px_20px_-2px_rgba(230,57,70,0.35)] hover:shadow-[0_8px_26px_-2px_rgba(230,57,70,0.45)] transition-all duration-300 cursor-pointer disabled:opacity-70"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Scheduling your session...
                    </span>
                  ) : (
                    <>
                      <span>Book Free Consultation</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              {/* Bottom Reassurance & Dismiss */}
              <div className="mt-3.5 flex items-center justify-between text-[11.5px] text-[#787267]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#5e594f]" /> 100% confidential · No spam
                </span>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="text-[#6b655b] hover:text-[#16161a] transition underline underline-offset-2"
                >
                  Maybe later
                </button>
              </div>
            </>
          ) : (
            /* Clean confirmation state */
            <div className="py-5 text-center animate-in zoom-in-95 duration-200">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600">
                <CheckCircle2 className="h-7 w-7 text-emerald-600" />
              </div>

              <h4 className="lp-serif mt-3.5 text-[22px] sm:text-[25px] font-semibold text-[#16161a]">
                Consultation Booked
              </h4>

              <p className="mt-2 text-[14px] text-[#5e5a52] max-w-[380px] mx-auto leading-relaxed">
                Thank you <strong className="text-[#16161a]">{formData.name}</strong>. A dedicated admissions mentor
                will reach out via WhatsApp / Phone to schedule your 1-on-1 session.
              </p>

              <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <Link
                  href="/tools/admission-chance"
                  onClick={handleDismiss}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[var(--lp-red)] hover:bg-[#d42d3a] px-6 py-2.5 text-[13.5px] font-semibold text-white shadow-sm transition"
                >
                  Check Admission Chances <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="w-full sm:w-auto px-4 py-2.5 text-[13px] text-[#6b655b] hover:text-[#16161a] transition"
                >
                  Close &amp; Return
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
