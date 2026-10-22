"use client";

import React from "react";
import Link from "next/link";
import { Database, HelpCircle, ArrowUpRight, CheckCircle2 } from "lucide-react";

export function CoursesDatabaseBanner() {
  return (
    <section className="mt-16 rounded-3xl border border-[#e5e0d3] bg-[#faf8f3] p-6 sm:p-10 shadow-sm relative overflow-hidden">
      <div 
        aria-hidden 
        className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-[#c9a35b]/10 blur-3xl" 
      />

      <div className="relative z-10 max-w-3xl">
        <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#9e2a2b] mb-2">
          <Database className="h-4 w-4" />
          <span>EuropeBridge University Data Engine</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#16161a] leading-snug">
          Connected directly to Germany&apos;s public university database
        </h3>

        <p className="mt-3 text-[14px] sm:text-[15px] text-[#5e5b54] leading-relaxed">
          Our degree database tracks semester fees, non-NC status changes, application windows, and German grade cutoffs directly aligned with DAAD and official university examination regulations (Prüfungsordnung).
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[13px]">
          <div className="flex items-center gap-2 text-[#4a4740]">
            <CheckCircle2 className="h-4 w-4 text-[#16161a] shrink-0" />
            <span>Updated for 2026/2027 Intakes</span>
          </div>
          <div className="flex items-center gap-2 text-[#4a4740]">
            <CheckCircle2 className="h-4 w-4 text-[#16161a] shrink-0" />
            <span>Verified 0€ Public Tuition</span>
          </div>
          <div className="flex items-center gap-2 text-[#4a4740]">
            <CheckCircle2 className="h-4 w-4 text-[#16161a] shrink-0" />
            <span>Bavarian Formula Mapped</span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/study/requirements"
            className="inline-flex items-center gap-2 rounded-xl bg-[#16161a] px-4 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-[#2e2e34]"
          >
            Read German Admission Requirements
            <ArrowUpRight className="h-4 w-4 opacity-70" />
          </Link>
          <Link
            href="/services/university-shortlisting"
            className="inline-flex items-center gap-2 rounded-xl border border-[#dcd7cb] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#16161a] transition-colors hover:border-[#16161a] hover:bg-[#f7f5f0]"
          >
            Get Personalized 8-University Shortlist
          </Link>
        </div>
      </div>
    </section>
  );
}
