"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

export interface FAQItem {
  q: string;
  a: string;
}

interface StudyFAQProps {
  id?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
}

export const StudyFAQ: React.FC<StudyFAQProps> = ({
  id = "section-faq",
  badge = "Questions & Answers",
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about requirements, timelines, and next steps.",
  faqs
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id={id} className="relative scroll-mt-28 py-16 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid gap-12 lg:grid-cols-[380px_1fr] lg:gap-20">
        {/* Left Sticky Column */}
        <div className="lg:sticky lg:top-36 lg:self-start space-y-4">
          <div className="lp-eyebrow text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-muted)]">
            {badge}
          </div>
          <h2 className="lp-serif text-3xl sm:text-4xl lg:text-[40px] leading-[1.15] text-[var(--lp-text)] font-semibold">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[14.5px] leading-[1.65] text-[var(--lp-muted)]">
              {subtitle}
            </p>
          )}
          <div className="pt-2">
            <Link 
              href="/login" 
              className="lp-link inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[var(--lp-text)] hover:text-[var(--lp-red)] transition-colors"
            >
              Ask an admissions counsellor &rarr;
            </Link>
          </div>
        </div>

        {/* Right Accordion List */}
        <div className="border-t border-[var(--lp-rule-strong)]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border-b border-[var(--lp-rule)]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-start justify-between gap-6 py-6 sm:py-7 text-left cursor-pointer"
                >
                  <span className="flex gap-4 sm:gap-5">
                    <span className="pt-1.5 text-[12px] font-medium tabular-nums text-[var(--lp-faint)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="lp-serif text-[19px] sm:text-[22px] leading-[1.25] text-[var(--lp-text)] transition-colors group-hover:text-[var(--lp-red)]">
                      {faq.q}
                    </span>
                  </span>
                  <span
                    className={`mt-1 flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "rotate-45 border-[var(--lp-ink)] bg-[var(--lp-ink)] text-white"
                        : "border-[var(--lp-rule-strong)] text-[var(--lp-text)] group-hover:border-[var(--lp-text)]"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[680px] pb-7 pl-8 sm:pl-[44px] text-[14.5px] sm:text-[15.5px] leading-[1.75] text-[var(--lp-muted)] whitespace-pre-line">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
