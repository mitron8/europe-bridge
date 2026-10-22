"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  Sparkles, 
  Zap, 
  HelpCircle,
  GraduationCap,
  Award,
  Layers,
  Clock,
  CheckCircle2
} from 'lucide-react';

interface PricingCardsProps {
  onSelectPlan: (planName: string, price: string) => void;
}

export const PricingCards: React.FC<PricingCardsProps> = ({ onSelectPlan }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'masters' | 'bachelors'>('all');

  return (
    <section id="packages" className="lp-container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 scroll-mt-20">
      {/* Category Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-[#e5e0d3]">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#16161a]">
            Choose Your Admission Plan
          </h2>
          <p className="text-xs sm:text-sm text-[#5e5b54] mt-1">
            Flat, transparent fees with zero hidden markups or subsequent consultancy charges.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex p-1 bg-[#ede8dc] rounded-xl border border-[#ded8cb]">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-white text-[#16161a] shadow-2xs'
                : 'text-[#5e5b54] hover:text-[#16161a]'
            }`}
          >
            All Packages (4)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('masters')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'masters'
                ? 'bg-white text-[#16161a] shadow-2xs'
                : 'text-[#5e5b54] hover:text-[#16161a]'
            }`}
          >
            Master&apos;s Degrees (3)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bachelors')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'bachelors'
                ? 'bg-white text-[#16161a] shadow-2xs'
                : 'text-[#5e5b54] hover:text-[#16161a]'
            }`}
          >
            Bachelor&apos;s Degree (1)
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
        
        {/* CARD 1: Basic Package */}
        {(activeTab === 'all' || activeTab === 'masters') && (
          <motion.div 
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col justify-between rounded-3xl border border-[#e5e0d3] bg-white p-6 sm:p-7 shadow-xs hover:border-[#16161a] transition-all relative group"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#787369] bg-[#f4f1ea] px-3 py-1 rounded-full border border-[#e5e0d3]">
                  Starter Plan
                </span>
                <span className="text-[11px] font-semibold text-[#787369]">Validity: 1 Intake</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#16161a]">
                Basic Package
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#5e5b54] min-h-[38px] leading-relaxed">
                Expert documents suite and up to 3 university applications.
              </p>

              {/* Price */}
              <div className="mt-5 pb-5 border-b border-[#ece7dd]">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-[#16161a]">₹29,999</span>
                  <span className="text-xs font-semibold text-[#787369]">/ one-time</span>
                </div>
                <p className="text-[11px] font-medium text-[#787369] mt-1">Inclusive of all taxes · No hidden fees</p>
              </div>

              {/* Feature List */}
              <ul className="mt-5 space-y-3 text-xs sm:text-[13px] text-[#4a4740]">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#2e7d46] shrink-0 mt-0.5" />
                  <span><strong>Up to 3 university applications</strong> (Uni-Assist &amp; Direct)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#2e7d46] shrink-0 mt-0.5" />
                  <span><strong>1 Standard SOP</strong> crafted by Senior Admissions Editor</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#2e7d46] shrink-0 mt-0.5" />
                  <span><strong>2 Letters of Recommendation (LORs)</strong> (Academic/Work)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#2e7d46] shrink-0 mt-0.5" />
                  <span><strong>Tabellarischer Europass CV</strong> (German standards)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#2e7d46] shrink-0 mt-0.5" />
                  <span>Student visa guidance &amp; document checklist</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#2e7d46] shrink-0 mt-0.5" />
                  <span>Student dashboard &amp; application tracker access</span>
                </li>
              </ul>
            </div>

            {/* Bottom Action */}
            <div className="mt-8 pt-4 border-t border-[#ece7dd] space-y-2.5">
              <button
                type="button"
                onClick={() => onSelectPlan('Basic Package (Master\'s)', '₹29,999')}
                className="w-full py-3 px-4 rounded-xl border border-[#16161a] bg-transparent text-[#16161a] hover:bg-[#16161a] hover:text-white transition-all text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <span>Enroll in Basic</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#comparison-matrix"
                className="block text-center text-[11px] font-semibold text-[#787369] hover:text-[#9e2a2b] transition-colors"
              >
                Compare full features ↓
              </a>
            </div>
          </motion.div>
        )}

        {/* CARD 2: Standard Package (MOST POPULAR) */}
        {(activeTab === 'all' || activeTab === 'masters') && (
          <motion.div 
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col justify-between rounded-3xl border-2 border-[#9e2a2b] bg-white p-6 sm:p-7 shadow-[0_12px_36px_rgba(158,42,43,0.08)] relative group scale-[1.02] z-10"
          >
            {/* Pill Tag */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#9e2a2b] text-white px-3.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 whitespace-nowrap">
              <Sparkles className="w-3 h-3" />
              <span>Most Popular Choice</span>
            </div>

            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 mb-4 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9e2a2b] bg-[#9e2a2b]/10 px-3 py-1 rounded-full border border-[#9e2a2b]/20">
                  Comprehensive 10-Uni
                </span>
                <span className="text-[11px] font-semibold text-[#787369]">Validity: 1 Intake</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#16161a]">
                Standard Package
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#5e5b54] min-h-[38px] leading-relaxed">
                Dedicated counsellor works with you on up to 10 applications.
              </p>

              {/* Price */}
              <div className="mt-5 pb-5 border-b border-[#ece7dd]">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-[#16161a]">₹49,999</span>
                  <span className="text-xs font-semibold text-[#787369]">/ one-time</span>
                </div>
                <p className="text-[11px] font-medium text-[#787369] mt-1">Inclusive of all taxes · 100% Public Focus</p>
              </div>

              {/* Feature List */}
              <ul className="mt-5 space-y-3 text-xs sm:text-[13px] text-[#4a4740]">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#9e2a2b] shrink-0 mt-0.5" />
                  <span><strong>Up to 10 university applications</strong> (TU9 + Top Public)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#9e2a2b] shrink-0 mt-0.5" />
                  <span><strong>Personalised dedicated counsellor</strong> for 1:1 guidance</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#9e2a2b] shrink-0 mt-0.5" />
                  <span><strong>Complete APS application guidance</strong> &amp; doc audit</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#9e2a2b] shrink-0 mt-0.5" />
                  <span><strong>ECTS prerequisite credit mapping</strong> &amp; course alignment</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#9e2a2b] shrink-0 mt-0.5" />
                  <span><strong>Priority document turnaround</strong> (3-5 days delivery)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#9e2a2b] shrink-0 mt-0.5" />
                  <span><strong>Mock student visa interview</strong> with former visa officer prep</span>
                </li>
              </ul>
            </div>

            {/* Bottom Action */}
            <div className="mt-8 pt-4 border-t border-[#ece7dd] space-y-2.5">
              <button
                type="button"
                onClick={() => onSelectPlan('Standard Package (Master\'s)', '₹49,999')}
                className="w-full py-3.5 px-4 rounded-xl bg-[#9e2a2b] text-white hover:bg-[#852324] transition-all text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
              >
                <span>Enroll in Standard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#comparison-matrix"
                className="block text-center text-[11px] font-semibold text-[#787369] hover:text-[#9e2a2b] transition-colors"
              >
                Compare full features ↓
              </a>
            </div>
          </motion.div>
        )}

        {/* CARD 3: Premium Package (ADMISSION GUARANTEE) */}
        {(activeTab === 'all' || activeTab === 'masters') && (
          <motion.div 
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col justify-between rounded-3xl border border-[#303038] bg-[#16161a] text-white p-6 sm:p-7 shadow-[0_18px_40px_rgba(22,22,26,0.35)] relative group"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] bg-[#d4af37]/15 px-3 py-1 rounded-full border border-[#d4af37]/30 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Admission Guarantee*</span>
                </span>
                <span className="text-[11px] font-semibold text-[#9a9aa8]">2 Intakes</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Premium Package
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#b5b5c2] min-h-[38px] leading-relaxed">
                VIP Concierge. Everything handled for you across 2 intakes.
              </p>

              {/* Price */}
              <div className="mt-5 pb-5 border-b border-[#2d2d38]">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-white">₹1,19,999</span>
                  <span className="text-xs font-semibold text-[#9a9aa8]">/ one-time</span>
                </div>
                <p className="text-[11px] font-medium text-[#d4af37] mt-1">₹40,000 refund if no admit after 2 intakes</p>
              </div>

              {/* Feature List */}
              <ul className="mt-5 space-y-3 text-xs sm:text-[13px] text-[#d4d4de]">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span><strong>Admission Guarantee*</strong> (written contract backing)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span><strong>Unlimited university applications</strong> across 2 intakes</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span><strong>Complete CSP portal support</strong> &amp; digital VIDEX audit</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span><strong>Visa biometric slot booking</strong> concierge assistance</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span><strong>Dedicated Senior Counsellor Team</strong> (TU9 alumni lead)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>Unlimited revisions &amp; custom professor outreach letters</span>
                </li>
              </ul>
            </div>

            {/* Bottom Action */}
            <div className="mt-8 pt-4 border-t border-[#2d2d38] space-y-2.5">
              <button
                type="button"
                onClick={() => onSelectPlan('Premium Package (Admission Guarantee)', '₹1,19,999')}
                className="w-full py-3.5 px-4 rounded-xl bg-[#d4af37] text-[#16161a] hover:bg-[#e0bc46] transition-all text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
              >
                <span>Enroll in Premium</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#comparison-matrix"
                className="block text-center text-[11px] font-semibold text-[#9a9aa8] hover:text-[#d4af37] transition-colors"
              >
                Compare full features ↓
              </a>
            </div>
          </motion.div>
        )}

        {/* CARD 4: Bachelor's Package */}
        {(activeTab === 'all' || activeTab === 'bachelors') && (
          <motion.div 
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col justify-between rounded-3xl border border-[#e5e0d3] bg-white p-6 sm:p-7 shadow-xs hover:border-[#16161a] transition-all relative group"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#244b7a] bg-[#244b7a]/10 px-3 py-1 rounded-full border border-[#244b7a]/20">
                  Undergrad Focus
                </span>
                <span className="text-[11px] font-semibold text-[#787369]">Validity: 1 Intake</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#16161a]">
                Bachelor&apos;s Package
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#5e5b54] min-h-[38px] leading-relaxed">
                Dedicated plan for 12th standard graduates applying to Germany.
              </p>

              {/* Price */}
              <div className="mt-5 pb-5 border-b border-[#ece7dd]">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-[#16161a]">₹29,999</span>
                  <span className="text-xs font-semibold text-[#787369]">/ one-time</span>
                </div>
                <p className="text-[11px] font-medium text-[#787369] mt-1">Studienkolleg &amp; Direct Bachelor&apos;s</p>
              </div>

              {/* Feature List */}
              <ul className="mt-5 space-y-3 text-xs sm:text-[13px] text-[#4a4740]">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#2e7d46] shrink-0 mt-0.5" />
                  <span><strong>Up to 5 applications</strong> (Studienkollegs or Universities)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#2e7d46] shrink-0 mt-0.5" />
                  <span><strong>Studienkolleg Aufnahmeprüfung</strong> prep guidance</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#2e7d46] shrink-0 mt-0.5" />
                  <span><strong>HZB evaluation &amp; Uni-Assist VPD</strong> verification</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#2e7d46] shrink-0 mt-0.5" />
                  <span>Full SOP writing, 2 LORs &amp; German Europass CV</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#2e7d46] shrink-0 mt-0.5" />
                  <span>Personalised undergraduate counsellor support</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#2e7d46] shrink-0 mt-0.5" />
                  <span>Student visa assistance &amp; blocked account guidance</span>
                </li>
              </ul>
            </div>

            {/* Bottom Action */}
            <div className="mt-8 pt-4 border-t border-[#ece7dd] space-y-2.5">
              <button
                type="button"
                onClick={() => onSelectPlan('Bachelor\'s Package', '₹29,999')}
                className="w-full py-3 px-4 rounded-xl border border-[#16161a] bg-transparent text-[#16161a] hover:bg-[#16161a] hover:text-white transition-all text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <span>Enroll in Bachelor&apos;s</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#comparison-matrix"
                className="block text-center text-[11px] font-semibold text-[#787369] hover:text-[#9e2a2b] transition-colors"
              >
                Compare full features ↓
              </a>
            </div>
          </motion.div>
        )}

      </div>

      {/* Reassurance Banner */}
      <div className="mt-10 rounded-2xl border border-[#ded8cb] bg-[#fbf9f4] p-5 sm:p-6 text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <p className="text-sm font-bold text-[#16161a] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#9e2a2b]" />
            Need help deciding which plan fits your profile?
          </p>
          <p className="text-xs text-[#5e5b54] mt-0.5">
            Speak to a senior advisor. We assess your GPA, university shortlist, and recommend the most cost-effective package.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onSelectPlan('Free Consultation', '₹0')}
          className="whitespace-nowrap px-4 py-2.5 rounded-xl bg-[#16161a] text-white text-xs font-bold hover:bg-[#303038] transition-all cursor-pointer"
        >
          Book 15-Min Free Call
        </button>
      </div>
    </section>
  );
};
