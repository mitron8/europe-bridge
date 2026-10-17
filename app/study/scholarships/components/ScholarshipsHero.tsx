"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, ArrowRight, Check } from 'lucide-react';

export const ScholarshipsHero = () => {
  const [degreeLevel, setDegreeLevel] = useState<'masters' | 'bachelors' | 'phd'>('masters');
  const [germanGpaTier, setGermanGpaTier] = useState<'top' | 'good' | 'average'>('top');

  const getRecommendation = () => {
    if (degreeLevel === 'masters') {
      if (germanGpaTier === 'top') {
        return {
          title: "Prime Candidate: DAAD EPOS & Deutschlandstipendium",
          coverage: "€300 – €992 / month + Full Tuition Waiver",
          probability: "High Probability (Top 15%)",
          description: "With a German GPA ≤ 1.9, you qualify for Germany's premier fully-funded grants like DAAD EPOS and national merit awards.",
          tag: "Full & High Merit Funding"
        };
      } else if (germanGpaTier === 'good') {
        return {
          title: "Strong Contender: Deutschlandstipendium & Foundation Grants",
          coverage: "€300 – €650 / month",
          probability: "Moderate to High",
          description: "German universities co-fund 50% with corporate partners (Siemens, BMW, Bosch). Pair with strong civic engagement.",
          tag: "Merit & Civic Grants"
        };
      } else {
        return {
          title: "Target Track: STIBET Grants, HiWi Roles & Erasmus+",
          coverage: "€450 – €800 / month (Via On-Campus Research)",
          probability: "Accessible After Enrolling",
          description: "Tuition is 0€. Focus on university international office grants (STIBET) and on-campus research assistant (HiWi) contracts.",
          tag: "On-Campus & University Aid"
        };
      }
    } else if (degreeLevel === 'phd') {
      return {
        title: "Doctoral Track: DAAD Research Grants & TV-L E13 Positions",
        coverage: "€1,300 – €2,800 / month (Salaried)",
        probability: "High for Qualified Proposals",
        description: "German PhD candidates frequently receive paid research associate positions (Wissenschaftliche Mitarbeiter) or DAAD fellowships.",
        tag: "Salaried / Full Fellowship"
      };
    } else {
      return {
        title: "Undergraduate Track: Deutschlandstipendium & Foundation Grants",
        coverage: "€300 – €650 / month",
        probability: "Selective Merit-Based",
        description: "Bachelor's tuition is 0€. International undergraduates can compete for Deutschlandstipendium starting from their 1st semester.",
        tag: "Merit & Semester Aid"
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto" data-reveal>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--lp-muted)]">
        <Link href="/" className="hover:text-[var(--lp-red)] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/study/masters" className="hover:text-[var(--lp-red)] transition-colors">Study</Link>
        <span>/</span>
        <span className="text-[var(--lp-text)] font-semibold">Scholarships &amp; Funding</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Hero Editorial */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--lp-red)] inline-block">
            Funding &amp; Financial Aid 2026
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--lp-ink)] font-normal tracking-tight leading-[1.15]">
            Scholarships &amp; Grants for <em className="italic text-[var(--lp-red)] font-serif">German Universities</em>
          </h1>

          <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed max-w-xl">
            German public universities already offer <strong className="text-[var(--lp-text)]">0€ tuition</strong>. Combining this with DAAD, Deutschlandstipendium, or foundation stipends makes your Master&apos;s or doctorate completely self-sustaining.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="bg-[#faf8f3] rounded-xl p-3.5 border border-[#e5e0d3] text-center">
              <span className="block font-serif text-xl sm:text-2xl font-normal text-[var(--lp-ink)]">0€</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">Public Tuition</span>
            </div>
            <div className="bg-[#faf8f3] rounded-xl p-3.5 border border-[#e5e0d3] text-center">
              <span className="block font-serif text-xl sm:text-2xl font-normal text-[var(--lp-red)]">€992/mo</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">DAAD Stipend</span>
            </div>
            <div className="bg-[#faf8f3] rounded-xl p-3.5 border border-[#e5e0d3] text-center">
              <span className="block font-serif text-xl sm:text-2xl font-normal text-[var(--lp-gold)]">30,000+</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">Natl. Recipients</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Scholarship Matcher */}
        <div className="lg:col-span-5 bg-[#faf8f3] rounded-2xl p-6 sm:p-7 border border-[#e5e0d3] space-y-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#e5e0d3] pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[var(--lp-red)]" />
              <h2 className="font-serif text-lg font-normal text-[var(--lp-ink)]">Eligibility Calculator</h2>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-gold)] bg-[var(--lp-gold)]/10 px-2 py-0.5 rounded-full border border-[var(--lp-gold)]/20">
              Instant Fit
            </span>
          </div>

          {/* Select Degree */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">Degree Level</label>
            <div className="grid grid-cols-3 gap-2">
              {(['bachelors', 'masters', 'phd'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setDegreeLevel(lvl)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold capitalize transition-all border ${
                    degreeLevel === lvl
                      ? 'bg-[var(--lp-ink)] text-white border-[var(--lp-ink)]'
                      : 'bg-[#eae5db]/50 text-[var(--lp-text)] border-[#e5e0d3] hover:bg-[#eae5db]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Select Academic Tier */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">Academic Profile</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'top', label: 'Top (< 1.9)' },
                { id: 'good', label: 'Good (2.0–2.5)' },
                { id: 'average', label: 'Avg (> 2.5)' }
              ].map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setGermanGpaTier(tier.id as any)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all border ${
                    germanGpaTier === tier.id
                      ? 'bg-[var(--lp-ink)] text-white border-[var(--lp-ink)]'
                      : 'bg-[#eae5db]/50 text-[var(--lp-text)] border-[#e5e0d3] hover:bg-[#eae5db]'
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>

          {/* Result Card */}
          <div className="p-4 rounded-xl bg-[#eae5db]/60 border border-[#e5e0d3] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-red)]">
                {recommendation.tag}
              </span>
              <span className="text-[10px] font-mono text-[var(--lp-muted)]">
                {recommendation.probability}
              </span>
            </div>
            <h3 className="font-serif text-base font-normal text-[var(--lp-ink)] leading-snug">
              {recommendation.title}
            </h3>
            <div className="font-mono text-xs font-semibold text-[var(--lp-gold)]">
              {recommendation.coverage}
            </div>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              {recommendation.description}
            </p>
          </div>

          <a
            href="#major-scholarships"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[var(--lp-ink)] text-white hover:bg-[var(--lp-red)] text-xs font-semibold transition-colors"
          >
            <span>Explore All Verified Grants</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
