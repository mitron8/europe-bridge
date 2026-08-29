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
    <section className="py-12 px-6 lg:px-12 bg-gradient-to-b from-transparent via-amber-50/20 to-transparent">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <h2 className="text-xl font-extrabold text-germany-black font-display">Related Study Tools &amp; Guides</h2>
          <span className="text-xs font-bold text-gray-500">Explore EuropeBridge Suite</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tools.map((t, idx) => {
            const Icon = t.icon;
            return (
              <Link 
                key={idx}
                href={t.href}
                className="neu-card p-5 block hover:scale-[1.02] transition-transform space-y-3 border border-gray-100 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-germany-black flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase text-germany-red bg-red-50 px-2 py-0.5 rounded border border-red-100">
                    {t.tag}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-germany-black group-hover:text-germany-red transition-colors flex items-center gap-1">
                    <span>{t.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-xs text-gray-600 font-medium mt-1 leading-relaxed">
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
