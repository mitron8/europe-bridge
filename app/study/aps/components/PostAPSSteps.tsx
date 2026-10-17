"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, FileCheck2, Landmark, Plane, ShieldCheck } from 'lucide-react';

export const PostAPSSteps = () => {
  return (
    <section id="section-after-aps" className="py-12 px-4 sm:px-6 lg:px-12 scroll-mt-28">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div data-reveal className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center shrink-0 border border-[#e2ddd3] shadow-xs">
            <CheckCircle2 className="w-6 h-6 text-[var(--lp-red)]" />
          </div>
          <div>
            <div className="lp-eyebrow text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-red)]">
              Section #6
            </div>
            <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--lp-text)] tracking-[-0.015em]">
              After Receiving Your <em className="lp-script text-[var(--lp-red)]">Digital APS Certificate</em>
            </h2>
            <p className="text-sm sm:text-base text-[var(--lp-muted)] font-normal mt-1 max-w-3xl leading-relaxed">
              Your APS certificate is issued as a digitally-signed PDF. Here is your roadmap from certificate receipt to landing in Germany.
            </p>
          </div>
        </div>

        {/* Post-APS Step Grid */}
        <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(22,22,26,0.03)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.05)] transition-all duration-300">
          <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)] border-b border-[var(--lp-rule)] pb-4">
            3 Essential Steps After APS Approval
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-5 rounded-2xl bg-white/70 border border-[#e2ddd3] space-y-2 shadow-xs">
              <FileCheck2 className="w-5 h-5 text-[var(--lp-red)]" />
              <h4 className="text-sm font-semibold text-[var(--lp-text)]">1. Uni-Assist Upload</h4>
              <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
                Upload your digital APS PDF to uni-assist and direct university portals to complete course applications.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-5 rounded-2xl bg-white/70 border border-[#e2ddd3] space-y-2 shadow-xs">
              <Landmark className="w-5 h-5 text-[var(--lp-gold)]" />
              <h4 className="text-sm font-semibold text-[var(--lp-text)]">2. Blocked Account (€11,904)</h4>
              <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
                Once admission is confirmed, open an official German Blocked Account (Expatrio, Fintiba, Coracle) to deposit €11,904 proof of funds.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-5 rounded-2xl bg-white/70 border border-[#e2ddd3] space-y-2 shadow-xs">
              <Plane className="w-5 h-5 text-blue-600" />
              <h4 className="text-sm font-semibold text-[var(--lp-text)]">3. Student Visa Portal</h4>
              <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
                Apply for your German National Student Visa via the embassy digital visa portal. APS certificate is mandatory.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
