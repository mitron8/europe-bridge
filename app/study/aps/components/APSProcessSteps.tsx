"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ListOrdered, Clock, ArrowRight, ChevronDown } from 'lucide-react';

export const APSProcessSteps = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      step: 1,
      title: "Online Registration",
      subtitle: "Create Account on Portal",
      desc: "Register on the official APS India portal (aps-india.de). Fill in personal details, high school scores, Bachelor's marks, and university roll numbers to receive your registration number."
    },
    {
      step: 2,
      title: "Fee Payment (INR 18,000)",
      subtitle: "CCAvenue / Bank Transfer",
      desc: "Pay the non-refundable APS verification fee of INR 18,000. CCAvenue gateway payments activate your account immediately; NEFT bank transfers require 48 hours for manual matching."
    },
    {
      step: 3,
      title: "Document Courier Submission",
      subtitle: "Dispatch to New Delhi",
      desc: "Print the registered APS application form, attach fee receipt, notarized copies of 10th/12th/degree mark sheets, and dispatch via Speed Post or courier to the APS office in Chanakyapuri, New Delhi."
    },
    {
      step: 4,
      title: "University Verification",
      subtitle: "Authenticity Verification",
      desc: "APS directly contacts your home university registrar / controller of examinations to verify your mark sheets and degree records. This stage takes 4 to 8 weeks."
    },
    {
      step: 5,
      title: "Interview Slot Notification",
      subtitle: "Email Scheduling Notice",
      desc: "Once document verification is confirmed, you receive an official email invitation detailing your assigned date & time for the personal academic interview."
    },
    {
      step: 6,
      title: "Personal Verification Interview",
      subtitle: "15–20 Min Evaluation",
      desc: "Attend the 15–20 minute interview in person at the APS India office in New Delhi (conducted in English or German by two academic evaluators)."
    },
    {
      step: 7,
      title: "Digital Certificate Issuance",
      subtitle: "Digitally-Signed PDF",
      desc: "Upon passing, your official APS certificate is emailed as a digitally-signed PDF (digital-only format since April 2023). It is valid permanently for all German university & visa applications."
    }
  ];

  return (
    <section id="section-process" className="py-12 px-4 sm:px-6 lg:px-12 scroll-mt-28">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div data-reveal className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center shrink-0 border border-[#e2ddd3] shadow-xs">
            <ListOrdered className="w-6 h-6 text-[var(--lp-text)]" />
          </div>
          <div>
            <div className="lp-eyebrow text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-red)]">
              Section #3
            </div>
            <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--lp-text)] tracking-[-0.015em]">
              The APS Process <em className="lp-script text-[var(--lp-red)]">Step by Step</em>
            </h2>
            <p className="text-sm sm:text-base text-[var(--lp-muted)] font-normal mt-1 max-w-3xl leading-relaxed">
              From initial portal registration to receiving your digitally-signed PDF certificate.
            </p>
          </div>
        </div>

        {/* Process Timeline Accordion */}
        <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(22,22,26,0.03)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.05)] transition-all duration-300">
          <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-4 flex-wrap gap-2">
            <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">7-Step Verification Workflow</h3>
            <span className="text-xs font-semibold text-[var(--lp-muted)] flex items-center gap-1.5 bg-[#ece7dd] px-3 py-1 rounded-full border border-[#e2ddd3]">
              <Clock className="w-3.5 h-3.5 text-[var(--lp-gold)]" /> Total Timeline: 2–3 Months
            </span>
          </div>

          <div className="space-y-3">
            {steps.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setActiveStep(activeStep === idx ? -1 : idx)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeStep === idx
                    ? 'bg-white border-[var(--lp-ink)] shadow-md'
                    : 'bg-[#ece7dd]/40 border-[#e2ddd3] hover:border-[#16161a]/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      activeStep === idx ? 'bg-[var(--lp-ink)] text-white' : 'bg-[#ece7dd] text-[var(--lp-muted)]'
                    }`}>
                      {item.step}
                    </span>
                    <div>
                      <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[var(--lp-red)]">{item.subtitle}</span>
                      <h4 className="text-sm sm:text-base font-semibold text-[var(--lp-text)]">{item.title}</h4>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeStep === idx ? 'rotate-180 text-[var(--lp-ink)]' : 'text-[var(--lp-faint)]'}`} />
                </div>
                
                <AnimatePresence initial={false}>
                  {activeStep === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs sm:text-sm text-[var(--lp-muted)] mt-3 pl-11 leading-relaxed border-t border-[var(--lp-rule)] pt-3">
                        {item.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
