"use client";

import React from 'react';
import { Landmark, HeartHandshake, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const DeutschlandstipendiumDeepDive = () => {
  const steps = [
    {
      step: '01',
      title: 'Secure University Admission',
      desc: 'Apply as an incoming 1st-semester master student with your university offer letter or as a continuing student with your transcript.'
    },
    {
      step: '02',
      title: 'Check University Application Windows',
      desc: 'Each German university runs its own portal. Most calls open between June 1 and July 31 for the upcoming Winter semester.'
    },
    {
      step: '03',
      title: 'Document Social & Academic Merits',
      desc: 'Gather transcripts, CV, and certificates showing volunteering, tutoring, hackathons, or personal obstacles overcome.'
    },
    {
      step: '04',
      title: 'Draft a Targeted Motivation Letter',
      desc: 'Articulate clearly how the €300/month stipend and mentor network will accelerate your academic and career trajectory.'
    }
  ];

  return (
    <section id="deutschlandstipendium" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--lp-red)]">
          National Merit Program
        </span>
        <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--lp-text)] font-semibold tracking-tight">
          The <em className="lp-script text-[var(--lp-red)]">Deutschlandstipendium</em> Deep Dive
        </h2>
        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed">
          Over 30,000 scholars receive €300 per month through this public-private partnership. Here is how international students can successfully win it.
        </p>
      </div>

      {/* 50/50 Concept Visual Card */}
      <div className="bg-[#faf8f3] rounded-2xl p-6 sm:p-8 border border-[#e5e0d3] space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--lp-gold)] flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4" /> The 50 / 50 Funding Formula
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[var(--lp-ink)]">
              Half from the Federal Republic. Half from Leading Industry.
            </h3>
            <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
              The Federal Ministry of Education and Research (BMBF) provides €150/month, matched 1:1 by corporate partners and foundations including <strong className="text-[var(--lp-text)]">Siemens, BMW, Bosch, BASF, and Deutsche Bank</strong>.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-[#eae5db]/50 p-3.5 rounded-xl border border-[#e5e0d3]">
                <div className="font-serif text-lg font-normal text-[var(--lp-red)]">€300 / Mo</div>
                <div className="text-[11px] text-[var(--lp-muted)] mt-1">Paid directly to your German account, 100% tax-free.</div>
              </div>
              <div className="bg-[#eae5db]/50 p-3.5 rounded-xl border border-[#e5e0d3]">
                <div className="font-serif text-lg font-normal text-[var(--lp-ink)]">No Quotas</div>
                <div className="text-[11px] text-[var(--lp-muted)] mt-1">Awarded equally to international and domestic students.</div>
              </div>
              <div className="bg-[#eae5db]/50 p-3.5 rounded-xl border border-[#e5e0d3]">
                <div className="font-serif text-lg font-normal text-[var(--lp-gold)]">Mentorship</div>
                <div className="text-[11px] text-[var(--lp-muted)] mt-1">Direct contact with corporate sponsors for thesis roles.</div>
              </div>
            </div>
          </div>

          {/* Visual Formula Block */}
          <div className="lg:col-span-5 bg-[#eae5db]/60 p-6 rounded-2xl border border-[#e5e0d3] text-center space-y-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">Monthly Co-Funding Structure</div>
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <div className="bg-[#faf8f3] p-3 rounded-xl border border-[#e5e0d3] flex-1">
                <div className="font-serif text-lg sm:text-xl font-normal text-[var(--lp-red)]">€150</div>
                <div className="text-[9px] font-mono text-[var(--lp-muted)] uppercase">Federal Gov</div>
              </div>
              <span className="font-serif text-lg text-[var(--lp-muted)]">+</span>
              <div className="bg-[#faf8f3] p-3 rounded-xl border border-[#e5e0d3] flex-1">
                <div className="font-serif text-lg sm:text-xl font-normal text-[var(--lp-gold)]">€150</div>
                <div className="text-[9px] font-mono text-[var(--lp-muted)] uppercase">Corporate</div>
              </div>
              <span className="font-serif text-lg text-[var(--lp-muted)]">=</span>
              <div className="bg-[var(--lp-ink)] text-[#faf8f3] p-3 rounded-xl flex-1">
                <div className="font-serif text-lg sm:text-xl font-normal">€300</div>
                <div className="text-[9px] font-mono text-neutral-400 uppercase">To You / Mo</div>
              </div>
            </div>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              Awarded for at least <strong className="text-[var(--lp-text)]">two consecutive semesters (1 full year)</strong>. Most universities allow renewal across your entire standard study duration.
            </p>
          </div>
        </div>

        {/* 4 Steps to Win */}
        <div className="pt-6 border-t border-[#e5e0d3] space-y-4">
          <h4 className="font-serif text-lg font-normal text-[var(--lp-ink)]">
            How to Apply for the Deutschlandstipendium
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((st) => (
              <div key={st.step} className="p-4 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[var(--lp-red)]/10 text-[var(--lp-red)] border border-[var(--lp-red)]/20">
                  Step {st.step}
                </span>
                <h5 className="font-serif text-sm font-normal text-[var(--lp-ink)] leading-snug">{st.title}</h5>
                <p className="text-[11px] text-[var(--lp-muted)] leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
