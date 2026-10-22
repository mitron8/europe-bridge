"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Landmark, Check } from 'lucide-react';

export const LoanCTA = () => {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="lp-grain relative isolate overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0d10] px-6 py-12 text-center text-white shadow-[0_24px_60px_-20px_rgba(13,13,15,0.4)] sm:px-12 sm:py-14 lg:px-16">
        {/* Landmark skyline outline background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center overflow-hidden opacity-[0.25] select-none"
          style={{
            filter: "invert(1) hue-rotate(180deg) brightness(1.25) contrast(1.15)",
            mixBlendMode: "screen",
            maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 55%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 55%, transparent 100%)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/landing/german-landmarks-outline.jpg"
            alt=""
            className="h-[220px] sm:h-[300px] w-full max-w-[1280px] object-cover object-bottom"
            loading="lazy"
          />
        </div>

        {/* Warm ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[220px] opacity-35 blur-[90px]"
          style={{ background: "radial-gradient(circle at 50% 100%, rgba(230,57,70,0.25), rgba(201,163,91,0.2), transparent 75%)" }}
        />

        {/* Content container */}
        <div className="relative mx-auto flex max-w-[720px] flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-gold-soft)] backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--lp-gold)] shadow-[0_0_8px_var(--lp-gold)]" />
            Fast Track Financial Assistance
          </div>

          <h2 className="lp-serif mt-5 text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.14] tracking-[-0.02em] text-white">
            Finance Your Master&apos;s Degree in Germany <em className="lp-script text-[var(--lp-gold-soft)]">With Ease</em>
          </h2>

          <p className="mt-4 max-w-[540px] text-[15px] sm:text-[16px] leading-[1.65] text-white/75">
            Get up to 100% funding covering tuition fees, living expenses, and blocked account setup. Apply today for free doorstep evaluation.
          </p>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <a 
              href="#booking" 
              className="lp-btn lp-btn--red w-full justify-center shadow-[0_12px_28px_-8px_rgba(230,57,70,0.5)] sm:w-auto"
            >
              Apply for Loan <ArrowRight className="h-4 w-4" />
            </a>

            <Link 
              href="/tools/blocked-account-calculator"
              className="lp-btn lp-btn--ghost-light w-full justify-center sm:w-auto"
            >
              Blocked Account Calculator
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-white/55">
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[var(--lp-red)]" /> Pre-Visa Sanction Letters
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[var(--lp-gold)]" /> 100% Free Doorstep Support
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-white/70" /> Direct NBFC Partnerships
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
