"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Award, Search, Check, Calendar, 
  ExternalLink, Star, ChevronDown, ChevronUp, BookOpen, Clock, Lightbulb 
} from 'lucide-react';

interface ScholarshipItem {
  id: string;
  name: string;
  organization: string;
  category: 'fully-funded' | 'partial' | 'masters' | 'stem' | 'civic';
  amount: string;
  period: string;
  degreeLevels: string[];
  gpaRequirement: string;
  deadline: string;
  highlights: string[];
  eligibility: string[];
  proTip: string;
  officialUrl?: string;
  featured?: boolean;
}

const SCHOLARSHIPS_DATA: ScholarshipItem[] = [
  {
    id: 'daad-epos',
    name: 'DAAD EPOS (Development-Related Postgraduate Courses)',
    organization: 'German Academic Exchange Service (DAAD)',
    category: 'fully-funded',
    amount: '€992 / month + Full Coverage',
    period: '12 to 24 Months (Full Master’s)',
    degreeLevels: ["Master's", "PhD"],
    gpaRequirement: 'Top 30% / German GPA ≤ 2.0 (equivalent to > 75% or 7.8+ CGPA)',
    deadline: 'Typically July – October (1 year before intake)',
    highlights: [
      'Monthly stipend of €992 for Master’s candidates (€1,300 for PhD)',
      'Statutory health, accident and personal liability insurance covered',
      'One-time return travel subsidy (flight ticket grant)',
      'Pre-sessional German language course subsidized (up to 6 months)',
      'Annual study & research allowance of €460'
    ],
    eligibility: [
      'Bachelor’s degree completed within the last 6 years',
      'Minimum 2 years of verifiable full-time professional experience',
      'Admitted to or applying for a designated EPOS Master’s course',
      'Strong academic and development-oriented career motivation'
    ],
    proTip: 'Apply directly to the university course offering the EPOS grant, NOT to the DAAD central portal. Clearly emphasize in your SOP how your studies will solve tangible developmental challenges in your home country.',
    officialUrl: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/epos-programme/',
    featured: true
  },
  {
    id: 'deutschlandstipendium',
    name: 'Deutschlandstipendium (Germany National Merit Scholarship)',
    organization: 'Federal Ministry of Education (BMBF) + Corporate Donors',
    category: 'partial',
    amount: '€300 / month tax-free',
    period: '2 Semesters (renewable)',
    degreeLevels: ["Bachelor's", "Master's"],
    gpaRequirement: 'Top 10–20% of department (German GPA ≤ 1.8 preferred)',
    deadline: 'Varies by university (typically June–August)',
    highlights: [
      '€150 from federal government matched by €150 from companies (BMW, Siemens, BASF)',
      'Open to all nationalities and degree subjects without quotas',
      'Does not count toward statutory income limits or BAföG',
      'Direct access to corporate mentorship, internships, and networking events',
      'Can be held concurrently with student jobs (research assistant / working student)'
    ],
    eligibility: [
      'Enrolled or currently admitted at a participating German university',
      'Exceptional high school or bachelor’s academic record',
      'Social responsibility, volunteering, or overcoming severe personal adversity'
    ],
    proTip: 'Even if your GPA is 2.0, apply! German selection committees weigh volunteer work, sports leadership, or overcoming socio-economic challenges just as heavily as raw grades.',
    officialUrl: 'https://www.deutschlandstipendium.de/',
    featured: true
  },
  {
    id: 'daad-helmut-schmidt',
    name: 'DAAD Helmut-Schmidt-Programme (PPGG)',
    organization: 'Federal Foreign Office & DAAD',
    category: 'fully-funded',
    amount: '€992 / month + Full Benefits',
    period: 'Full Master’s Degree (up to 24 months)',
    degreeLevels: ["Master's"],
    gpaRequirement: 'Above average (German GPA ≤ 2.0)',
    deadline: 'June 1 – July 31 each year',
    highlights: [
      'Full monthly stipend of €992',
      'Comprehensive statutory health insurance contribution',
      'Travel allowance for flights to and from Germany',
      'Family allowance if accompanying spouse/children meet criteria',
      'Networking events with German policy makers and diplomats'
    ],
    eligibility: [
      'Degrees in Social Sciences, Political Science, Economics, Law, or Public Administration',
      'Graduated within the last 6 years with strong grades',
      'Commitment to democratic governance and sustainable public administration'
    ],
    proTip: 'Focus your motivational essay on governance reforms or policy issues relevant to your country that you plan to address upon graduation.',
    officialUrl: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/helmut-schmidt-programme/',
    featured: true
  },
  {
    id: 'erasmus-mundus',
    name: 'Erasmus Mundus Joint Master Degrees (EMJM)',
    organization: 'European Commission',
    category: 'fully-funded',
    amount: '€1,400 / month + Full Tuition',
    period: '12 to 24 Months',
    degreeLevels: ["Master's"],
    gpaRequirement: 'First-class honours (top 10% preferred)',
    deadline: 'October – January (annually)',
    highlights: [
      '100% tuition fee waiver covered across European university consortium',
      'Monthly living allowance of €1,400 for up to 24 months',
      'Full travel and installation allowance included',
      'Study across at least 2 different European universities with joint degree'
    ],
    eligibility: [
      'Completed Bachelor’s degree in related field before program start',
      'Proficiency in English (IELTS 7.0+ or TOEFL 95+)',
      'High academic record and strong international adaptability'
    ],
    proTip: 'Check the Erasmus Mundus Catalogue early. Many consortia partner with premier German TU9 universities (TUM, RWTH Aachen, TU Dresden).',
    officialUrl: 'https://erasmus-plus.ec.europa.eu/',
    featured: true
  },
  {
    id: 'heinrich-boell',
    name: 'Heinrich Böll Foundation Scholarships',
    organization: 'Heinrich-Böll-Stiftung (Sustainability & Human Rights)',
    category: 'civic',
    amount: 'Up to €992 / month + €300 book grant',
    period: 'Standard study period',
    degreeLevels: ["Master's", "PhD"],
    gpaRequirement: 'Excellent grades + proven civic engagement',
    deadline: 'March 1 and September 1 annually',
    highlights: [
      'Basic monthly grant calculated according to BAföG rules (up to €992/mo)',
      'Lump-sum monthly study allowance of €300 for books & materials',
      'Extensive non-material support: summer academies, seminars, mentoring',
      'Worldwide alumni network in sustainability, NGOs, and environmental research'
    ],
    eligibility: [
      'International students enrolled or admitted to a German public university',
      'Proof of German language proficiency (minimum B2/C1 for most interviews)',
      'Demonstrated commitment to ecological sustainability and democracy'
    ],
    proTip: 'You must prepare for an in-depth German interview testing your awareness of current European and global environmental policy.',
    officialUrl: 'https://www.boell.de/en/scholarships',
    featured: false
  },
  {
    id: 'friedrich-ebert',
    name: 'Friedrich Ebert Foundation (FES) International Grants',
    organization: 'Friedrich-Ebert-Stiftung (Social Democracy)',
    category: 'civic',
    amount: '€992 / month + Health Insurance',
    period: 'Standard study duration',
    degreeLevels: ["Bachelor's", "Master's", "PhD"],
    gpaRequirement: 'Top 10–15% academic grades',
    deadline: 'Rolling (April 30 for Winter, October 31 for Summer)',
    highlights: [
      'Monthly grant of €992 for Master’s candidates',
      'Subsidy for statutory health insurance contributions (~€145/mo)',
      'Individual liaison lecturer support at your specific German university',
      'Comprehensive seminar program on social equality and labor rights'
    ],
    eligibility: [
      'Admission to a state-recognized university in Germany',
      'Proficiency in German language (Goethe B2 / TestDaF 4 minimum)',
      'Active alignment with social democratic values or community volunteering'
    ],
    proTip: 'FES accepts applications once you are enrolled in Germany with at least 1 semester remaining.',
    officialUrl: 'https://www.fes.de/studienfoerderung',
    featured: false
  }
];

