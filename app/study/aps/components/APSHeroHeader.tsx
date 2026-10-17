"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ShieldCheck, FileCheck2, Clock, Banknote } from 'lucide-react';

export const APSHeroHeader = () => {
  return (
    <section className="pt-32 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Background Subtle Ambient Accents */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute top-12 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-25"
        style={{ background: "radial-gradient(circle, rgba(230,57,70,0.3), rgba(201,163,91,0.2), transparent)" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-[var(--lp-muted)]">
          <Link href="/" className="hover:text-[var(--lp-red)] transition-colors">Home</Link>
          <span className="text-[var(--lp-faint)]">/</span>
          <Link href="/#our-process" className="hover:text-[var(--lp-red)] transition-colors">Study</Link>
          <span className="text-[var(--lp-faint)]">/</span>
          <span className="text-[var(--lp-text)] font-bold">APS Verification Guide</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Hero Content */}
          <div data-reveal className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--lp-rule-strong)] bg-white/70 backdrop-blur-sm px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lp-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lp-red)] animate-pulse" />
              <span>Official Verification Guide 2026</span>
            </div>

            <h1 className="lp-serif text-3xl sm:text-4xl lg:text-[52px] font-semibold text-[var(--lp-text)] leading-[1.12] tracking-[-0.015em]">
              APS Verification Guide for <em className="lp-script text-[var(--lp-red)]">Germany</em>
            </h1>

            <p className="text-base sm:text-lg text-[var(--lp-muted)] leading-[1.65] font-normal">
              The APS (<em className="italic font-bold text-[var(--lp-text)]">Akademische Prüfstelle</em>) certificate is mandatory for students from India, China, and Vietnam applying to German universities. Learn the step-by-step process, required documents, fee details, and interview preparation.
            </p>

            {/* At a Glance Box */}
            <div className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-2xl p-6 relative overflow-hidden shadow-[0_4px_20px_rgba(22,22,26,0.03)] border-l-4 border-l-[var(--lp-red)]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--lp-red)]">
                  At a Glance Summary
                </span>
                <span className="text-[11.5px] font-medium text-[var(--lp-muted)] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[var(--lp-faint)]" /> Updated May 2026
                </span>
              </div>
              <p className="text-[14px] text-[var(--lp-text)] leading-[1.7] font-normal">
                APS verifies your academic documents before universities or visa officers process your application. Mandatory for students from India, China, and Vietnam. Verification takes <strong className="font-semibold text-[var(--lp-text)]">2 to 3 months</strong>. The official fee is <strong className="text-[var(--lp-red)] font-semibold">INR 18,000</strong>. Issued as a digitally-signed PDF certificate. Without APS, no German student visa will be issued.
              </p>
            </div>
          </div>

          {/* Key Facts Quick Grid */}
          <div data-reveal className="lg:col-span-5">
            <motion.div 
              className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-4 shadow-[0_12px_40px_rgba(22,22,26,0.05)] relative"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="lp-serif text-xl font-semibold text-[var(--lp-text)] border-b border-[var(--lp-rule)] pb-3">
                APS Snapshot &amp; Quick Facts
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-[#ece7dd]/50 border border-[#e2ddd3] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Banknote className="w-5 h-5 text-[var(--lp-red)]" />
                    <div>
                      <span className="text-[10.5px] font-semibold text-[var(--lp-muted)] uppercase">Official Fee</span>
                      <div className="text-sm font-bold text-[var(--lp-text)]">INR 18,000</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-[var(--lp-red)] bg-[var(--lp-red)]/10 px-2 py-0.5 rounded-full">CCAvenue / Transfer</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#ece7dd]/50 border border-[#e2ddd3] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[var(--lp-gold)]" />
                    <div>
                      <span className="text-[10.5px] font-semibold text-[var(--lp-muted)] uppercase">Processing Time</span>
                      <div className="text-sm font-bold text-[var(--lp-text)]">2 to 3 Months</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-[var(--lp-gold)] bg-[var(--lp-gold-soft)]/50 px-2 py-0.5 rounded-full">Apply Early</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#ece7dd]/50 border border-[#e2ddd3] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileCheck2 className="w-5 h-5 text-[var(--lp-red)]" />
                    <div>
                      <span className="text-[10.5px] font-semibold text-[var(--lp-muted)] uppercase">Certificate Format</span>
                      <div className="text-sm font-bold text-[var(--lp-text)]">Digital Signed PDF</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-[var(--lp-text)] bg-[#ece7dd] px-2.5 py-1 rounded-full border border-[#e2ddd3]">No Expiry</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#ece7dd]/50 border border-[#e2ddd3] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <div>
                      <span className="text-[10.5px] font-semibold text-[var(--lp-muted)] uppercase">Interview Duration</span>
                      <div className="text-sm font-bold text-[var(--lp-text)]">15–20 Minutes</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full">Personal / Online</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
