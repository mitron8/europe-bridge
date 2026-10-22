"use client";

import React from 'react';
import Link from 'next/link';
import {
  Calculator,
  FileCheck2,
  Lock,
  PlaneTakeoff,
  Banknote,
  HeartPulse,
  Coins,
  ArrowRight,
  GraduationCap
} from 'lucide-react';

interface ToolItem {
  title: string;
  category: string;
  badge: string;
  desc: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  cta: string;
}

export const ToolsAndResourcesSection = () => {
  const tools: ToolItem[] = [
    {
      title: "Admission Chance Calculator",
      category: "Eligibility",
      badge: "Free Tool",
      desc: "Simulate your profile against 400+ public German master's degrees using German Bavarian GPA conversion, credits, and university tiers.",
      href: "/tools/admission-chance",
      icon: Calculator,
      cta: "Calculate Chances"
    },
    {
      title: "APS Certificate Step-by-Step",
      category: "Mandatory Document",
      badge: "India / China / Vietnam",
      desc: "Complete walkthrough for submitting transcripts, DigiLocker verification, professor verification, and tracking your APS dossier.",
      href: "/study/aps",
      icon: FileCheck2,
      cta: "Read APS Guide"
    },
    {
      title: "Blocked Account Comparison",
      category: "Visa Proof",
      badge: "€11,904 Required",
      desc: "Compare authorized providers (Expatrio, Fintiba, Coracle) for fees, processing speed, and integrated health insurance packages.",
      href: "/services/blocked-account",
      icon: Lock,
      cta: "Compare Providers"
    },
    {
      title: "Student Visa (National Visa D)",
      category: "Consular Services",
      badge: "Checklist",
      desc: "Complete appointment booking process, VFS document checklist, biometric timeline, and visa interview preparation tips.",
      href: "/study/student-visa",
      icon: PlaneTakeoff,
      cta: "View Visa Roadmap"
    },
    {
      title: "Education Loan Advisory",
      category: "Funding",
      badge: "Collateral & Non-Collateral",
      desc: "Secure competitive interest rates on collateral or non-collateral loans to fund your blocked account and initial travel costs.",
      href: "/services/education-loan",
      icon: Banknote,
      cta: "Explore Loans"
    },
    {
      title: "German Public Health Insurance",
      category: "Mandatory Enrollment",
      badge: "TK & Barmer",
      desc: "Instant digital health insurance certificate (M10/M11) required for university enrollment and German student visa approval.",
      href: "/services/health-insurance",
      icon: HeartPulse,
      cta: "Get Insured"
    },
    {
      title: "Scholarship Finder",
      category: "Financial Aid",
      badge: "DAAD & Foundations",
      desc: "Search DAAD scholarships, Deutschlandstipendium, Heinrich Böll, and state-funded research stipends for international scholars.",
      href: "/study/scholarships",
      icon: Coins,
      cta: "Find Scholarships"
    },
    {
      title: "University Program Search",
      category: "Admissions",
      badge: "Public Universities",
      desc: "Filter English-taught master's degrees across TU9 and public universities with zero tuition and direct admission requirements.",
      href: "/programs",
      icon: GraduationCap,
      cta: "Browse Programs"
    }
  ];

  return (
    <section id="tools" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--lp-red)]">
          Free Utilities &amp; Services
        </span>
        <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--lp-text)] font-semibold tracking-tight">
          Tools for Your <em className="lp-script text-[var(--lp-red)]">Master&apos;s Application</em>
        </h2>
        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed">
          Everything you need to plan, verify, and complete your German master&apos;s journey in one place.
        </p>
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.title}
              href={tool.href}
              className="bg-[#faf8f3] rounded-2xl p-5 border border-[#e5e0d3] flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[var(--lp-red)]/30 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[#eae5db] flex items-center justify-center text-[var(--lp-ink)] group-hover:bg-[var(--lp-red)] group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#eae5db]/60 text-[var(--lp-muted)] border border-[#e5e0d3]">
                    {tool.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-gold)] block">
                    {tool.category}
                  </span>
                  <h3 className="font-serif text-base font-normal text-[var(--lp-ink)] group-hover:text-[var(--lp-red)] transition-colors leading-snug">
                    {tool.title}
                  </h3>
                </div>

                <p className="text-xs text-[var(--lp-muted)] leading-relaxed line-clamp-3">
                  {tool.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#e5e0d3] flex items-center justify-between text-xs font-semibold text-[var(--lp-ink)] group-hover:text-[var(--lp-red)] transition-colors">
                <span>{tool.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
