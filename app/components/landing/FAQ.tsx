"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Is the AI better than a traditional agency?",
    a: "Traditional agencies often use copy-paste templates and partner with specific universities. Our AI analyses your unique profile to generate custom SOPs and unbiased university matches — and our human experts review every document before submission.",
  },
  {
    q: "How much does EuropeBridge cost?",
    a: "You can create an account, use all 35+ calculators, and get your initial university matches completely free. If you want our experts to handle your applications and visa processing, we offer transparent, flat-fee premium tiers with no hidden charges.",
  },
  {
    q: "Do you help with the APS certificate and visa?",
    a: "Yes. The platform includes an automated document tracker for both APS and VFS. It tells you exactly which documents you need for your case, and our team double-checks them before you apply to prevent rejections.",
  },
  {
    q: "Which universities do you partner with?",
    a: "Unlike agencies that push you toward 'partnered' universities to collect a commission, EuropeBridge is unbiased. We match you with public and private German universities based entirely on your academic profile and career goals.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-[var(--lp-paper)] pb-28 pt-24 sm:pb-36 sm:pt-32 !shadow-none">
      <div className="lp-container grid gap-14 lg:grid-cols-[420px_1fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div data-reveal className="lp-eyebrow mb-6">
            Questions
          </div>
          <h2 data-reveal className="lp-h2">
            Frequently <em>asked.</em>
          </h2>
          <p data-reveal className="lp-lead mt-6 max-w-sm">
            Something else on your mind?{" "}
            <Link href="/login" className="lp-link text-[var(--lp-text)]">
              Ask a counsellor
            </Link>
          </p>
        </div>

        <div data-reveal className="border-t border-[var(--lp-rule-strong)]">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-[var(--lp-rule)]">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-start justify-between gap-6 py-7 text-left"
                >
                  <span className="flex gap-5">
                    <span className="pt-2 text-[12px] tabular-nums text-[var(--lp-faint)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="lp-serif text-[24px] leading-[1.2] transition-colors group-hover:text-[var(--lp-red)] sm:text-[28px]">
                      {f.q}
                    </span>
                  </span>
                  <span
                    className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                      isOpen
                        ? "rotate-45 border-[var(--lp-ink)] bg-[var(--lp-ink)] text-white"
                        : "border-[var(--lp-rule-strong)]"
                    }`}
                    style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <div className="lp-acc" data-open={isOpen}>
                  <div>
                    <p className="max-w-[640px] pb-8 pl-[52px] text-[15.5px] leading-[1.75] text-[var(--lp-muted)]">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
