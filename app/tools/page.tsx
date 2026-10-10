"use client";

import React, { useState, useMemo } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { 
  Calculator, 
  GraduationCap, 
  Wallet, 
  Building2, 
  Briefcase, 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  Compass, 
  FileCheck2,
  TrendingUp,
  Award,
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
    badge: 'Most Popular',
    description: 'Use the official Modified Bavarian Formula to convert your CGPA, percentage, or GPA onto the German 1.0 to 5.0 scale (lower is better).',
    highlights: ['Modified Bavarian Formula', 'India 10-Point & % Presets', 'TU9 Admission Fit']
  },
  {
    id: 'ects-calculator',
    title: 'ECTS Credit Calculator',
    category: 'Study',
    href: '/tools/ects-credit-calculator',
    icon: GraduationCap,
    badge: 'Academic Standard',
    description: 'Convert domestic university credits or lecture workload hours to European ECTS credits required for direct Master’s admission.',
    highlights: ['60 ECTS / Year Baseline', 'Subject Prerequisite Check', 'Hours & Workload Mode']
  },
  {
    id: 'admission-chance',
    title: "Master's Admission Chance Evaluator",
    category: 'Study',
    href: '/tools/admission-chance',
    icon: Target,
    badge: 'Evaluation Tool',
    description: 'Score your German Master’s application across CGPA, English proficiency, university tiers, and work experience on a 100-point fit scale.',
    highlights: ['Cohort Acceptance Data', 'TU9 vs UAS Likelihood', 'Profile Fit Breakdown']
  },
  {
    id: 'blocked-account',
    title: 'Blocked Account (Sperrkonto) Calculator',
    category: 'Money',
    href: '/tools/blocked-account-calculator',
    icon: Wallet,
    badge: 'Statutory Figures',
    description: 'Calculate your exact required student visa funds based on the official 2025/2026 Auswärtiges Amt €992/month requirement, dependants, and scholarships.',
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
    highlights: ['14+ University Cities', 'Dorm vs WG vs Studio', 'Budget Surplus/Deficit Tracker']
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
    <div className="min-h-screen neu-bg text-germany-black dark:text-white transition-colors duration-200">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-24 sm:pt-28 pb-10 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-germany-red/10 border border-germany-red/20 text-germany-red dark:text-[#FF6B7A] text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-germany-red dark:text-[#FF6B7A]" />
            100% Free Germany Student Planning Tools
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-germany-black dark:text-white">
            Your Germany Toolkit
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
            Smart, mathematically accurate calculators and evaluation tools built specifically for students applying to Master&apos;s and Bachelor&apos;s programs in Germany.
          </p>

          {/* Search Bar */}
          <div className="pt-2 max-w-md mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools (e.g. Bavarian, ECTS, Blocked account)..."
                className="w-full pl-10 pr-4 py-2.5 neu-input text-xs font-bold rounded-xl bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 focus:border-germany-red transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto pb-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {(['All', 'Study', 'Money', 'Career'] as const).map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-germany-red text-white border-germany-red shadow-sm'
                    : 'bg-white dark:bg-[#111622] border-gray-200/80 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                {cat === 'All' ? 'All Tools' : cat === 'Study' ? 'Study & Grades' : cat === 'Money' ? 'Finance & Living' : 'Career & Blue Card'}
              </button>
            );
          })}
        </div>
      </section>

      {/* Tools Cards Grid */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.id}
                href={tool.href}
                className="group neu-card p-6 sm:p-7 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800/80 rounded-2xl hover:border-germany-red/50 dark:hover:border-germany-red/50 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon + Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-germany-red/10 dark:bg-germany-red/20 text-germany-red dark:text-[#FF6B7A] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200/60 dark:border-gray-700">
                      {tool.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-black font-display text-germany-black dark:text-white group-hover:text-germany-red transition-colors mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium mb-4">
                    {tool.description}
                  </p>

                  {/* Feature Highlights Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {tool.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-50 dark:bg-[#0A0D14] border border-gray-200/60 dark:border-gray-800 text-gray-600 dark:text-gray-400"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-xs font-bold text-germany-red dark:text-[#FF6B7A] group-hover:translate-x-1 transition-transform">
                  <span>Open Tool</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="p-12 text-center neu-card bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 rounded-2xl">
            <p className="text-sm font-bold text-gray-500">No tools matched your search query.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-3 text-xs font-bold text-germany-red underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto pb-20">
        <div className="neu-card p-8 sm:p-10 bg-gradient-to-br from-germany-black via-[#111622] to-[#151B27] text-white rounded-3xl border border-gray-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-germany-gold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              Verified Admission Support
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
              Ready to short-list your German universities?
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-medium max-w-xl">
              Complete your student profile to access automated university matching, admission requirements, and expert counsellor reviews.
            </p>
          </div>

          <Link
            href="/dashboard/student/complete-profile"
            className="neu-btn-primary py-3.5 px-6 rounded-xl text-xs font-extrabold flex items-center gap-2 shrink-0 shadow-lg hover:scale-105 transition-transform text-white"
          >
            Start Free Profile Setup
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
