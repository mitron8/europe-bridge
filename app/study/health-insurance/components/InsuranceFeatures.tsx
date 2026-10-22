"use client";

import React from 'react';
import { ShieldCheck, Scale, HeartHandshake, CreditCard, Users, Building, Check } from 'lucide-react';

export const InsuranceFeatures = () => {
  const features = [
    {
      icon: ShieldCheck,
      badge: "Statutory Law",
      title: "Mandatory Requirement",
      description:
        "Health insurance is legally required for everyone in Germany. You must show proof of coverage for both your student visa and university enrollment.",
      details: "No visa or matriculation is granted without certified German coverage."
    },
    {
      icon: Scale,
      badge: "Dual System",
      title: "Two Distinct Systems",
      description:
        "Germany offers public statutory (GKV) and private (PKV) health insurance. Eligibility, long-term costs, and benefits depend on your age and student status.",
      details: "Public coverage is standardized; private coverage is customized."
    },
    {
      icon: HeartHandshake,
      badge: "Full Care",
      title: "Comprehensive Coverage",
      description:
        "German health insurance covers doctor appointments, hospital inpatient care, basic dental care, and prescription medicines with zero clinic copays.",
      details: "Direct electronic billing via your German health insurance chip card."
    },
    {
      icon: CreditCard,
      badge: "Subsidized",
      title: "Student Cost Structure",
      description:
        "Students under 30 benefit from a subsidized flat rate (~€140 to €150/month in 2026). Employed graduates pay roughly 14.6% split equally with their employer.",
      details: "Zero deductions occur until your academic semester officially starts."
    },
    {
      icon: Users,
      badge: "Family",
      title: "Dependent Coverage",
      description:
        "Under the statutory public system, non-working spouses and dependent children can frequently be insured at zero additional premium under family insurance.",
      details: "Private insurance requires separate standalone policies per person."
    },
    {
      icon: Building,
      badge: "Partners",
      title: "Certified Insurers",
      description:
        "Choose between premier public Krankenkassen (TK, Barmer, AOK) and accredited private expat insurers (Ottonova) through one streamlined desk.",
      details: "Unbiased guidance ensuring proper coverage in your university city."
    }
  ];

  return (
    <section id="section-features" className="scroll-mt-32 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lp-red)]">
          German Healthcare Standards
        </span>
        <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--lp-text)] font-semibold tracking-tight">
          What You Get with <em className="lp-script text-[var(--lp-red)]">EuropeBridge Setup</em>
        </h2>
        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed">
          Navigating statutory vs. private insurance with zero agency fees and immediate electronic reporting.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx}
              className="bg-[#faf8f3] rounded-2xl p-6 border border-[#e5e0d3] flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#eae5db] flex items-center justify-center text-[var(--lp-red)]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#eae5db] text-[var(--lp-muted)] border border-[#e5e0d3]">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-serif text-base font-normal text-[var(--lp-ink)]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#e5e0d3] flex items-center gap-1.5 text-[11px] text-[var(--lp-gold)] font-mono">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>{item.details}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
