"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, HeartHandshake, CheckCircle2, Clock, Landmark } from 'lucide-react';

export const HealthInsuranceHero = () => {
  return (
    <section className="pt-2 sm:pt-4 pb-12 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Warm Ambient Glow matching Landing Page */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] opacity-40 blur-[100px] -z-10"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(201,163,91,0.25), rgba(230,57,70,0.12), transparent 70%)"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-5 flex items-center gap-2 text-xs font-semibold text-[var(--lp-muted)]">
          <Link href="/" className="hover:text-[var(--lp-red)] transition-colors">Home</Link>
          <span className="text-[var(--lp-faint)]">/</span>
          <Link href="/services" className="hover:text-[var(--lp-red)] transition-colors">Services</Link>
          <span className="text-[var(--lp-faint)]">/</span>
          <span className="text-[var(--lp-text)] font-bold">German Health Insurance Setup</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Hero Left Content */}
          <div className="lg:col-span-7 space-y-5">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--lp-rule-strong)] bg-white/70 backdrop-blur-sm px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lp-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lp-red)]" />
              Mandatory Visa &amp; Enrollment Requirement
            </div>

            <h1 className="lp-serif text-3xl sm:text-5xl lg:text-[52px] font-bold text-[var(--lp-text)] tracking-[-0.02em] leading-[1.08]">
              German Health Insurance <br />
              <em className="lp-script text-[var(--lp-red)]">Setup &amp; University M10</em>
            </h1>

            <p className="text-base sm:text-lg text-[var(--lp-muted)] leading-[1.7] font-normal max-w-2xl">
              Every international student and worker in Germany is legally required to have health insurance. We help you compare and set up the right coverage—public (TK, Barmer, AOK) or private (Ottonova, Mawista)—and automatically transmit your mandatory electronic <strong className="text-[var(--lp-text)] font-bold">M10 certificate</strong> straight to your university.
            </p>

            {/* Micro Value Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
              <div className="p-3.5 bg-[var(--lp-card)] rounded-2xl border border-[var(--lp-rule)] text-center shadow-2xs">
                <div className="lp-serif text-lg font-bold text-[var(--lp-text)]">€0 Fee</div>
                <div className="text-[10px] font-semibold text-[var(--lp-muted)] uppercase tracking-wider mt-0.5">EuropeBridge Service</div>
              </div>
              <div className="p-3.5 bg-[var(--lp-card)] rounded-2xl border border-[var(--lp-rule)] text-center shadow-2xs">
                <div className="lp-serif text-lg font-bold text-[var(--lp-red)]">M10 Digital</div>
                <div className="text-[10px] font-semibold text-[var(--lp-muted)] uppercase tracking-wider mt-0.5">Direct to University</div>
              </div>
              <div className="p-3.5 bg-[var(--lp-card)] rounded-2xl border border-[var(--lp-rule)] text-center shadow-2xs">
                <div className="lp-serif text-lg font-bold text-[var(--lp-text)]">Free Travel</div>
                <div className="text-[10px] font-semibold text-[var(--lp-muted)] uppercase tracking-wider mt-0.5">Incoming Insurance</div>
              </div>
              <div className="p-3.5 bg-[var(--lp-card)] rounded-2xl border border-[var(--lp-rule)] text-center shadow-2xs">
                <div className="lp-serif text-lg font-bold text-[var(--lp-red)]">&lt; 24 Hours</div>
                <div className="text-[10px] font-semibold text-[var(--lp-muted)] uppercase tracking-wider mt-0.5">Certificate Delivery</div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a 
                href="#booking" 
                className="lp-btn lp-btn--red justify-center text-sm shadow-[0_12px_28px_-8px_rgba(230,57,70,0.4)]"
              >
                <span>Apply for Health Insurance</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>

              <a 
                href="#decider" 
                className="lp-btn lp-btn--dark justify-center text-sm"
              >
                <span>Check Public vs. Private</span>
              </a>
            </div>

            <p className="text-xs font-semibold text-[var(--lp-faint)]">
              Official M10 notification · Digital enrollment · Free incoming travel insurance included.
            </p>
          </div>

          {/* Quick Facts Sidebar Card */}
          <div className="lg:col-span-5">
            <div className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-7 space-y-5 shadow-[0_12px_40px_rgba(22,22,26,0.04)]">
              <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-4">
                <h3 className="lp-serif text-lg font-semibold text-[var(--lp-text)] flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[var(--lp-red)] shrink-0" />
                  <span>German Healthcare Highlights</span>
                </h3>
                <span className="px-3 py-1 rounded-full bg-[#ece7dd] text-[var(--lp-text)] border border-[#e2ddd3] text-[10.5px] font-semibold uppercase tracking-wider shrink-0">
                  Statutory Guidelines
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center p-3.5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3]">
                  <span className="text-[var(--lp-muted)] font-semibold text-[11px] uppercase tracking-wider">Student Public Rate (&lt;30)</span>
                  <span className="lp-serif text-lg font-bold text-[var(--lp-text)]">~€140–€150 <span className="text-xs font-normal text-[var(--lp-muted)]">/mo</span></span>
                </div>

                <div className="flex justify-between items-center p-3.5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3]">
                  <span className="text-[var(--lp-muted)] font-semibold text-[11px] uppercase tracking-wider">Co-Pay at Clinics</span>
                  <span className="lp-serif text-lg font-bold text-[var(--lp-red)]">€0 <span className="text-xs font-normal text-[var(--lp-muted)]">(Direct Billing)</span></span>
                </div>

                <div className="flex justify-between items-center p-3.5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3]">
                  <span className="text-[var(--lp-muted)] font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[var(--lp-red)]" /> Free Travel Cover
                  </span>
                  <span className="font-bold text-[var(--lp-text)]">Up to 180 Days</span>
                </div>

                <div className="flex justify-between items-center p-3.5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3]">
                  <span className="text-[var(--lp-text)] font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <Landmark className="w-4 h-4 text-[var(--lp-red)]" /> Matriculation M10
                  </span>
                  <span className="font-bold text-[var(--lp-text)]">e-Sent Direct</span>
                </div>
              </div>

              <div className="pt-2 text-center border-t border-[var(--lp-rule)]">
                <a 
                  href="#providers" 
                  className="text-xs font-semibold text-[var(--lp-red)] hover:underline inline-flex items-center gap-1"
                >
                  <span>Compare TK, Barmer &amp; Ottonova</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
