"use client";

import React from "react";
import Link from "next/link";
import { Check, X, ArrowRight, ShieldCheck, Award, GraduationCap } from "lucide-react";

const rows = [
  {
    feature: "University focus",
    tagline: "Where your tuition goes",
    others: "Pushes paid private colleges with €15,000–€30,000/yr fees to collect high agent recruitment commissions.",
    us: "100% focused on €0-tuition public universities (TU9 & elite state institutions) with zero recruiter kickbacks.",
    usHighlight: "€0 Public Tuition Focus",
  },
  {
    feature: "SOP & mentorship",
    tagline: "Application authenticity",
    others: "Generic, copy-pasted templates churned out by sales agents that get rejected by German admission committees.",
    us: "One-on-one personalized strategy and review by actual alumni of TUM, RWTH Aachen and Germany's top universities.",
    usHighlight: "1-on-1 Alumni Review",
  },
  {
    feature: "APS & visa filing",
    tagline: "Bureaucracy & deadlines",
    others: "Slow manual verification, missed winter/summer deadlines, and unpredictable embassy rejections.",
    us: "Direct verification protocol, expedited APS tracking, and an audited 99.2% visa approval track record.",
    usHighlight: "99.2% Visa Approval Rate",
  },
  {
    feature: "On-ground support",
    tagline: "Arrival & integration",
    others: "Support abruptly terminates the second your flight departs your home airport gate.",
    us: "Hands-on post-arrival assistance with WG accommodation, city registration (Anmeldung), blocked accounts & health cover.",
    usHighlight: "Full Post-Arrival Care",
  },
];