export const MajorScholarshipsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredScholarships = SCHOLARSHIPS_DATA.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'fully-funded' && item.category === 'fully-funded') ||
      (selectedCategory === 'partial' && item.category === 'partial') ||
      (selectedCategory === 'civic' && item.category === 'civic') ||
      (selectedCategory === 'masters' && item.degreeLevels.includes("Master's"));

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.proTip.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="major-scholarships" className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" data-reveal>
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--lp-red)]">
          Curated Directory
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--lp-ink)] font-normal tracking-tight">
          Major Scholarships for <em className="italic text-[var(--lp-red)] font-serif">International Students</em>
        </h2>
        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed">
          Filter through verified government, merit, and foundation programs. Expand any card for exact criteria and application strategy.
        </p>
      </div>

      {/* Filter Bar & Search */}
      <div className="bg-[#faf8f3] rounded-2xl p-4 sm:p-5 border border-[#e5e0d3] flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          {[
            { id: 'all', label: 'All Grants' },
            { id: 'fully-funded', label: 'Fully Funded (€992+/mo)' },
            { id: 'partial', label: 'Merit (€300–€600)' },
            { id: 'civic', label: 'Foundation & Civic' },
            { id: 'masters', label: "Master's Focus" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-[var(--lp-ink)] text-white'
                  : 'bg-[#eae5db]/60 text-[var(--lp-muted)] hover:bg-[#eae5db] hover:text-[var(--lp-text)] border border-[#e5e0d3]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[var(--lp-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search DAAD, TUM, €992..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs font-medium bg-[#eae5db]/40 rounded-xl border border-[#e5e0d3] text-[var(--lp-text)] placeholder-[var(--lp-muted)] focus:outline-none focus:border-[var(--lp-red)] transition-colors"
          />
        </div>
      </div>

      {/* Scholarships Cards Grid */}
      <div className="space-y-4">
        {filteredScholarships.map((scholarship) => {
          const isExpanded = expandedId === scholarship.id;
          return (
            <div
              key={scholarship.id}
              className="bg-[#faf8f3] rounded-2xl p-6 sm:p-7 border border-[#e5e0d3] space-y-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Top Row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">
                      {scholarship.organization}
                    </span>
                    {scholarship.featured && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-[var(--lp-gold)] bg-[var(--lp-gold)]/10 px-2 py-0.5 rounded-full border border-[var(--lp-gold)]/20">
                        <Star className="w-3 h-3 fill-current" /> Top Pick
                      </span>
                    )}
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#eae5db] text-[var(--lp-text)] border border-[#e5e0d3]">
                      {scholarship.category === 'fully-funded' ? 'Full Funding' : 'Merit / Partial Aid'}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-normal text-[var(--lp-ink)] leading-snug">
                    {scholarship.name}
                  </h3>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <div className="font-serif text-xl sm:text-2xl font-normal text-[var(--lp-red)]">
                    {scholarship.amount}
                  </div>
                  <span className="text-[10px] font-mono text-[var(--lp-muted)] block">
                    Duration: {scholarship.period}
                  </span>
                </div>
              </div>

              {/* Requirement Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#e5e0d3] text-xs">
                <div className="flex items-center gap-2 text-[var(--lp-muted)]">
                  <Award className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0" />
                  <span><strong className="text-[var(--lp-text)]">Academic Profile:</strong> {scholarship.gpaRequirement}</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--lp-muted)]">
                  <Clock className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0" />
                  <span><strong className="text-[var(--lp-text)]">Deadline:</strong> {scholarship.deadline}</span>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">
                  Key Benefits &amp; Allowances:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {scholarship.highlights.slice(0, 4).map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[var(--lp-text)]">
                      <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                      <span className="text-[11px] text-[var(--lp-muted)] leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expandable Accordion */}
              {isExpanded && (
                <div className="space-y-4 pt-4 border-t border-[#e5e0d3]">
                  {/* Eligibility */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-[var(--lp-text)] uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[var(--lp-red)]" /> Eligibility Criteria
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {scholarship.eligibility.map((item, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] text-xs text-[var(--lp-muted)] flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--lp-red)] shrink-0 mt-1.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Advisor Pro Tip */}
                  <div className="bg-[#eae5db]/60 border-l-2 border-[var(--lp-gold)] p-4 rounded-xl space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--lp-text)]">
                      <Lightbulb className="w-3.5 h-3.5 text-[var(--lp-gold)]" /> Advisor Strategy Note
                    </div>
                    <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
                      {scholarship.proTip}
                    </p>
                  </div>
                </div>
              )}

              {/* Bottom Action Footer */}
              <div className="pt-3 border-t border-[#e5e0d3] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => toggleExpand(scholarship.id)}
                  className="text-xs font-semibold text-[var(--lp-red)] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                >
                  {isExpanded ? (
                    <>
                      <span>Show Less Details</span>
                      <ChevronUp className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <span>View Full Eligibility &amp; Strategy Note</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <div className="flex items-center gap-3">
                  {scholarship.officialUrl && (
                    <a
                      href={scholarship.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[var(--lp-text)] bg-[#eae5db] hover:bg-[#e0dad0] inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  <Link
                    href="/tools/admission-chance"
                    className="px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-[var(--lp-ink)] hover:bg-[var(--lp-red)] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Check Profile Fit</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
