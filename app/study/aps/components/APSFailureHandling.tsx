"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';

export const APSFailureHandling = () => {
  return (
    <section id="section-failure" className="py-12 px-4 sm:px-6 lg:px-12 scroll-mt-28">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div data-reveal className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center shrink-0 border border-[#e2ddd3] shadow-xs">
            <AlertTriangle className="w-6 h-6 text-[var(--lp-red)]" />
          </div>
          <div>
            <div className="lp-eyebrow text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-red)]">
              Section #5
            </div>
            <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--lp-text)] tracking-[-0.015em]">
              What If You Fail the <em className="lp-script text-[var(--lp-red)]">APS Interview?</em>
            </h2>
            <p className="text-sm sm:text-base text-[var(--lp-muted)] font-normal mt-1 max-w-3xl leading-relaxed">
              Failing the APS verification interview is disappointing, but you are permitted to reapply after fulfilling official guidelines.
            </p>
          </div>
        </div>

        {/* Reapplication Policy & Rules */}
        <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-6 border-l-4 border-l-[var(--lp-red)] shadow-[0_8px_30px_rgba(22,22,26,0.03)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.05)] transition-all duration-300">
          <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">Official Reapplication Rules</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-5 rounded-2xl bg-white/70 border border-[#e2ddd3] space-y-2 shadow-xs">
              <RefreshCw className="w-5 h-5 text-[var(--lp-red)]" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--lp-text)]">Cooling Waiting Period</h4>
              <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
                APS India specifies a mandatory waiting period detailed in your rejection notice before submitting a new application.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-5 rounded-2xl bg-white/70 border border-[#e2ddd3] space-y-2 shadow-xs">
              <ShieldAlert className="w-5 h-5 text-[var(--lp-gold)]" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--lp-text)]">Fee Repayment</h4>
              <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
                Reapplication requires submitting a fresh fee payment of INR 18,000 for the new evaluation cycle.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-5 rounded-2xl bg-white/70 border border-[#e2ddd3] space-y-2 shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-[var(--lp-red)]" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--lp-text)]">Re-examination Prep</h4>
              <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
                Thoroughly review the specific subject areas where you struggled during the initial interview attempt.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
