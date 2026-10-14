"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Briefcase, Building2, Calculator, GraduationCap, Target, Wallet } from "lucide-react";

type Category = "Education" | "Finance" | "Career";

const tools: {
  id: string;
  title: string;
  category: Category;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  desc: string;
}[] = [
    {
      id: "german-grade",
      title: "German Grade Calculator",
      category: "Education",
      href: "/tools/german-grade-calculator",
      icon: Calculator,
      tag: "Bavarian formula",
      desc: "Your exact German GPA (1.0–5.0) using the modified Bavarian formula TU9 universities require.",
    },
    {
      id: "admission-chance",
      title: "Admission Chance Evaluator",
      category: "Education",
      href: "/tools/admission-chance",
      icon: Target,
      tag: "AI matcher",
      desc: "Benchmark your degree against 400+ public universities and predict your odds for English-taught programmes.",
    },
    {
      id: "blocked-account",
      title: "Blocked Account Calculator",
      category: "Finance",
      href: "/tools/blocked-account-calculator",
      icon: Wallet,
      tag: "€11,904 standard",
      desc: "The exact proof of funds, monthly disbursement limits and buffer fees for your visa.",
    },
    {
      id: "cost-of-living",
      title: "Living Cost Estimator",
      category: "Finance",
      href: "/tools/cost-of-living-estimator",
      icon: Building2,
      tag: "City index",
      desc: "Realistic monthly rent, insurance and grocery costs across 20+ German cities.",
    },
    {
      id: "ects-credit",
      title: "ECTS Credit Converter",
      category: "Education",
      href: "/tools/ects-credit-calculator",
      icon: GraduationCap,
      tag: "Course workload",
      desc: "Convert lecture hours and university credits into the ECTS credits a Master's admission asks for.",
    },
    {
      id: "net-salary",
      title: "Post-Study Salary Calculator",
      category: "Career",
      href: "/tools/net-salary-calculator",
      icon: Briefcase,
      tag: "Tax class 1",
      desc: "Take-home pay after German taxes, pension contributions and public healthcare.",
    },
  ];

const categories = ["Education", "Finance", "Career"] as const;

export default function ToolsIndex() {
  const [tab, setTab] = useState<(typeof categories)[number]>("Education");
  const list = tools.filter((t) => t.category === tab);

  return (
    <section id="free-tools" className="relative bg-[var(--lp-paper)] pb-20 pt-28 sm:pb-24 sm:pt-36">
      <div className="lp-container">
        <div data-parallax="36" className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div data-reveal className="lp-eyebrow mb-6">
              Free tools
            </div>
            <h2 data-reveal-lines className="lp-h2 max-w-[820px]">
              <span className="lp-line-mask">
                <span>Know where you stand</span>
              </span>
              <span className="lp-line-mask">
                <span>
                  <em>before</em> you sign up.
                </span>
              </span>
            </h2>
            <p data-reveal className="lp-lead mt-6 max-w-[560px]">
              Six calculators built on the rules German universities and embassies actually use. Free, no account needed.
            </p>
          </div>

          <div data-reveal className="flex gap-1 rounded-full border border-[var(--lp-rule)] p-1" role="tablist">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={tab === c}
                onClick={() => setTab(c)}
                className={`relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors sm:px-5 ${tab === c ? "text-white" : "text-[var(--lp-muted)] hover:text-[var(--lp-text)]"
                  }`}
              >
                {tab === c && (
                  <motion.span
                    layoutId="lp-tool-tab"
                    className="absolute inset-0 rounded-full bg-[var(--lp-ink)]"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--lp-rule-strong)]">
          <AnimatePresence initial={false} mode="popLayout">
            {list.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={t.href}
                    className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 border-b border-[var(--lp-rule)] py-7 sm:gap-x-8 md:grid-cols-[56px_minmax(0,1.1fr)_minmax(0,1fr)_auto] md:py-8"
                  >
                    <span className="pointer-events-none absolute inset-0 -mx-4 origin-bottom scale-y-0 rounded-2xl bg-[var(--lp-paper-2)] transition-transform duration-500 group-hover:scale-y-100 sm:-mx-6" style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }} />
                    <span className="relative text-[12px] font-medium tabular-nums text-[var(--lp-faint)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="relative flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                      <span className="lp-serif text-[26px] leading-[1.1] transition-transform duration-500 group-hover:translate-x-1 sm:text-[30px]">
                        {t.title}
                      </span>
                    </span>
                    <span className="relative col-span-2 col-start-2 row-start-2 text-[14px] leading-relaxed text-[var(--lp-muted)] md:col-span-1 md:col-start-3 md:row-start-1">
                      <span className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--lp-text)]">
                        <Icon className="h-3.5 w-3.5 text-[var(--lp-red)]" />
                        {t.category} · {t.tag}
                      </span>
                      <span className="block">{t.desc}</span>
                    </span>
                    <span className="relative col-start-3 row-start-1 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--lp-rule-strong)] transition-all duration-500 group-hover:border-[var(--lp-red)] group-hover:bg-[var(--lp-red)] group-hover:text-white md:col-start-4">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div data-reveal className="mt-10 flex justify-end">
          <Link href="/tools" className="lp-link text-[14px]">
            Browse all tools <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
