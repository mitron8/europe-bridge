"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from "@/app/components/landing/LandingNavbar";
import Footer from "@/app/components/Footer";
import { 
  Compass, 
  FileText, 
  ShieldCheck, 
  Wallet, 
  Search, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowRight,
  GraduationCap, 
  Building2, 
  Plane, 
  Check,
  Send, 
  BookOpen, 
  FileCheck,
  CreditCard,
  Briefcase,
  Layers,
  ChevronRight
} from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: 'admissions' | 'documents' | 'visa' | 'finance';
  categoryLabel: string;
  shortDesc: string;
  turnaround: string;
  pricing: string;
  features: string[];
  popular?: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

const SERVICES_CATALOG: ServiceItem[] = [
  {
    id: 'university-shortlisting',
    title: 'University Shortlisting',
    slug: '/services/university-shortlisting',
    category: 'admissions',
    categoryLabel: 'Admissions & Shortlisting',
    shortDesc: 'Curated list of up to 10 German public university programs mapped to your Bachelor degree, ECTS credits, Bavarian GPA, and career ambitions.',
    turnaround: '3 Days (or 24h Express)',
    pricing: 'From ₹4,999',
    popular: true,
    icon: Compass,
    features: ['Safe, Moderate & Ambitious program split', 'Prerequisite ECTS credit gap audit', '2 full student revision rounds included']
  },
  {
    id: 'dmat-aps-fast-track',
    title: 'dMAT + APS Fast-Track',
    slug: '/services/dmat-aps-fast-track',
    category: 'admissions',
    categoryLabel: 'Admissions & Shortlisting',
    shortDesc: 'Priority dMAT test slot registration and accelerated APS document verification guidance before German university intake deadlines.',
    turnaround: 'Guaranteed Slot Booking',
    pricing: '₹9,999',
    icon: ShieldCheck,
    features: ['Deadline guarantee or 100% refund', 'Consular dossier audit & formatting', 'Direct APS tracker & inquiry management']
  },
  {
    id: 'document-preparation-bundle',
    title: 'Document Preparation Bundle',
    slug: '/services/document-preparation-bundle',
    category: 'documents',
    categoryLabel: 'Document Drafting',
    shortDesc: 'Complete German application suite: Course-specific SOP, 2 Academic LORs, German DIN 5008 Lebenslauf (CV), and Visa Cover Letter.',
    turnaround: '5 Working Days',
    pricing: 'From ₹7,999',
    popular: true,
    icon: Layers,
    features: ['Synchronized narrative across all documents', 'Unlimited revisions for 14 working days', 'Save 35% compared to individual drafts']
  },
  {
    id: 'sop-writing',
    title: 'SOP Writing (Statement of Purpose)',
    slug: '/services/sop-writing',
    category: 'documents',
    categoryLabel: 'Document Drafting',
    shortDesc: 'Course-specific Statement of Purpose crafted to meet exact German faculty admission criteria, research alignment, and Uni-Assist guidelines.',
    turnaround: '3 Days (or 24h Express)',
    pricing: 'From ₹3,499',
    popular: true,
    icon: FileText,
    features: ['Written with TU9 alumni guidance', 'Rigorous plagiarism & AI detection audit', 'Detailed course module & professor alignment']
  },
  {
    id: 'lor-writing',
    title: 'LOR Writing (Recommendation Letters)',
    slug: '/services/lor-writing',
    category: 'documents',
    categoryLabel: 'Document Drafting',
    shortDesc: 'Academic and professional recommendation letters highlighting technical projects, research aptitudes, and authentic academic excellence.',
    turnaround: '3 Working Days',
    pricing: 'From ₹2,499',
    icon: FileCheck,
    features: ['Professor & employer specific templates', 'Concrete technical project highlights', 'German admission committee standards']
  },
  {
    id: 'cv-preparation',
    title: 'German CV / Lebenslauf Preparation',
    slug: '/services/cv-preparation',
    category: 'documents',
    categoryLabel: 'Document Drafting',
    shortDesc: 'Tabellarischer Lebenslauf formatted to German DIN 5008 standards with ATS keyword alignment, academic metrics, and photo placement.',
    turnaround: '48 Hours',
    pricing: 'From ₹1,999',
    icon: BookOpen,
    features: ['German DIN 5008 layout guidelines', 'ATS-optimized typography & formatting', 'Editable PDF and DOCX master formats']
  },
  {
    id: 'cover-letter',
    title: 'University Cover Letter (Anschreiben)',
    slug: '/services/cover-letter',
    category: 'documents',
    categoryLabel: 'Document Drafting',
    shortDesc: 'Concise, high-impact Anschreiben designed to capture the immediate attention of German university admissions committees and faculty chairs.',
    turnaround: '48 Hours',
    pricing: 'From ₹1,499',
    icon: Send,
    features: ['1-page executive German format', 'Faculty & program specific pitch', '2 student feedback rounds included']
  },
  {
    id: 'letter-of-motivation-for-german-student-visa',
    title: 'Visa Letter of Motivation',
    slug: '/services/letter-of-motivation-for-german-student-visa',
    category: 'documents',
    categoryLabel: 'Document Drafting',
    shortDesc: 'Specialized Letter of Motivation addressing German consular and VFS visa officers, establishing genuine academic intent and clear career return rationale.',
    turnaround: '3 Working Days',
    pricing: 'From ₹2,999',
    popular: true,
    icon: GraduationCap,
    features: ['German Embassy & VFS checklist audit', 'Defensible career & economic return plan', 'Eliminates primary visa rejection risks']
  },
  {
    id: 'german-student-visa-application',
    title: 'German Student Visa Assistance (CSP/VFS)',
    slug: '/services/german-student-visa-application',
    category: 'visa',
    categoryLabel: 'Visa & Consular',
    shortDesc: 'Comprehensive National Visa guidance: Consular Services Portal (CSP) registration, VIDEX form generation, dossier audit, and 1-on-1 consular mock interview.',
    turnaround: 'End-to-End Until Stamped',
    pricing: 'From ₹14,999',
    popular: true,
    icon: Plane,
    features: ['CSP & VIDEX form verification', 'Consular appointment scheduling advice', '1-on-1 embassy interview mock session']
  },
  {
    id: 'dhl-express',
    title: 'DHL Express University Courier Booking',
    slug: '/services/dhl-express',
    category: 'visa',
    categoryLabel: 'Visa & Consular',
    shortDesc: 'Discounted express courier service for dispatching physical application dossiers, sealed transcripts, and APS dossiers directly to Germany.',
    turnaround: '3–4 Working Days',
    pricing: 'Flat ₹2,033 / packet',
    icon: Send,
    features: ['Free doorstep pickup across India', 'Official 10-digit DHL AWB tracking', '50%+ discount vs retail counter tariffs']
  },
  {
    id: 'blocked-account',
    title: 'Blocked Account Setup (Sperrkonto)',
    slug: '/services/blocked-account',
    category: 'finance',
    categoryLabel: 'Finance & Banking',
    shortDesc: 'Fast-track opening of your mandatory €992/month German Sperrkonto with official BaFin-approved providers (Expatrio, Coracle, Fintiba).',
    turnaround: '24h Confirmation',
    pricing: 'Free Counselor Setup',
    popular: true,
    icon: Wallet,
    features: ['Official €11,904 annual financial proof', 'Zero markup provider comparison', 'Express Sperrbestätigung for visa filing']
  },
  {
    id: 'health-insurance',
    title: 'German Health Insurance & University M10',
    slug: '/services/health-insurance',
    category: 'finance',
    categoryLabel: 'Finance & Banking',
    shortDesc: 'Public statutory health insurance (TK, Barmer, AOK) or private coverage setup with automatic digital M10 notification directly to your university.',
    turnaround: 'Instant Electronic M10',
    pricing: 'Free Enrollment Support',
    icon: ShieldCheck,
    features: ['Direct digital M10 transmission to university', 'Free incoming travel insurance up to 180 days', 'TK & Barmer statutory partner network']
  },
  {
    id: 'education-loan',
    title: 'Education Loan Assistance',
    slug: '/services/education-loan',
    category: 'finance',
    categoryLabel: 'Finance & Banking',
    shortDesc: 'Collateral and non-collateral education financing up to ₹1.5 Crore covering tuition, blocked account deposit, and living expenses.',
    turnaround: 'Sanction in 4–7 Days',
    pricing: '100% Free Assistance',
    icon: CreditCard,
    features: ['Collateral & non-collateral options', 'Covers full €11,904 blocked deposit', 'Partnership with 15+ top Indian banks']
  },
  {
    id: 'outward-remittance',
    title: 'Outward Remittance (Money Transfer)',
    slug: '/services/outward-remittance',
    category: 'finance',
    categoryLabel: 'Finance & Banking',
    shortDesc: 'RBI LRS-compliant international wire transfer to fund your German blocked account and semester fees at wholesale interbank FX rates.',
    turnaround: '24–48 Hours Settlement',
    pricing: 'Zero Hidden Markup',
    icon: Building2,
    features: ['Near-interbank exchange rates', 'Full Form A2 & TCS compliance handling', 'Zero intermediary bank deduction guarantee']
  }
];

