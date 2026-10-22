"use client";
import React from 'react';
import Link from 'next/link';
import { Calculator, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';

export const RelatedToolsSection = () => {
  const tools = [
    {
      title: "German Grade Calculator",
      desc: "Convert your CGPA or percentage into the official German Bavarian scale (1.0 to 4.0).",
      href: "/study/requirements#section-bavarian",
      icon: Calculator,
      tag: "Bavarian Formula"
    },
    {
      title: "APS Verification Guide",
      desc: "Step-by-step instructions for getting your mandatory APS certificate (India, China, Vietnam).",
      href: "/study/aps",
      icon: ShieldCheck,
      tag: "Mandatory Cert"
    },
    {
      title: "Admission Requirements",
      desc: "Complete guide to cutoffs, document checklists, and application timelines for 2026.",
      href: "/study/requirements",
      icon: BookOpen,
      tag: "Complete Guide"
    }
  ];

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#e5e0d3] pb-4 gap-2">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--lp-red)] block mb-1">
              Explore EuropeBridge Suite
            </span>
            <h2 className="lp-serif text-2xl sm:text-3xl font-semibold text-[var(--lp-text)]">
              Related Study <em className="lp-script text-[var(--lp-red)] font-normal text-3xl sm:text-4xl">Tools &amp; Guides</em>
            </h2>
          </div>
          <span className="text-xs font-semibold text-[var(--lp-text-muted)]">
            Verified for 2026 Admissions
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((t, idx) => {
            const Icon = t.icon;
            return (
              <Link 
                key={idx}
                href={t.href}
                className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-7 hover:border-[var(--lp-red)]/40 hover:shadow-[0_16px_36px_rgba(22,22,26,0.06)] hover:-translate-y-0.5 transition-all duration-300 group flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-[var(--lp-red)]/10 text-[var(--lp-red)] flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--lp-red)] bg-[var(--lp-red)]/10 px-2.5 py-1 rounded-full">
                    {t.tag}
                  </span>
                </div>
                <div>
                  <h3 className="lp-serif text-lg font-semibold text-[var(--lp-text)] group-hover:text-[var(--lp-red)] transition-colors flex items-center justify-between">
                    <span>{t.title}</span>
                    <ArrowRight className="w-4 h-4 text-[var(--lp-text-muted)] group-hover:text-[var(--lp-red)] group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-xs text-[var(--lp-text-muted)] font-medium mt-2 leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

