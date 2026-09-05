"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, Search, Filter, CheckCircle2, DollarSign, Calendar, 
  ExternalLink, Sparkles, GraduationCap, Clock, AlertCircle, ChevronDown, ChevronUp, BookOpen
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
    organization: 'Federal Ministry of Education (BMBF) + Private Corporate Donors',
    category: 'partial',
    amount: '€300 / month tax-free',
    period: '2 Semesters (renewable up to standard study period)',
    degreeLevels: ["Bachelor's", "Master's"],
    gpaRequirement: 'Top 10–20% of department (German GPA ≤ 1.8 preferred)',
    deadline: 'Varies by university (typically June–August for Winter semester)',
    highlights: [
      '€150 from federal government matched by €150 from companies (BMW, Siemens, BASF)',
      'Open to all nationalities and degree subjects without quotas',
      'Does not count toward statutory income limits or BAföG',
      'Direct access to corporate mentorship, internships, and networking galas',
      'Can be held concurrently with student jobs (HiWi / Werkstudent)'
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
      'Demonstrated commitment to democracy, social justice, or governance'
    ],
    proTip: 'You can apply to up to two priority Master’s programs under Helmut-Schmidt. Your statement of motivation must rank both and explain specific alignment with public administration.',
    officialUrl: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/helmut-schmidt-programme/',
    featured: false
  },
  {
    id: 'erasmus-plus',
    name: 'Erasmus Mundus Joint Master Degrees (EMJM)',
    organization: 'European Commission (EU)',
    category: 'fully-funded',
    amount: '€1,400 / month + 100% Tuition Waiver',
    period: '12 to 24 Months (Multi-country Mobility)',
    degreeLevels: ["Master's"],
    gpaRequirement: 'Outstanding academic standing (German equivalent ≤ 1.7)',
    deadline: 'December – February for following autumn intake',
    highlights: [
      'Full participation costs (tuition fees, lab fees, insurance) covered 100%',
      'Monthly subsistence allowance of €1,400 per month throughout the degree',
      'Full travel and installation allowance included',
      'Study across at least 2 different European universities with dual/joint degree'
    ],
    eligibility: [
      'Completed Bachelor’s degree in related field before program start',
      'Proficiency in English (IELTS 7.0+ or TOEFL 95+)',
      'High academic record and strong international adaptability'
    ],
    proTip: 'Check the Erasmus Mundus Catalogue early. Many consortia partner with premier German TU9 universities (TUM, RWTH Aachen, TU Dresden) alongside other top European institutions.',
    officialUrl: 'https://erasmus-plus.ec.europa.eu/',
    featured: true
  },
  {
    id: 'heinrich-boell',
    name: 'Heinrich Böll Foundation Scholarships',
    organization: 'Heinrich-Böll-Stiftung (Green / Ecology Foundation)',
    category: 'civic',
    amount: 'Up to €992 / month + €300 book money',
    period: 'Standard period of study (Regelstudienzeit)',
    degreeLevels: ["Master's", "PhD"],
    gpaRequirement: 'Excellent grades + proven social/political engagement',
    deadline: 'March 1 and September 1 annually',
    highlights: [
      'Basic monthly grant calculated according to BAföG rules (up to €992/mo)',
      'Lump-sum monthly study allowance of €300 for books & materials',
      'Extensive non-material support: political summer academies, seminars, mentoring',
      'Worldwide alumni network in sustainability, NGOs, and environmental research'
    ],
    eligibility: [
      'International students enrolled or admitted to a German public university',
      'Proof of German language proficiency (minimum B2/C1 for most interviews)',
      'Demonstrated commitment to ecological sustainability, democracy, and human rights'
    ],
    proTip: 'You must prepare for an in-depth German interview testing your awareness of current European and global environmental policy and democratic issues.',
    officialUrl: 'https://www.boell.de/en/scholarships',
    featured: false
  },
  {
    id: 'friedrich-ebert',
    name: 'Friedrich Ebert Foundation (FES) International Grants',
    organization: 'Friedrich-Ebert-Stiftung (Social Democracy Foundation)',
    category: 'civic',
    amount: '€992 / month + Health Insurance Support',
    period: 'Standard study duration',
    degreeLevels: ["Bachelor's", "Master's", "PhD"],
    gpaRequirement: 'Top 10–15% academic grades',
    deadline: 'Rolling (April 30 for Winter, October 31 for Summer)',
    highlights: [
      'Monthly grant of €992 for Master’s candidates',
      'Subsidy for statutory health insurance contributions (approx. €145/mo)',
      'Individual liaison lecturer support at your specific German university',
      'Comprehensive seminar program on social equality and labor rights'
    ],
    eligibility: [
      'Admission to a state or state-recognized university in Germany',
      'Proficiency in German language (Goethe B2 / TestDaF 4 minimum)',
      'Active alignment with social democratic values, trade unions, or community volunteerism'
    ],
    proTip: 'FES does not accept applications from first-semester students who have not yet arrived in Germany. You can apply once enrolled with at least 1 semester remaining.',
    officialUrl: 'https://www.fes.de/studienfoerderung',
    featured: false
  },
  {
    id: 'konrad-adenauer',
    name: 'Konrad-Adenauer-Stiftung (KAS) Fellowships',
    organization: 'Konrad-Adenauer-Stiftung (Christian Democratic Foundation)',
    category: 'civic',
    amount: '€992 / month + Family & Insurance Allowance',
    period: 'Up to 24 Months',
    degreeLevels: ["Master's", "PhD"],
    gpaRequirement: 'Outstanding grades (top 15%)',
    deadline: 'July 15 annually (Central international portal)',
    highlights: [
      'Financial stipend of €992 per month for Master’s students',
      'Health and long-term care insurance subsidy',
      'High-profile alumni network in German industry, politics, and research',
      'Exclusive leadership seminars in Berlin and Bonn'
    ],
    eligibility: [
      'Undergraduate degree with superior grades',
      'B2 level German language proficiency certificate',
      'Active record of civic, voluntary, or religious social responsibility'
    ],
    proTip: 'KAS has selection committees active in select international offices (including New Delhi). Applying through local country selection rounds offers significantly higher conversion rates.',
    officialUrl: 'https://www.kas.de/en/web/begabtenfoerderung',
    featured: false
  },
  {
    id: 'stibet-grants',
    name: 'STIBET Graduation & Emergency Grants',
    organization: 'DAAD funded, administered directly by German Universities',
    category: 'partial',
    amount: '€400 to €850 / month',
    period: '3 to 6 Months (During Final Thesis Period)',
    degreeLevels: ["Bachelor's", "Master's"],
    gpaRequirement: 'Good progress toward thesis completion',
    deadline: 'Rolling deadlines set by your university International Office (Akademisches Auslandsamt)',
    highlights: [
      'Direct cash grant during the demanding master’s thesis semester',
      'Designed to reduce part-time work pressure so you can graduate with top honors',
      'Simple, localized application process directly with university advisors',
      'Emergency hardship funds also available for unforeseen financial crunches'
    ],
    eligibility: [
      'Registered international student within 1-2 semesters of graduation',
      'Registered thesis with university examination board (Prüfungsamt)',
      'No other full scholarship active concurrently'
    ],
    proTip: 'Every German public university gets annual STIBET funding from the DAAD. Contact your International Office (AAA) right when you register your Master’s thesis to apply.',
    officialUrl: 'https://www.daad.de/en/information-services-for-higher-education-institutions/programmes-for-heis/stibet/',
    featured: false
  },
  {
    id: 'bavaria-grant',
    name: 'Bavarian State International Student Grants (Bayerische Stipendien)',
    organization: 'Bavarian Ministry of Science and the Arts',
    category: 'partial',
    amount: '€300 to €600 / month (or one-off grant)',
    period: '1 to 2 Semesters',
    degreeLevels: ["Bachelor's", "Master's"],
    gpaRequirement: 'Satisfactory to good academic standing',
    deadline: 'Set by Bavarian universities (TUM, LMU, FAU, Uni Passau)',
    highlights: [
      'Aimed specifically at international students studying in the State of Bavaria',
      'Supports high-performing students facing sudden financial distress',
      'High approval rate for actively enrolled students who submit clear bank statements'
    ],
    eligibility: [
      'Enrolled at a Bavarian public higher education institution',
      'Completed at least 1 semester in Bavaria with valid credits (ECTS)',
      'Demonstrated financial need'
    ],
    proTip: 'Particularly valuable for students at TUM (Technical University of Munich) and LMU Munich where living costs are higher than other German federal states.',
    officialUrl: 'https://www.stmwk.bayern.de/',
    featured: false
  }
];