export default function Comparison() {
  return (
    <section id="about" className="lp-sheet relative overflow-hidden bg-[#15151a] pt-24 pb-36 sm:pt-32 sm:pb-48 text-white">
      {/* Background Architectural Outline Illustration - luminous chalk/gold lines on dark theme */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center overflow-hidden opacity-[0.25] select-none"
        style={{
          filter: "invert(1) hue-rotate(180deg) brightness(1.25) contrast(1.15)",
          mixBlendMode: "screen",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 65%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 65%, transparent 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/landing/german-landmarks-outline.jpg"
          alt=""
          className="h-[420px] sm:h-[500px] md:h-[600px] w-full max-w-[1440px] object-cover object-top"
          loading="lazy"
        />
      </div>

      {/* Subtle warm amber/crimson ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-[500px] w-[900px] rounded-full opacity-35 blur-[140px]"
        style={{ background: "radial-gradient(closest-side, rgba(201,163,91,0.22), rgba(230,57,70,0.12), transparent)" }}
      />

      <div className="lp-container relative z-10">
        {/* Top Header */}
        <div data-parallax="20" className="grid gap-8 lg:grid-cols-[1fr_480px] lg:items-end">
          <div>
            <div data-reveal className="lp-eyebrow lp-eyebrow--light mb-5 !text-[var(--lp-gold-soft)]">
              Why EuropeBridge
            </div>
            <h2 data-reveal-lines className="lp-h2 !text-white" style={{ color: "#ffffff" }}>
              <span className="lp-line-mask">
                <span className="!text-white" style={{ color: "#ffffff" }}>The smart way</span>
              </span>
              <span className="lp-line-mask mt-1">
                <span>
                  <em className="lp-script !text-[#ff5c6b]">to Germany.</em>
                </span>
              </span>
            </h2>
          </div>

          <div>
            <p data-reveal className="text-[15px] sm:text-[16px] leading-[1.75] text-white/70">
              Traditional study abroad agencies make money from university recruitment commissions. We charge transparent
              advisory fees with zero kickbacks — so our guidance is 100% focused on getting you into Germany&apos;s world-renowned,
              €0-tuition public universities.
            </p>

            {/* Quick Trust Badges */}
            <div data-reveal className="mt-5 flex flex-wrap items-center gap-2.5 text-[12px] font-medium text-white/90">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.06] backdrop-blur-md px-3.5 py-1.5 shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-[#ff5c6b]" />
                0% Commission Bias
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.06] backdrop-blur-md px-3.5 py-1.5 shadow-sm">
                <GraduationCap className="h-3.5 w-3.5 text-[#ff5c6b]" />
                100% Public TU9 Focus
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.06] backdrop-blur-md px-3.5 py-1.5 shadow-sm">
                <Award className="h-3.5 w-3.5 text-[#ff5c6b]" />
                99.2% Visa Approval Rate
              </span>
            </div>
          </div>
        </div>

        {/* Comparison Matrix Container */}
        <div data-reveal className="mt-16 sm:mt-20">
          {/* Desktop Matrix */}
          <div className="hidden lg:block overflow-hidden rounded-[28px] border border-white/12 bg-[#1b1b22]/90 backdrop-blur-xl shadow-[0_24px_70px_-20px_rgba(0,0,0,0.6)]">
            {/* Table Header */}
            <div className="grid grid-cols-[250px_1fr_1.18fr] border-b border-white/10 bg-white/[0.04] px-8 py-5 text-[11px] font-bold uppercase tracking-[0.16em]">
              <div className="text-white/45">Milestone / Decision</div>
              <div className="px-6 text-white/45">Traditional Consultancy Model</div>
              <div className="flex items-center justify-between px-6 text-white">
                <span className="flex items-center gap-2 font-semibold">
                  <span className="h-2 w-2 rounded-full bg-[var(--lp-red)]" />
                  EuropeBridge Advisory
                </span>
                <span className="rounded-full bg-[var(--lp-gold)]/15 border border-[var(--lp-gold)]/30 px-3 py-0.5 text-[10px] font-bold tracking-normal text-[var(--lp-gold-soft)]">
                  Student First
                </span>
              </div>
            </div>

            {/* Rows */}
            {rows.map((r, idx) => (
              <div
                key={r.feature}
                className={`group grid grid-cols-[250px_1fr_1.18fr] items-center transition-colors duration-200 hover:bg-white/[0.03] ${
                  idx !== rows.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                {/* Feature Title */}
                <div className="py-7 pl-8 pr-4">
                  <div className="lp-serif text-[20px] font-semibold text-[#f4f1ea] leading-snug">
                    {r.feature}
                  </div>
                  <div className="mt-1 text-[12px] text-white/45 font-normal">
                    {r.tagline}
                  </div>
                </div>

                {/* Traditional Others */}
                <div className="flex items-start gap-3.5 border-l border-white/10 px-6 py-7 text-[14px] leading-relaxed text-white/50">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-white/40">
                    <X className="h-3 w-3 stroke-[2.5]" />
                  </div>
                  <span>{r.others}</span>
                </div>

                {/* EuropeBridge Us */}
                <div className="relative flex items-start gap-3.5 border-l border-white/15 bg-white/[0.05] px-6 py-7 text-[14.5px] leading-relaxed text-white transition-colors group-hover:bg-white/[0.08]">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--lp-red)] text-white shadow-[0_0_12px_rgba(230,57,70,0.5)]">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-white/95">{r.us}</span>
                    <div className="mt-1.5">
                      <span className="inline-flex items-center text-[11px] font-semibold text-[var(--lp-gold-soft)] bg-[var(--lp-gold)]/15 border border-[var(--lp-gold)]/25 px-2.5 py-0.5 rounded-md">
                        {r.usHighlight}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Cards */}
          <div className="space-y-4 lg:hidden">
            {rows.map((r) => (
              <div
                key={r.feature}
                data-reveal
                className="overflow-hidden rounded-2xl border border-white/12 bg-[#1b1b22] p-6 shadow-md"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="lp-serif text-[22px] font-semibold text-white">{r.feature}</h3>
                  <span className="text-[11px] font-semibold text-white/45">{r.tagline}</span>
                </div>

                <div className="mt-5 space-y-3.5">
                  {/* Traditional */}
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-white/45 mb-1.5 flex items-center gap-1.5">
                      <X className="h-3.5 w-3.5 text-red-400" /> Traditional Agencies
                    </div>
                    <div className="text-[13.5px] leading-relaxed text-white/55">
                      {r.others}
                    </div>
                  </div>

                  {/* EuropeBridge */}
                  <div className="rounded-xl border border-[var(--lp-red)]/35 bg-white/[0.07] p-4 shadow-xs">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#ff808d] mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 stroke-[3]" /> EuropeBridge
                      </span>
                      <span className="rounded bg-[var(--lp-red)]/20 border border-[var(--lp-red)]/30 px-2 py-0.5 text-[10px] font-bold text-[var(--lp-gold-soft)]">{r.usHighlight}</span>
                    </div>
                    <div className="text-[14px] font-medium leading-relaxed text-white">
                      {r.us}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom callout strip */}
          <div
            data-reveal
            className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/12 bg-white/[0.05] backdrop-blur-md px-6 py-4.5 sm:flex-row sm:px-8"
          >
            <div className="flex items-center gap-3 text-[13.5px] text-white/70">
              <span className="h-2 w-2 rounded-full bg-[var(--lp-red)] shadow-[0_0_8px_var(--lp-red)]" />
              <span>Ready to apply to tuition-free German universities with verified alumni mentorship?</span>
            </div>
            <Link
              href="/tools/admission-chance"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-white hover:text-[var(--lp-gold-soft)] transition-colors shrink-0"
            >
              Check admission chances <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


