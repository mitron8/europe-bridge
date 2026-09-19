"use client";

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Calculator,
  FileCheck2,
  Lock,
  PlaneTakeoff,
  Banknote,
  FileText,
  HeartPulse,
  Coins,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface ToolItem {
  title: string;
  category: string;
  badge: string;
  badgeColor: string;
  desc: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  cta: string;
}

export const ToolsAndResourcesSection = () => {
  const tools: ToolItem[] = [
    {
      title: "Admission Chance Calculator",
      category: "Eligibility AI",
      badge: "Free Tool",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      desc: "Simulate your profile against 400+ public German master's degrees using German Bavarian GPA conversion, credits, and university tiers.",
      href: "/tools/admission-chance",
      icon: Calculator,
      cta: "Calculate Chances"
    },
    {
      title: "APS Certificate Step-by-Step",
      category: "Mandatory Document",
      badge: "India / China / Vietnam",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      desc: "Complete walkthrough for submitting transcripts, DigiLocker verification, professor email contacts, and tracking your APS status.",
      href: "/study/aps",
      icon: FileCheck2,
      cta: "Read APS Guide"
    },
    {
      title: "Blocked Account Comparison",
      category: "Visa Proof",
      badge: "€11,904 Required",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
      desc: "Compare authorized providers (Expatrio, Fintiba, Coracle) for fees, account opening speed, and integrated health insurance packages.",
      href: "/services/blocked-account",
      icon: Lock,
      cta: "Compare Providers"
    },
    {
      title: "Student Visa (National Visa D)",
      category: "Consular Services",
      badge: "Checklist 2026",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
      desc: "Complete appointment booking process, VFS document checklist, biometric timeline, and visa interview preparation tips.",
      href: "/study/student-visa",
      icon: PlaneTakeoff,
      cta: "View Visa Roadmap"
    },
    {
      title: "Education Loan Advisory",
      category: "Funding",
      badge: "Collateral & Non-Collateral",
      badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
      desc: "Secure competitive interest rates on collateral or non-collateral loans to fund your blocked account and initial flight expenses.",
      href: "/services/education-loan",
      icon: Banknote,
      cta: "Explore Loans"
    },
    {
      title: "German Public Health Insurance",
      category: "Mandatory Enrollment",
      badge: "TK & Barmer",
      badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
      desc: "Instant digital health insurance certificate (M10/M11) required for university enrollment and German student visa approval.",
      href: "/services/health-insurance",
      icon: HeartPulse,
      cta: "Get Insured"
    },
    {
      title: "Scholarship Finder",
      category: "Financial Aid",
      badge: "DAAD & Foundations",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
      desc: "Search DAAD scholarships, Deutschlandstipendium, Heinrich Böll, and state-funded research stipends for international scholars.",
      href: "/study/scholarships",
      icon: Coins,
      cta: "Find Scholarships"
    },
    {
      title: "German SOP & Motivation Letter",
      category: "Application Strategy",
      badge: "Academic Template",
      badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
      desc: "Learn how German admission professors evaluate academic motivation letters with module-mapping frameworks and faculty research alignment.",
      href: "/study/motivation-letter",
      icon: FileText,
      cta: "Read SOP Guide"
    }
  ];

  return (
    <section id="tools" className="py-8 sm:py-12 px-3.5 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-8 sm:space-y-10">
      {/* Header */}
      <div className="space-y-2.5 sm:space-y-3 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-[11px] sm:text-xs font-black uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-germany-gold" />
          <span>EuropeBridge Toolkit</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-germany-black">
          Essential Tools &amp; Resources for Your <span className="text-germany-red">Master&apos;s Application</span>
        </h2>
        <p className="text-xs sm:text-base text-gray-600 font-medium leading-relaxed">
          Everything you need to shortlist public universities, verify prerequisites, secure funding, and ace consular visas without agency commissions.
        </p>
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {tools.map((tool, idx) => {
          const Icon = tool.icon;
          return (
            <div
              key={idx}
              className="neu-card p-4 sm:p-5 bg-white flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 group border border-gray-100"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center justify-center text-germany-red shadow-xs group-hover:scale-110 group-hover:bg-red-50 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${tool.badgeColor}`}>
                    {tool.badge}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    {tool.category}
                  </span>
                  <h3 className="font-display font-bold text-lg text-germany-black group-hover:text-germany-red transition-colors line-clamp-1">
                    {tool.title}
                  </h3>
                </div>

                <p className="text-xs text-gray-600 font-medium leading-relaxed line-clamp-3">
                  {tool.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100">
                <Link
                  href={tool.href}
                  className="inline-flex items-center justify-between w-full text-xs font-black text-germany-black group-hover:text-germany-red transition-colors"
                >
                  <span>{tool.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Profile Evaluation Banner */}
      <div className="neu-card p-4 sm:p-8 bg-gradient-to-r from-amber-500/10 via-red-500/5 to-transparent border border-amber-200/70 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="space-y-1.5 sm:space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-black text-amber-800 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-germany-red shrink-0" />
            <span>Personalized Shortlisting Assistance</span>
          </div>
          <h3 className="font-display text-lg sm:text-2xl font-bold text-germany-black">
            Unsure if your 3-year bachelor&apos;s or GPA matches TU9 requirements?
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 font-medium max-w-2xl leading-relaxed">
            Get an in-depth profile audit from EuropeBridge mentors who evaluated 1,000+ curricula against anabin, Uni-Assist criteria, and faculty module catalogs.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full md:w-auto shrink-0">
          <Link
            href="/tools/admission-chance"
            className="neu-btn px-5 sm:px-6 py-3 rounded-full bg-germany-red text-white text-xs font-black text-center hover:bg-red-700 transition-all flex items-center justify-center gap-2"
          >
            <span>Evaluate Profile Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/signup"
            className="neu-btn-outline px-5 sm:px-6 py-3 rounded-full bg-white text-germany-black border border-gray-300 text-xs font-black text-center hover:bg-gray-50 transition-all"
          >
            <span>Create Free Account</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