export default function ServicesHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Services', count: SERVICES_CATALOG.length },
    { id: 'admissions', label: 'Admissions & Shortlisting', count: 2 },
    { id: 'documents', label: 'Document Drafting', count: 5 },
    { id: 'visa', label: 'Visa & Consular', count: 2 },
    { id: 'finance', label: 'Finance & Banking', count: 4 },
  ];

  const filteredServices = useMemo(() => {
    return SERVICES_CATALOG.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main className="bg-[var(--lp-paper)] min-h-screen text-[var(--lp-text)] selection:bg-[var(--lp-red)] selection:text-white">
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        <LandingNavbar />

        {/* Ambient Warm Glow (Hero Backdrop) */}
        <div 
          aria-hidden 
          className="pointer-events-none absolute inset-x-0 top-0 h-[560px] opacity-45 blur-[120px] -z-10"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(201,163,91,0.25), rgba(230,57,70,0.12), transparent 70%)"
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
              <span className="font-bold text-[var(--lp-text)]">Services</span>
            </nav>

            {/* Eyebrow Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--lp-rule-strong)] bg-white/70 backdrop-blur-sm px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lp-red)]" />
              EuropeBridge Services Directory
            </div>

            {/* Headline with luxury script italic */}
            <h1 className="lp-h2 text-center text-[clamp(2.35rem,5vw,4.25rem)] leading-[1.1] tracking-[-0.025em]">
              Every step to study in Germany, <br />
              <em className="lp-script text-[var(--lp-red)]">handled with precision.</em>
            </h1>

            {/* Subtitle */}
            <p className="lp-lead mt-6 max-w-[620px] mx-auto text-[15px] sm:text-[17px] leading-[1.7]">
              Explore 14 specialized admissions, drafting, and consular services — backed by TU9 alumni counselors, DIN 5008 standards, and an uncompromising 99.4% visa track record.
            </p>

            {/* Trust Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 max-w-3xl mx-auto text-left">
              <div className="p-4 rounded-2xl bg-[var(--lp-card)] border border-[var(--lp-rule)] shadow-[0_4px_16px_rgba(22,22,26,0.02)]">
                <p className="lp-serif text-2xl sm:text-3xl font-bold text-[var(--lp-text)]">99.4%</p>
                <p className="text-[11px] uppercase tracking-[0.1em] font-semibold text-[var(--lp-muted)] mt-1">Visa Approval Rate</p>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--lp-card)] border border-[var(--lp-rule)] shadow-[0_4px_16px_rgba(22,22,26,0.02)]">
                <p className="lp-serif text-2xl sm:text-3xl font-bold text-[var(--lp-red)]">1,200+</p>
                <p className="text-[11px] uppercase tracking-[0.1em] font-semibold text-[var(--lp-muted)] mt-1">Placed in Germany</p>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--lp-card)] border border-[var(--lp-rule)] shadow-[0_4px_16px_rgba(22,22,26,0.02)]">
                <p className="lp-serif text-2xl sm:text-3xl font-bold text-[var(--lp-text)]">48h – 3d</p>
                <p className="text-[11px] uppercase tracking-[0.1em] font-semibold text-[var(--lp-muted)] mt-1">Fast Turnaround</p>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--lp-card)] border border-[var(--lp-rule)] shadow-[0_4px_16px_rgba(22,22,26,0.02)]">
                <p className="lp-serif text-2xl sm:text-3xl font-bold text-[var(--lp-text)]">1-on-1</p>
                <p className="text-[11px] uppercase tracking-[0.1em] font-semibold text-[var(--lp-muted)] mt-1">Dedicated Mentor</p>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Section */}
        <section className="lp-container pb-20 sm:pb-28">
          
          {/* Controls: Search & Category Pills */}
          <div className="space-y-4 mb-10">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              
              {/* Category Pills (Matching Landing Page ToolsIndex) */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none rounded-full border border-[var(--lp-rule)] bg-white/70 p-1.5 backdrop-blur-sm">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`relative px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[var(--lp-ink)] text-white shadow-sm'
                          : 'text-[var(--lp-muted)] hover:text-[var(--lp-text)]'
                      }`}
                    >
                      {cat.label} ({cat.count})
                    </button>
                  );
                })}
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-80 shrink-0">
                <Search className="absolute left-4 top-3.5 h-4 w-4 text-[var(--lp-muted)]" />
                <input
                  type="text"
                  placeholder="Search by keyword (e.g. SOP, Visa, APS)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-[var(--lp-rule-strong)] bg-white/90 pl-11 pr-4 py-2.5 text-[13.5px] font-medium text-[var(--lp-text)] placeholder-[var(--lp-faint)] focus:border-[var(--lp-text)] focus:outline-none transition-all shadow-2xs"
                />
              </div>
            </div>
          </div>

          {/* Service Cards Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
              {filteredServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className="group relative flex flex-col justify-between rounded-[28px] border border-[var(--lp-rule)] bg-[var(--lp-card)] p-6 sm:p-7 shadow-[0_6px_24px_rgba(22,22,26,0.03)] hover:shadow-[0_18px_45px_rgba(22,22,26,0.08)] hover:border-[var(--lp-rule-strong)] hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="space-y-4">
                      {/* Top Meta Bar */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-[var(--lp-faint)] tabular-nums font-semibold">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[var(--lp-muted)] bg-white border border-[var(--lp-rule)] px-2.5 py-0.5 rounded-full">
                            {service.categoryLabel}
                          </span>
                        </div>

                        {service.popular && (
                          <span className="text-[10.5px] font-bold text-[var(--lp-red)] bg-[var(--lp-red)]/10 border border-[var(--lp-red)]/20 px-2.5 py-0.5 rounded-full">
                            Most Requested
                          </span>
                        )}
                      </div>

                      {/* Icon & Title */}
                      <div className="space-y-2.5 pt-1">
                        <div className="w-11 h-11 rounded-2xl bg-white border border-[var(--lp-rule)] flex items-center justify-center text-[var(--lp-text)] group-hover:text-[var(--lp-red)] group-hover:border-[var(--lp-red)]/30 transition-colors shadow-2xs">
                          <IconComponent className="w-5 h-5" />
                        </div>

                        <h2 className="lp-serif text-[21px] sm:text-[23px] font-bold text-[var(--lp-text)] leading-snug group-hover:text-[var(--lp-red)] transition-colors">
                          {service.title}
                        </h2>

                        <p className="text-[13.5px] text-[var(--lp-muted)] leading-relaxed">
                          {service.shortDesc}
                        </p>
                      </div>

                      {/* Deliverable Checkpoints */}
                      <div className="space-y-2 pt-3 border-t border-[var(--lp-rule)]">
                        {service.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-[12.5px] text-[var(--lp-text)] font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Metadata & Link */}
                    <div className="pt-5 mt-5 border-t border-[var(--lp-rule)] space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[var(--lp-muted)] flex items-center gap-1.5 font-medium">
                          <Clock className="w-3.5 h-3.5 text-[var(--lp-faint)]" />
                          {service.turnaround}
                        </span>
                        <span className="lp-serif font-bold text-[var(--lp-text)] text-[15px]">
                          {service.pricing}
                        </span>
                      </div>

                      <Link
                        href={service.slug}
                        className="w-full rounded-2xl bg-white border border-[var(--lp-rule-strong)] py-2.5 px-4 text-[13px] font-semibold text-[var(--lp-text)] flex items-center justify-between group-hover:bg-[var(--lp-ink)] group-hover:text-white group-hover:border-[var(--lp-ink)] transition-all shadow-2xs"
                      >
                        <span>View Service &amp; Pricing</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-[var(--lp-card)] rounded-[28px] border border-[var(--lp-rule)] p-8">
              <Search className="w-8 h-8 text-[var(--lp-faint)] mx-auto mb-3" />
              <h3 className="lp-serif text-lg font-bold text-[var(--lp-text)]">No services match your search</h3>
              <p className="text-xs text-[var(--lp-muted)] mt-1">Try keywords like &ldquo;SOP&rdquo;, &ldquo;Shortlisting&rdquo;, &ldquo;Visa&rdquo;, or &ldquo;Loan&rdquo;.</p>
              <button
                type="button"
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="lp-btn lp-btn--dark lp-btn--sm mt-5"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Full-Service Admission Package Banner (Luxury Dark Theme matching ClosingCTA) */}
          <div className="mt-16 sm:mt-20 lp-grain relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0d10] p-8 sm:p-12 text-white shadow-2xl">
            {/* Ambient Radial Glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[280px] opacity-40 blur-[100px]"
              style={{ background: "radial-gradient(circle at 50% 100%, rgba(230,57,70,0.25), rgba(201,163,91,0.18), transparent 75%)" }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-gold-soft)] backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--lp-red)]" />
                  All-In-One Admission Mentorship
                </div>

                <h2 className="lp-serif text-2xl sm:text-4xl font-bold text-white leading-[1.15]">
                  Prefer a Dedicated Counselor <br className="hidden sm:inline" />
                  <em className="lp-script text-[var(--lp-gold-soft)]">from Day 1 to Visa Stamped?</em>
                </h2>

                <p className="text-[14px] sm:text-[15px] text-white/75 font-normal max-w-2xl leading-relaxed">
                  Avoid fragmented services. Get complete counselor backing covering university shortlisting, DIN 5008 application documents, dMAT APS fast-tracking, blocked account setup, and 1-on-1 consular visa mock drills under our flagship mentorship package.
                </p>

                {/* Trust Points */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-[12px] text-white/65">
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-[var(--lp-red)]" /> 100% German University Compliant
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-[var(--lp-gold)]" /> Unlimited Revisions on Drafts
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-[var(--lp-red)]" /> Consular Interview Mock Session
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <Link
                  href="/services/document-preparation-bundle"
                  className="lp-btn lp-btn--red justify-center text-sm shadow-[0_12px_28px_-8px_rgba(230,57,70,0.5)]"
                >
                  <span>Explore Document Bundle</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/signup"
                  className="lp-btn lp-btn--ghost-light justify-center text-sm"
                >
                  Book Free 1-on-1 Profile Audit
                </Link>
              </div>
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
