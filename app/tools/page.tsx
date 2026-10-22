"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from "@/app/components/landing/LandingNavbar";
import Footer from "@/app/components/Footer";
import { 
  Calculator, 
  GraduationCap, 
  Wallet, 
  Building2, 
  Briefcase, 
  ArrowRight, 
  Search, 
  X,
  Compass, 
  ChevronRight,
  ShieldCheck,
  Target
} from 'lucide-react';

interface ToolItem {
  id: string;
  title: string;
  category: 'Study' | 'Money' | 'Career';
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  description: string;
  highlights: string[];
}

const TOOLS: ToolItem[] = [
  {
    id: 'german-grade',
    title: 'German Grade Calculator',
    category: 'Study',
    href: '/tools/german-grade-calculator',
    icon: Calculator,
    badge: 'Most Used',
    description: 'Use the official Modified Bavarian Formula to convert your CGPA or percentage onto the German 1.0 to 4.0 scale (lower is better).',
    highlights: ['Modified Bavarian Formula', 'India 10-Point & % Presets', 'TU9 Admission Cutoffs']
  },
  {
    id: 'ects-calculator',
    title: 'ECTS Credit Calculator',
    category: 'Study',
    href: '/tools/ects-credit-calculator',
    icon: GraduationCap,
    badge: 'Curriculum Fit',
    description: 'Convert domestic university credits and lecture workload hours to European ECTS credits required for direct Master’s admission.',
    highlights: ['60 ECTS / Year Baseline', 'Subject Prerequisite Check', 'Hours & Workload Mode']
  },
  {
    id: 'admission-chance',
    title: "Master's Admission Chance Evaluator",
    category: 'Study',
    href: '/tools/admission-chance',
    icon: Target,
    badge: 'Profile Score',
    description: 'Score your German Master’s application across CGPA, English bands, university tier, and work experience on a 100-point fit scale.',
    highlights: ['Cohort Acceptance Data', 'TU9 vs UAS Likelihood', 'Profile Fit Breakdown']
  },
  {
    id: 'blocked-account',
    title: 'Blocked Account (Sperrkonto) Calculator',
    category: 'Money',
    href: '/tools/blocked-account-calculator',
    icon: Wallet,
    badge: 'Statutory Figures',
    description: 'Calculate your exact required student visa funds based on the official 2026 Auswärtiges Amt €992/month requirement, dependants, and scholarships.',
    highlights: ['Official €992/mo Rule', 'Multi-Currency Conversion', 'Scholarship Deductions']
  },
  {
    id: 'cost-of-living',
    title: 'Cost of Living Estimator',
    category: 'Money',
    href: '/tools/cost-of-living-estimator',
    icon: Building2,
    badge: 'City Comparison',
    description: 'Compare rent, health insurance, food, and transit costs across 14+ German student cities against your monthly blocked account payout.',
    highlights: ['14+ University Cities', 'Dorm vs WG vs Studio', 'Budget Surplus/Deficit']
  },
  {
    id: 'net-salary',
    title: 'Net Salary & EU Blue Card Calculator',
    category: 'Career',
    href: '/tools/net-salary-calculator',
    icon: Briefcase,
    badge: '2026 Tax Rules',
    description: 'Calculate your monthly take-home pay after German wage tax and social security. Verify if your job offer meets 2026 EU Blue Card thresholds.',
    highlights: ['€45,300 / €41,041 Thresholds', 'Lohnsteuer & Social Security', '21-Month PR Timeline']
  }
];

