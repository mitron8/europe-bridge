"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe2, ShieldCheck, CheckCircle2, FileSearch, Flag } from 'lucide-react';

export const CountrySpecificInfo = () => {
  const [selectedCountry, setSelectedCountry] = useState<'india' | 'china' | 'southasia' | 'eu'>('india');

  return (
    <section id="section-country" className="py-12 px-4 sm:px-6 lg:px-12 scroll-mt-28">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div data-reveal className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center shrink-0 border border-[#e2ddd3] shadow-xs">
            <Globe2 className="w-6 h-6 text-[var(--lp-text)]" />
          </div>
          <div>
            <div className="lp-eyebrow text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-red)]">
              Requirement #6
            </div>
            <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--lp-text)] tracking-[-0.015em]">
              Special Requirements by <em className="lp-script text-[var(--lp-red)]">Country</em>
            </h2>
            <p className="text-sm sm:text-base text-[var(--lp-muted)] font-normal mt-1 max-w-3xl leading-relaxed">
              Depending on your country of origin, specific verification certificates (like APS) or attestation processes apply.
            </p>
          </div>
        </div>

        {/* Country Selector Pills */}
        <div data-reveal className="flex flex-wrap gap-2.5 justify-start">
          <button
            onClick={() => setSelectedCountry('india')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 border flex items-center gap-2 cursor-pointer ${
              selectedCountry === 'india'
                ? 'bg-[var(--lp-ink)] text-white border-[var(--lp-ink)] shadow-sm'
                : 'bg-white/70 text-[var(--lp-muted)] border-[#e2ddd3] hover:border-[#16161a]/30'
            }`}
          >
            <Flag className="w-3.5 h-3.5 text-[var(--lp-red)]" />
            <span>India (APS Mandatory)</span>
          </button>

          <button
            onClick={() => setSelectedCountry('china')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 border flex items-center gap-2 cursor-pointer ${
              selectedCountry === 'china'
                ? 'bg-[var(--lp-ink)] text-white border-[var(--lp-ink)] shadow-sm'
                : 'bg-white/70 text-[var(--lp-muted)] border-[#e2ddd3] hover:border-[#16161a]/30'
            }`}
          >
            <Flag className="w-3.5 h-3.5 text-[var(--lp-gold)]" />
            <span>China (APS China)</span>
          </button>

          <button
            onClick={() => setSelectedCountry('southasia')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 border flex items-center gap-2 cursor-pointer ${
              selectedCountry === 'southasia'
                ? 'bg-[var(--lp-ink)] text-white border-[var(--lp-ink)] shadow-sm'
                : 'bg-white/70 text-[var(--lp-muted)] border-[#e2ddd3] hover:border-[#16161a]/30'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5 text-[var(--lp-text)]" />
            <span>Pakistan, Bangladesh &amp; Nepal</span>
          </button>

          <button
            onClick={() => setSelectedCountry('eu')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 border flex items-center gap-2 cursor-pointer ${
              selectedCountry === 'eu'
                ? 'bg-[var(--lp-ink)] text-white border-[var(--lp-ink)] shadow-sm'
                : 'bg-white/70 text-[var(--lp-muted)] border-[#e2ddd3] hover:border-[#16161a]/30'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5 text-blue-500" />
            <span>EU / EEA Applicants</span>
          </button>
        </div>

        {/* Country Content Card with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCountry}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(22,22,26,0.03)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.05)] transition-all duration-300"
          >
            {selectedCountry === 'india' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-4 flex-wrap gap-2">
                  <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">Requirements for Indian Applicants</h3>
                  <span className="text-xs font-semibold text-[var(--lp-red)] bg-[var(--lp-red)]/10 px-3 py-1 rounded-full border border-[var(--lp-red)]/20 shadow-xs">
                    APS Certificate Required
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-2">
                    <ShieldCheck className="w-5 h-5 text-[var(--lp-gold)]" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--lp-text)]">1. APS Certificate</h4>
                    <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
                      Mandatory since Nov 2022. Verify academic authenticity via APS India office in New Delhi before university/visa application. Takes 2–3 months.
                    </p>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-2">
                    <FileSearch className="w-5 h-5 text-[var(--lp-red)]" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--lp-text)]">2. 3-Year vs 4-Year Degrees</h4>
                    <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
                      4-year B.Tech / B.E. degrees are 100% recognized. Most 3-year B.Sc / B.Com / B.A. degrees are recognized if from NAAC 'A' grade universities with 180 ECTS equivalence.
                    </p>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-2">
                    <CheckCircle2 className="w-5 h-5 text-[var(--lp-red)]" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--lp-text)]">3. MEA Apostille</h4>
                    <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
                      Degree certificates and mark sheets must be apostilled by the Ministry of External Affairs (MEA India) prior to student visa stamping.
                    </p>
                  </motion.div>
                </div>
              </div>
            )}

            {selectedCountry === 'china' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-4 flex-wrap gap-2">
                  <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">Requirements for Chinese Applicants</h3>
                  <span className="text-xs font-semibold text-[var(--lp-red)] bg-[var(--lp-red)]/10 px-3 py-1 rounded-full border border-[var(--lp-red)]/20 shadow-xs">
                    APS China (Beijing)
                  </span>
                </div>
                <ul className="space-y-3 text-[14.5px] text-[var(--lp-text)] leading-relaxed">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] mt-1 shrink-0" />
                    <span><strong className="font-semibold text-[var(--lp-text)]">APS Certificate:</strong> Verification is processed through the APS office in Beijing and requires written tests / interviews for certain programs.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] mt-1 shrink-0" />
                    <span><strong className="font-semibold text-[var(--lp-text)]">Gaokao Direct Admission:</strong> Since 2020, Chinese high school graduates with strong Gaokao scores can enter German Bachelor's programs directly without Studienkolleg.</span>
                  </li>
                </ul>
              </div>
            )}

            {selectedCountry === 'southasia' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-4">
                  <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">Requirements for Pakistan, Bangladesh &amp; Nepal</h3>
                </div>
                <ul className="space-y-3 text-[14.5px] text-[var(--lp-text)] leading-relaxed">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] mt-1 shrink-0" />
                    <span><strong className="font-semibold text-[var(--lp-text)]">No APS Requirement:</strong> Applicants do not require an APS certificate, but university equivalence (Anabin status) is checked rigorously.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] mt-1 shrink-0" />
                    <span><strong className="font-semibold text-[var(--lp-text)]">Attestation:</strong> HEC attestation (Pakistan) or UGC equivalence certificate (Bangladesh) is mandatory before embassy submission.</span>
                  </li>
                </ul>
              </div>
            )}

            {selectedCountry === 'eu' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-4">
                  <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">Requirements for EU / EEA Citizens</h3>
                </div>
                <ul className="space-y-3 text-[14.5px] text-[var(--lp-text)] leading-relaxed">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
                    <span><strong className="font-semibold text-[var(--lp-text)]">Direct Recognition:</strong> EU degrees are automatically recognized under the Bologna Process (ECTS credit transfer).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
                    <span><strong className="font-semibold text-[var(--lp-text)]">No Visa / No Blocked Account:</strong> EU students do not need a visa, APS certificate, or blocked account.</span>
                  </li>
                </ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
