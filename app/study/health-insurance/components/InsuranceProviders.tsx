"use client";

import React from 'react';
import { Building2, Check, ShieldCheck, HeartPulse, Award } from 'lucide-react';

export const InsuranceProviders = () => {
  const providers = [
    {
      name: "TK (Techniker Krankenkasse)",
      type: "Public Statutory (GKV)",
      badge: "Most Popular for Students",
      description: "Ranked Germany's top statutory sickness fund. Comprehensive English mobile app, 24/7 doctor chat, and seamless digital onboarding.",
      perks: [
        "100% English-speaking support & consultations",
        "Free dental checkups & professional cleaning subsidy",
        "Up to €160 annual fitness & vaccination cash bonus",
        "Direct M10 electronic university notification"
      ]
    },
    {
      name: "Barmer",
      type: "Public Statutory (GKV)",
      badge: "Nationwide Care",
      description: "One of Germany's established healthcare pillars with nationwide customer service points across all major university towns.",
      perks: [
        "Extensive multilingual support for international arrivals",
        "Specialized dental coverage & travel vaccine subsidies",
        "Complimentary wellness & mental health apps",
        "Fast digital university registration transfer"
      ]
    },
    {
      name: "AOK (Allgemeine Ortskrankenkasse)",
      type: "Public Statutory (GKV)",
      badge: "On-Campus Helpdesks",
      description: "Deep ties with German university student services (Studentenwerk) with dedicated on-campus offices for immediate assistance.",
      perks: [
        "Physical helpdesks near major German universities",
        "Free preventative screenings & gym rewards",
        "Statutory student flat rate guarantee",
        "Family insurance at zero extra charge"
      ]
    },
    {
      name: "Ottonova & Expat Private Partners",
      type: "Accredited Private (PKV)",
      badge: "Best for 30+ & Preparatory",
      description: "Digital private health insurance tailored for students over 30, PhD scholars, and preparatory language course attendees.",
      perks: [
        "Cost-effective plans starting from €85 to €140/month",
        "Fast concierge service with English chat & reimbursement",
        "Meets all German consular visa requirements",
        "Seamless transition support once enrolled in Master's"
      ]
    }
  ];

  return (
    <section id="section-providers" className="scroll-mt-32 py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" data-reveal>
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--lp-red)]">
          Certified Partners
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--lp-ink)] font-normal tracking-tight">
          Supported Insurers &amp; <em className="italic text-[var(--lp-red)] font-serif">Krankenkassen</em>
        </h2>
        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed">
          EuropeBridge provides unbiased assistance across all official German Krankenkassen. We help you choose the provider with optimal regional coverage.
        </p>
      </div>

      {/* Provider Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
        {providers.map((p, idx) => (
          <div 
            key={idx}
            className="bg-[#faf8f3] rounded-2xl p-6 border border-[#e5e0d3] flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-serif text-lg font-normal text-[var(--lp-ink)]">
                    {p.name}
                  </h3>
                  <p className="text-[11px] font-mono text-[var(--lp-muted)]">{p.type}</p>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#eae5db] text-[var(--lp-text)] border border-[#e5e0d3] shrink-0">
                  {p.badge}
                </span>
              </div>

              <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
                {p.description}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-[#e5e0d3]">
                {p.perks.map((perk, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2 text-xs text-[var(--lp-text)]">
                    <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                    <span className="text-[11px] text-[var(--lp-muted)] leading-relaxed">{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