export const MajorScholarshipsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('daad-epos');

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
    <section id="major-scholarships" className="py-12 px-6 lg:px-12 relative">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Curated Directory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Major Scholarships for International Students
          </h2>
          <p className="text-base text-gray-700 font-medium leading-relaxed">
            Filter through verified government, national, and foundation grants. Click any scholarship card to inspect exact eligibility rules, financial coverage, and insider application advice.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="neu-card p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            {[
              { id: 'all', label: 'All Grants' },
              { id: 'fully-funded', label: 'Fully Funded (€992+/mo)' },
              { id: 'partial', label: 'Monthly Merit (€300–€600)' },
              { id: 'civic', label: 'Foundation & Civic' },
              { id: 'masters', label: "Master's Programs" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-germany-red text-white shadow-md'
                    : 'bg-cream text-gray-700 hover:bg-gray-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search DAAD, TUM, €992..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="neu-input w-full pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-germany-red/30"
            />
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-bold text-gray-500 px-1">
          <span>Showing {filteredScholarships.length} of {SCHOLARSHIPS_DATA.length} major scholarship programs</span>
          <span className="text-germany-red">Updated for 2026/2027 Academic Cycles</span>
        </div>

        {/* Scholarships Cards Grid */}
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence>
            {filteredScholarships.map((scholarship) => {
              const isExpanded = expandedId === scholarship.id;
              return (
                <motion.div
                  key={scholarship.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className={`neu-card p-6 sm:p-8 transition-all duration-300 relative ${
                    scholarship.featured ? 'border-2 border-red-300/80 bg-gradient-to-br from-[#FDFBF7] to-red-50/20' : ''
                  }`}
                >
                  {/* Top Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                          {scholarship.organization}
                        </span>
                        {scholarship.featured && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-white bg-germany-red px-2.5 py-0.5 rounded-full shadow-sm">
                            <Sparkles className="w-3 h-3" /> Top Pick
                          </span>
                        )}
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          scholarship.category === 'fully-funded'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-900'
                        }`}>
                          {scholarship.category === 'fully-funded' ? 'Full Funding' : 'Merit / Partial Aid'}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-germany-black">
                        {scholarship.name}
                      </h3>
                    </div>

                    {/* Amount & Period Pill */}
                    <div className="sm:text-right shrink-0 bg-emerald-50/80 border border-emerald-200/80 px-4 py-2.5 rounded-2xl shadow-inner">
                      <div className="text-xs text-emerald-800 font-bold uppercase tracking-wider">Coverage</div>
                      <div className="text-lg font-black text-emerald-700">{scholarship.amount}</div>
                      <div className="text-[11px] text-gray-500 font-medium">{scholarship.period}</div>
                    </div>
                  </div>

                  {/* Summary Metric Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                      <GraduationCap className="w-4 h-4 text-germany-red shrink-0" />
                      <span><strong>Degrees:</strong> {scholarship.degreeLevels.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                      <Award className="w-4 h-4 text-amber-600 shrink-0" />
                      <span><strong>GPA Cutoff:</strong> {scholarship.gpaRequirement}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                      <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                      <span><strong>Deadline:</strong> {scholarship.deadline}</span>
                    </div>
                  </div>

                  {/* Key Highlights Bullet points */}
                  <div className="space-y-2 mb-4">
                    <div className="text-xs font-extrabold text-germany-black uppercase tracking-wider">
                      Financial & Non-Material Perks:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {scholarship.highlights.slice(0, 4).map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expandable Details Accordion */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 pt-4 border-t border-gray-200/70 overflow-hidden"
                      >
                        {/* Eligibility Criteria */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-black text-germany-black uppercase tracking-wider flex items-center gap-1.5">
                            <BookOpen className="w-4 h-4 text-germany-red" /> Eligibility & Prerequisites
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {scholarship.eligibility.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-gray-600 font-medium bg-cream/70 p-2 rounded-xl">
                                <span className="w-1.5 h-1.5 rounded-full bg-germany-red shrink-0 mt-1.5" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Counselor Pro Tip Box */}
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-xl space-y-1">
                          <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-900 uppercase tracking-wider">
                            <Sparkles className="w-4 h-4 text-amber-600" /> EuropeBridge Counselor Insight
                          </div>
                          <p className="text-xs text-amber-950 font-medium leading-relaxed">
                            {scholarship.proTip}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bottom Action Footer */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => toggleExpand(scholarship.id)}
                      className="text-xs font-extrabold text-germany-red hover:text-red-700 flex items-center gap-1 cursor-pointer"
                    >
                      {isExpanded ? (
                        <>
                          <span>Show Less Details</span>
                          <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <span>View Full Eligibility & Counselor Pro-Tip</span>
                          <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-3">
                      {scholarship.officialUrl && (
                        <a
                          href={scholarship.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="neu-btn px-4 py-2 text-xs font-bold text-gray-700 hover:text-germany-black inline-flex items-center gap-1.5"
                        >
                          <span>Official Portal</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <Link
                        href="/#cta"
                        className="neu-btn-primary px-4 py-2 text-xs font-bold inline-flex items-center gap-1"
                      >
                        <span>Check Profile Fit</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
