"use client";
import React, { useState } from 'react';
import { Landmark, GraduationCap, Home, CreditCard, CheckCircle2, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const RemittanceUseCases = () => {
  const [activeTab, setActiveTab] = useState<'blocked' | 'tuition' | 'rent' | 'card'>('blocked');

  const useCases = {
    blocked: {
      title: "German Blocked Account (Sperrkonto)",
      amountRange: "€11,904 to €12,053",
      timeline: "Delivered within 24 to 48 hours",
      description: "Transferring the mandatory proof of subsistence for your German student visa interview. Our partner ensures the full amount credits to Expatrio, Coracle, or Fintiba with zero intermediary bank deductions.",
      highlights: [
        "Direct IBAN transfer into your personal German escrow account",
        "Zero risk of short-payment rejections by BaFin banks",
        "Official outward remittance confirmation letter for embassy appointment",
        "Full support for education loan direct-disbursements"
      ],
      ctaText: "Transfer for Blocked Account"
    },
    tuition: {
      title: "University Semester Contributions & Tuition",
      amountRange: "€150 to €8,500+",
      timeline: "Credited within 1 to 2 business days",
      description: "Pay your mandatory public university semester contribution (Semesterbeitrag) or private university tuition fee directly to the university's state treasury account with your matriculation reference number.",
      highlights: [
        "Guaranteed inclusion of student applicant ID in payment reference",
        "Direct SWIFT MT103 confirmation provided for university registrar",
        "Fast-track processing for urgent enrollment deadlines",
        "Applicable for Uni-Assist VPD processing fee transfers"
      ],
      ctaText: "Pay University Tuition / Fees"
    },
    rent: {
      title: "Accommodation Deposit (Mietkaution) & Advance Rent",
      amountRange: "€800 to €2,500",
      timeline: "Credited in 24 to 48 hours",
      description: "German landlords and Studentenwerk dormitories require a 2–3 month security deposit before handing over room keys. Secure your housing lease ahead of your departure flight.",
      highlights: [
        "Direct transfer to German landlord or Studentenwerk bank account",
        "SEPA-compatible payment receipt accepted as rental proof",
        "Avoid carrying large sums of physical cash into Germany",
        "Safe transfer with escrow-grade tracking"
      ],
      ctaText: "Send Rent Deposit"
    },
    card: {
      title: "Multi-Currency Student Travel Forex Card",
      amountRange: "€500 to €5,000",
      timeline: "Home delivered in India within 24 hours",
      description: "Never worry about paying high 3.5% markup or cash withdrawal fees when landing in Germany. Load Euros at locked-in interbank rates with chip-and-PIN security.",
      highlights: [
        "Zero foreign exchange markup on all Euro transactions",
        "Free cash withdrawals across German Sparkasse and Deutsche Bank ATMs",
        "Companion emergency backup card issued free of cost",
        "Easy online top-up by parents from India via domestic NEFT"
      ],
      ctaText: "Order Student Forex Card"
    }
  };

  const current = useCases[activeTab];

  return (
    <section id="use-cases" className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-black uppercase tracking-wider">
            <Landmark className="w-4 h-4" />
            <span>Versatile Transfer Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Every Payment Need in Germany Covered
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            From the mandatory blocked account to tuition fees, rental deposits, and contactless travel cards.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-gray-100/90 border border-gray-200/80 gap-1.5 shadow-inner max-w-full overflow-x-auto">
            {[
              { id: 'blocked', label: 'Blocked Account (€11,904)', icon: Landmark },
              { id: 'tuition', label: 'University Fees / Tuition', icon: GraduationCap },
              { id: 'rent', label: 'Rent Deposit (Mietkaution)', icon: Home },
              { id: 'card', label: 'Student Forex Card', icon: CreditCard }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                    isActive
                      ? 'bg-white text-germany-black shadow-sm border border-gray-200'
                      : 'text-gray-600 hover:text-germany-black'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-germany-red' : 'text-gray-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Card */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-gray-200 shadow-md space-y-6 max-w-4xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <span className="text-[11px] font-black uppercase text-germany-red tracking-wider">
                Target Payment Category
              </span>
              <h3 className="text-2xl font-black text-germany-black mt-1 font-display">{current.title}</h3>
            </div>

            <div className="text-left sm:text-right bg-red-50/50 p-3 sm:p-0 rounded-2xl sm:bg-transparent">
              <div className="text-xs font-bold text-gray-500 uppercase">Typical Transfer Range</div>
              <div className="text-xl sm:text-2xl font-black text-germany-black font-display">{current.amountRange}</div>
              <div className="text-xs font-bold text-emerald-700 flex items-center sm:justify-end gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5" /> {current.timeline}
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-700 font-medium leading-relaxed">
            {current.description}
          </p>

          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-gray-600 tracking-wider block">Service Advantages:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {current.highlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{hl}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-500 font-medium flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full compliance with Reserve Bank of India LRS documentation.</span>
            </div>

            <a
              href="#booking"
              className="neu-btn-primary w-full sm:w-auto px-6 py-3 text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm"
            >
              <span>{current.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