export default function ToolsHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Study' | 'Money' | 'Career'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const normalizedQuery = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !normalizedQuery ||
        tool.title.toLowerCase().includes(normalizedQuery) ||
        tool.description.toLowerCase().includes(normalizedQuery) ||
        tool.highlights.some(h => h.toLowerCase().includes(normalizedQuery));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#16161a] selection:bg-[#e63946] selection:text-white">
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        <LandingNavbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-28 pb-10 sm:pt-36 sm:pb-14 border-b border-[#e5e0d3] bg-[#fbf9f4]">
          <div 
            aria-hidden 
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-full max-w-7xl rounded-full bg-gradient-to-b from-[#e63946]/[0.025] to-transparent blur-3xl" 
          />

          <div className="lp-container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-5 flex items-center justify-center gap-2 text-[12px] sm:text-[13px] text-[#787369]">
              <Link href="/" className="transition-colors hover:text-[#16161a]">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 opacity-60" />
              <span className="font-semibold text-[#16161a]">Free Tools</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#dcd7cb] bg-[#f3efe6] px-3.5 py-1 text-[11.5px] sm:text-[12px] font-medium text-[#4a4740] shadow-2xs mb-3.5">
              <Compass className="w-3.5 h-3.5 text-[#9e2a2b]" />
              <span className="font-semibold text-[#16161a]">2026 Academic &amp; Visa Regulations</span>
              <span className="text-[#9a958c]">|</span>
              <span>100% Free Planning Tools</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-serif font-normal tracking-tight text-[#16161a] leading-[1.15]">
              Free German Study &amp; Visa Tools. <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#9e2a2b]">Accurate, Fast &amp; Reliable.</span>
            </h1>

            <p className="mt-3.5 max-w-2xl mx-auto text-[14.5px] sm:text-[16px] text-[#5e5b54] leading-relaxed">
              Mathematically accurate calculators and evaluation models built specifically for students applying to German public research universities, converting grades, and preparing visa funds.
            </p>

            {/* Search Input */}
            <div className="mt-7 max-w-xl mx-auto">
              <div className="relative flex items-center rounded-2xl border border-[#dcd7cb] bg-white p-2 shadow-[0_4px_20px_rgba(22,22,26,0.04)] transition-all focus-within:border-[#16161a] focus-within:shadow-[0_8px_30px_rgba(22,22,26,0.08)]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f4f1ea] text-[#16161a]">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools (e.g. Bavarian formula, ECTS, Blocked account)..."
                  className="w-full bg-transparent px-3 py-2 text-[13.5px] sm:text-[14px] text-[#16161a] placeholder:text-[#9a958c] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg text-[#787369] hover:bg-[#f4f1ea] hover:text-[#16161a]"
                    title="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="lp-container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'All', label: 'All Tools' },
              { id: 'Study', label: 'Study & Grades' },
              { id: 'Money', label: 'Finance & Living' },
              { id: 'Career', label: 'Career & Blue Card' }
            ].map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`py-2 px-4 rounded-xl text-[12.5px] font-semibold border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#16161a] text-white border-[#16161a] shadow-2xs'
                      : 'bg-white border-[#dcd7cb] text-[#4a4740] hover:border-[#16161a] hover:bg-[#faf8f3]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Tools Cards Grid */}
        <section className="lp-container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="group flex flex-col justify-between rounded-2xl border border-[#e5e0d3] bg-white p-6 sm:p-7 shadow-[0_2px_8px_rgba(22,22,26,0.03)] transition-all duration-300 hover:border-[#16161a] hover:shadow-[0_10px_28px_rgba(22,22,26,0.08)]"
                >
                  <div>
                    {/* Top Bar: Icon + Category Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl border border-[#e5e0d3] bg-[#f7f5f0] text-[#16161a] flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#f4f1ea] text-[#4a4740] border border-[#dcd7cb]">
                        {tool.badge}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h2 className="text-[18px] sm:text-[19px] font-serif font-bold text-[#16161a] group-hover:text-[#9e2a2b] transition-colors mb-2 leading-snug">
                      {tool.title}
                    </h2>
                    <p className="text-[12.5px] text-[#5e5b54] leading-relaxed mb-4">
                      {tool.description}
                    </p>

                    {/* Feature Highlights Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {tool.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="text-[10.5px] font-medium px-2 py-0.5 rounded-md bg-[#faf8f3] border border-[#e5e0d3] text-[#4a4740]"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-4 border-t border-[#ece7dd] flex items-center justify-between text-[12.5px] font-semibold text-[#16161a] group-hover:text-[#9e2a2b]">
                    <span>Open Interactive Tool</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredTools.length === 0 && (
            <div className="p-12 text-center rounded-2xl border border-[#e5e0d3] bg-white">
              <p className="text-[14px] font-bold text-[#5e5b54]">No tools matched your search query.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-3 text-[12px] font-bold text-[#9e2a2b] hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}
        </section>

        {/* Bottom Counseling CTA Banner */}
        <section className="lp-container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="rounded-3xl border border-[#e5e0d3] bg-[#faf8f3] p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-[11px] font-bold text-[#9e2a2b] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                Verified Admission Assistance
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#16161a]">
                Ready to shortlist your German universities?
              </h2>
              <p className="text-[13.5px] sm:text-[14px] text-[#5e5b54] max-w-xl">
                Get an expert counsellor review of your GPA, English scores, and APS readiness. We help you target 8 tuition-free German universities with guaranteed application accuracy.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                href="/courses"
                className="w-full sm:w-auto rounded-xl border border-[#dcd7cb] bg-white px-5 py-3 text-center text-[13px] font-semibold text-[#16161a] transition-colors hover:border-[#16161a] hover:bg-[#f7f5f0]"
              >
                Explore Courses Database
              </Link>
              <Link
                href="/services/university-shortlisting"
                className="w-full sm:w-auto rounded-xl bg-[#16161a] px-5 py-3 text-center text-[13px] font-semibold text-white transition-all hover:bg-[#2e2e34] shadow-sm flex items-center justify-center gap-2"
              >
                <span>Get 8-University Shortlist</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* EuropeBridge Standard Footer */}
        <div className="relative z-[40]">
          <Footer />
        </div>
      </div>
    </main>
  );
}
