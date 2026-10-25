"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from "@/app/components/landing/LandingNavbar";
import Footer from "@/app/components/Footer";
import { 
  GraduationCap, 
  FileCheck2, 
  Wallet, 
  Coins, 
  PlaneTakeoff, 
  FileText, 
  HeartPulse, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Search, 
  Clock, 
  Briefcase, 
  Building2, 
  BookOpen,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

interface StudyGuideItem {
  id: string;
  title: string;
  href: string;
  category: 'eligibility' | 'finances' | 'visa' | 'pathway';
  categoryLabel: string;
  readTime: string;
  shortDesc: string;
  highlights: string[];
  icon: React.ComponentType<{ className?: string }>;
  popular?: boolean;
}

const STUDY_GUIDES: StudyGuideItem[] = [
  {
    id: 'masters-guide',
    title: "Master's Degree in Germany: The Complete Blueprint",
    href: '/study/masters',
    category: 'pathway',
    categoryLabel: 'Pathway & Overview',
    readTime: '12 min read',
    shortDesc: 'Everything you need to know about pursuing an English-taught master’s degree at TU9 and public research universities with 0€ tuition.',
    highlights: ['TU9 vs Universities of Applied Sciences (UAS)', 'Curriculum ECTS prerequisites & credit conversion', 'Winter vs Summer intake roadmap & deadlines'],
    icon: GraduationCap,
    popular: true
  },
  {
    id: 'requirements',
    title: 'German University Admission Requirements',
    href: '/study/requirements',
    category: 'eligibility',
    categoryLabel: 'Eligibility & Requirements',
    readTime: '8 min read',
    shortDesc: 'Understand the modified Bavarian GPA conversion formula, ECTS subject prerequisites, IELTS/TOEFL requirements, and transcript verifications.',
    highlights: ['Modified Bavarian formula calculation rule', 'Minimum German grade cutoffs for TU9 programs', 'English and German language certificate rules'],
    icon: BookOpen,
    popular: true
  },
  {
    id: 'aps-guide',
    title: 'APS Certificate Step-by-Step Verification Guide',
    href: '/study/aps',
    category: 'eligibility',
    categoryLabel: 'Eligibility & Requirements',
    readTime: '10 min read',
    shortDesc: 'Complete walkthrough for Indian, Chinese, and Vietnamese students on securing the mandatory digital APS certificate before German university deadlines.',
    highlights: ['DigiLocker vs physical transcript submissions', 'Professor verification & university inquiry process', 'Tracking status, handling delays & express processing'],
    icon: FileCheck2,
    popular: true
  },
  {
    id: 'application-process',
    title: 'The 6-Step German University Application Process',
    href: '/study/application-process',
    category: 'pathway',
    categoryLabel: 'Pathway & Overview',
    readTime: '9 min read',
    shortDesc: 'Chronological timeline from researching English-taught degrees to Uni-Assist VPD submissions, direct university applications, and accepting your offer.',
    highlights: ['Uni-Assist VPD vs direct university portal filings', 'Key document dossier compilation checklist', 'Application fee payments and tracking admit letters'],
    icon: Compass
  },
  {
    id: 'cost-of-living',
    title: 'Real Cost of Living for Students in Germany',
    href: '/study/cost-of-living',
    category: 'finances',
    categoryLabel: 'Finances & Funding',
    readTime: '7 min read',
    shortDesc: 'Detailed city-by-city breakdown of student rent (WG flatshares vs Studentenwerk dorms), health insurance, groceries, transit, and leisure costs.',
    highlights: ['Comparison across Munich, Berlin, Aachen & Hamburg', 'Dormitory waiting lists and private WG room budgets', 'Semester contribution (Semesterticket) travel perks'],
    icon: Building2
  },
  {
    id: 'scholarships',
    title: 'Scholarships for International Students in Germany',
    href: '/study/scholarships',
    category: 'finances',
    categoryLabel: 'Finances & Funding',
    readTime: '8 min read',
    shortDesc: 'Explore DAAD merit scholarships, Deutschlandstipendium grants, Heinrich Böll foundation aid, and state funding opportunities.',
    highlights: ['Top DAAD funding programs for international master’s', '€300/month Deutschlandstipendium eligibility criteria', 'Application timing, motivation letters & recommendation tips'],
    icon: Coins
  },
  {
    id: 'student-visa',
    title: 'German National Student Visa (Visa D) Roadmap',
    href: '/study/student-visa',
    category: 'visa',
    categoryLabel: 'Visa & Consular',
    readTime: '11 min read',
    shortDesc: 'Step-by-step consular guidance: Consular Services Portal (CSP) account setup, VFS appointment booking, VIDEX forms, and document dossier layout.',
    highlights: ['Consular Services Portal (CSP) digital workflow', 'VFS appointment document checklist & two-set dossier', 'Embassy interview questions and biometric verification'],
    icon: PlaneTakeoff,
    popular: true
  },
  {
    id: 'motivation-letter',
    title: 'Visa Motivation Letter vs. University SOP',
    href: '/study/motivation-letter',
    category: 'visa',
    categoryLabel: 'Visa & Consular',
    readTime: '7 min read',
    shortDesc: 'Master the crucial difference between an academic Statement of Purpose for university admissions and a consular Letter of Motivation for your visa.',
    highlights: ['Why embassy officers reject generic university SOPs', 'Demonstrating academic intent & clear economic return', 'DIN 5008 German business letter formatting standard'],
    icon: FileText
  },
  {
    id: 'health-insurance',
    title: 'German Health Insurance & University M10 Guide',
    href: '/study/health-insurance',
    category: 'finances',
    categoryLabel: 'Finances & Funding',
    readTime: '6 min read',
    shortDesc: 'Statutory public healthcare (Techniker Krankenkasse, Barmer) vs private coverage, automatic electronic M10 transmission, and travel insurance.',
    highlights: ['Public vs private healthcare rules for under/over 30s', 'How electronic M10 notification unlocks enrollment', 'Free incoming travel insurance for visa stamping'],
    icon: HeartPulse
  },
  {
    id: 'life-after-offer',
    title: 'Life After the Offer: Arrival, Careers & EU Blue Card',
    href: '/study/life-after-offer',
    category: 'pathway',
    categoryLabel: 'Pathway & Overview',
    readTime: '9 min read',
    shortDesc: 'Landing in Germany: City registration (Anmeldung), tax ID, opening your current account, 18-month post-study job seeker visa, and EU Blue Card residency.',
    highlights: ['Bürgeramt appointment and landlord confirmation (Wohnungsgeberbestätigung)', '18-month post-study work search visa privileges', 'Fast-track permanent residency (PR) in 21 months'],
    icon: Briefcase
  }
];

export default function StudyHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'pathway' | 'eligibility' | 'finances' | 'visa'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Guides', count: STUDY_GUIDES.length },
    { id: 'pathway', label: 'Roadmap & Process', count: 3 },
    { id: 'eligibility', label: 'Eligibility & APS', count: 2 },
    { id: 'finances', label: 'Finances & Living', count: 3 },
    { id: 'visa', label: 'Visa & Consular', count: 2 },
  ];

  const filteredGuides = useMemo(() => {
    return STUDY_GUIDES.filter((guide) => {
      const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
      const matchesSearch = 
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main className="bg-[var(--lp-paper)] min-h-screen text-[var(--lp-text)] selection:bg-[var(--lp-red)] selection:text-white">
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        <LandingNavbar />

        {/* Ambient Warm Glow */}
        <div 
          aria-hidden 
          className="pointer-events-none absolute inset-x-0 top-0 h-[560px] opacity-45 blur-[120px] -z-10"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(201,163,91,0.22), rgba(230,57,70,0.1), transparent 70%)"
          }}
        />

        {/* Hero Section */}
        <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-16">
          <div className="lp-container text-center max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-2 text-xs font-semibold text-[var(--lp-muted)]">
              <Link href="/" className="hover:text-[var(--lp-red)] transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 text-[var(--lp-faint)]" />
              <span className="font-bold text-[var(--lp-text)]">Study in Germany</span>
            </nav>

            {/* Eyebrow Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--lp-rule-strong)] bg-white/70 backdrop-blur-sm px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lp-red)]" />
              Comprehensive Germany Study Knowledge Base
            </div>

            {/* Headline with luxury script italic */}
            <h1 className="lp-h2 text-center text-[clamp(2.35rem,5vw,4.25rem)] leading-[1.1] tracking-[-0.025em]">
              Your definitive guide to studying in Germany, <br />
              <em className="lp-script text-[var(--lp-red)]">from requirements to arrival.</em>
            </h1>

            {/* Subtitle */}
            <p className="lp-lead mt-6 max-w-[640px] mx-auto text-[15px] sm:text-[17px] leading-[1.7]">
              Unbiased, university-audited blueprints written by alumni from TU9 and top German research institutions. Zero agency fluff, 100% verified regulatory standards.
            </p>

            {/* Trust Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 max-w-3xl mx-auto text-left">
              <div className="p-4 rounded-2xl bg-[var(--lp-card)] border border-[var(--lp-rule)] shadow-[0_4px_16px_rgba(22,22,26,0.02)]">
                <p className="lp-serif text-2xl sm:text-3xl font-bold text-[var(--lp-text)]">400+</p>
                <p className="text-[11px] uppercase tracking-[0.1em] font-semibold text-[var(--lp-muted)] mt-1">Public Universities</p>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--lp-card)] border border-[var(--lp-rule)] shadow-[0_4px_16px_rgba(22,22,26,0.02)]">
                <p className="lp-serif text-2xl sm:text-3xl font-bold text-[var(--lp-red)]">0€</p>
                <p className="text-[11px] uppercase tracking-[0.1em] font-semibold text-[var(--lp-muted)] mt-1">Tuition Standard</p>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--lp-card)] border border-[var(--lp-rule)] shadow-[0_4px_16px_rgba(22,22,26,0.02)]">
                <p className="lp-serif text-2xl sm:text-3xl font-bold text-[var(--lp-text)]">€992/mo</p>
                <p className="text-[11px] uppercase tracking-[0.1em] font-semibold text-[var(--lp-muted)] mt-1">Proof of Funds</p>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--lp-card)] border border-[var(--lp-rule)] shadow-[0_4px_16px_rgba(22,22,26,0.02)]">
                <p className="lp-serif text-2xl sm:text-3xl font-bold text-[var(--lp-text)]">18 Months</p>
                <p className="text-[11px] uppercase tracking-[0.1em] font-semibold text-[var(--lp-muted)] mt-1">Job Search Visa</p>
              </div>
            </div>
          </div>
        </section>

        {/* Directory & Guides List */}
        <section className="lp-container pb-20 sm:pb-28">
          {/* Controls: Search & Category Pills */}
          <div className="space-y-4 mb-10">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none rounded-full border border-[var(--lp-rule)] bg-white/70 p-1.5 backdrop-blur-sm">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as any)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      selectedCategory === cat.id
                        ? 'bg-[var(--lp-ink)] text-white shadow-sm'
                        : 'text-[var(--lp-muted)] hover:text-[var(--lp-text)] hover:bg-black/[0.04]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-black/[0.05] text-[var(--lp-muted)]'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[260px] sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--lp-muted)]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search guides (APS, Visa, Cost...)"
                  className="w-full pl-9 pr-4 py-2.5 rounded-full border border-[var(--lp-rule)] bg-white/80 text-xs font-semibold text-[var(--lp-text)] placeholder-[var(--lp-faint)] focus:outline-none focus:border-[var(--lp-text)] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Guides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredGuides.map((guide) => {
                const Icon = guide.icon;
                return (
                  <motion.div
                    key={guide.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.28 }}
                  >
                    <Link
                      href={guide.href}
                      className="group flex flex-col justify-between h-full bg-[var(--lp-card)] border border-[var(--lp-rule)] rounded-3xl p-6 sm:p-7 shadow-[0_4px_20px_rgba(22,22,26,0.02)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.06)] hover:border-[var(--lp-red)]/35 transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Popular Accent Tag */}
                      {guide.popular && (
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-50 border border-red-200 text-[10px] font-bold uppercase tracking-wider text-[var(--lp-red)]">
                            Essential Read
                          </span>
                        </div>
                      )}

                      <div className="space-y-4">
                        {/* Header icon and metadata */}
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center shrink-0 border border-[#e2ddd3] group-hover:bg-[var(--lp-red)] group-hover:text-white transition-colors duration-200">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--lp-gold)] block">
                              {guide.categoryLabel}
                            </span>
                            <span className="text-[11px] text-[var(--lp-muted)] font-medium flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3" />
                              {guide.readTime}
                            </span>
                          </div>
                        </div>

                        {/* Guide Title */}
                        <h3 className="lp-serif text-xl sm:text-2xl font-bold text-[var(--lp-text)] group-hover:text-[var(--lp-red)] transition-colors leading-snug">
                          {guide.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                          {guide.shortDesc}
                        </p>

                        {/* Bullet Highlights */}
                        <div className="pt-2 border-t border-[var(--lp-rule)]/60 space-y-2">
                          <span className="text-[10.5px] uppercase tracking-wider font-extrabold text-[var(--lp-faint)] block">
                            Key Takeaways
                          </span>
                          <ul className="space-y-1.5">
                            {guide.highlights.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-[var(--lp-text)] font-medium">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--lp-red)] shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Bottom Action */}
                      <div className="mt-6 pt-4 border-t border-[var(--lp-rule)] flex items-center justify-between text-xs font-bold text-[var(--lp-text)] group-hover:text-[var(--lp-red)] transition-colors">
                        <span>Read Full Guide</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Quick Tools Banner */}
          <div className="mt-16 rounded-3xl border border-[var(--lp-rule)] bg-[#faf8f3] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-red)]">
                Interactive Utilities
              </span>
              <h3 className="lp-serif text-2xl sm:text-3xl font-bold text-[var(--lp-text)]">
                Want to calculate your profile numbers directly?
              </h3>
              <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                Use our 6 free calculators built directly on official German Bavarian conversion formulas, Auswärtiges Amt blocked account rates, and TU9 ECTS credit scales.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href="/tools"
                className="w-full sm:w-auto lp-btn lp-btn--dark px-6 py-3 text-xs flex items-center justify-center gap-2"
              >
                <span>Browse All 6 Tools</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/courses"
                className="w-full sm:w-auto lp-btn lp-btn--ghost px-6 py-3 text-xs flex items-center justify-center gap-2"
              >
                <span>Search 400+ Programs</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="relative z-[40]">
          <Footer />
        </div>
      </div>
    </main>
  );
}
