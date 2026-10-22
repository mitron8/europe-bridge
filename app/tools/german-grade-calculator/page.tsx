"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from "@/app/components/landing/LandingNavbar";
import Footer from "@/app/components/Footer";
import { StudyFAQ } from '@/app/study/components/StudyFAQ';
import { 
  Calculator, 
  HelpCircle, 
  CheckCircle2, 
  TrendingUp, 
  ArrowRight, 
  Award, 
  Info,
  GraduationCap,
  ShieldCheck,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface Preset {
  id: string;
  name: string;
  country: string;
  flag: string;
  max: number;
  minPass: number;
  defaultScore: number;
  step: number;
  unit: string;
  notes: string;
}

const PRESETS: Preset[] = [
  {
    id: 'india-cgpa-10',
    name: 'India 10-Point CGPA (Pass 4.0)',
    country: 'India',
    flag: '🇮🇳',
    max: 10.0,
    minPass: 4.0,
    defaultScore: 8.5,
    step: 0.01,
    unit: 'CGPA',
    notes: 'Standard at most Indian state, private, and central universities where 40% is the passing cutoff.'
  },
  {
    id: 'india-cgpa-10-pass5',
    name: 'India 10-Point CGPA (Pass 5.0)',
    country: 'India',
    flag: '🇮🇳',
    max: 10.0,
    minPass: 5.0,
    defaultScore: 8.2,
    step: 0.01,
    unit: 'CGPA',
    notes: 'Used at institutions (e.g. VTU, some autonomous colleges) where 50% is required to pass.'
  },
  {
    id: 'india-percentage-40',
    name: 'Percentage Scale (Pass 40%)',
    country: 'India',
    flag: '🇮🇳',
    max: 100,
    minPass: 40,
    defaultScore: 78,
    step: 0.1,
    unit: '%',
    notes: 'Traditional percentage system where 40% represents the minimum passing grade.'
  },
  {
    id: 'india-percentage-50',
    name: 'Percentage Scale (Pass 50%)',
    country: 'India',
    flag: '🇮🇳',
    max: 100,
    minPass: 50,
    defaultScore: 74,
    step: 0.1,
    unit: '%',
    notes: 'Common in engineering and professional degrees requiring 50% minimum passing mark.'
  },
  {
    id: 'us-gpa-4',
    name: 'US / Pakistan 4.0 GPA (Pass 2.0)',
    country: 'US / Pakistan',
    flag: '🇺🇸',
    max: 4.0,
    minPass: 2.0,
    defaultScore: 3.4,
    step: 0.01,
    unit: 'GPA',
    notes: 'Standard 4.0 grade point average system where 2.0 (C grade) is passing.'
  },
  {
    id: 'bangladesh-cgpa-4',
    name: 'Bangladesh 4.0 CGPA (Pass 2.0)',
    country: 'Bangladesh',
    flag: '🇧🇩',
    max: 4.0,
    minPass: 2.0,
    defaultScore: 3.5,
    step: 0.01,
    unit: 'CGPA',
    notes: 'National grading curriculum in Bangladesh where 2.0 represents minimum pass mark.'
  },
  {
    id: 'uk-honours',
    name: 'UK Honours Scale (Max 100, Pass 40)',
    country: 'UK',
    flag: '🇬🇧',
    max: 100,
    minPass: 40,
    defaultScore: 68,
    step: 0.5,
    unit: '%',
    notes: 'UK degree classification (70+ First Class, 60-69 2:1 Upper Second, 50-59 2:2, 40 pass).'
  },
  {
    id: 'custom',
    name: 'Custom Scale (Enter Your Own)',
    country: 'Custom',
    flag: '⚙️',
    max: 10.0,
    minPass: 4.0,
    defaultScore: 8.0,
    step: 0.01,
    unit: 'Score',
    notes: 'Manually specify the highest grade, passing grade, and your score from your transcript.'
  }
];

type CalculationResult =
  | {
      valid: true;
      raw: number;
      roundedOne: number;
      roundedTwo: number;
      classification: {
        label: string;
        en: string;
        description: string;
      };
    }
  | {
      valid: false;
      error: string;
    };

export default function GermanGradeCalculatorPage() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('india-cgpa-10');
  const [maxGrade, setMaxGrade] = useState<number>(10.0);
  const [minPassGrade, setMinPassGrade] = useState<number>(4.0);
  const [yourGrade, setYourGrade] = useState<number>(8.5);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handlePresetChange = (presetId: string) => {
    setSelectedPresetId(presetId);
    const p = PRESETS.find(x => x.id === presetId);
    if (p) {
      setMaxGrade(p.max);
      setMinPassGrade(p.minPass);
      setYourGrade(p.defaultScore);
    }
  };

  // Modified Bavarian Formula: 1 + 3 * ((Nmax - Nd) / (Nmax - Nmin))
  const calculation = useMemo<CalculationResult>(() => {
    if (maxGrade <= minPassGrade) {
      return { 
        valid: false, 
        error: 'Maximum grade must be strictly greater than minimum passing grade.' 
      };
    }

    if (isNaN(yourGrade)) {
      return { valid: false, error: 'Please enter a valid numeric grade.' };
    }

    let rawScore = 1 + 3 * ((maxGrade - yourGrade) / (maxGrade - minPassGrade));
    
    if (yourGrade > maxGrade) rawScore = 1.0;
    if (yourGrade < minPassGrade) rawScore = 5.0;

    const roundedOne = Math.round(rawScore * 10) / 10;
    const roundedTwo = Math.round(rawScore * 100) / 100;

    let classification = {
      label: 'Sehr Gut',
      en: 'Very Good / Outstanding',
      description: 'Outstanding academic performance. Highly competitive for top-tier TU9 universities (TUM, RWTH, TU Berlin, etc.).'
    };

    if (roundedOne > 1.5 && roundedOne <= 2.5) {
      classification = {
        label: 'Gut',
        en: 'Good / Above Average',
        description: 'Above-average performance. Fully eligible across most public German university Master’s programs.'
      };
    } else if (roundedOne > 2.5 && roundedOne <= 3.5) {
      classification = {
        label: 'Befriedigend',
        en: 'Satisfactory',
        description: 'Meets minimum academic standards. Eligible for Non-NC (open admission) Master’s and Universities of Applied Sciences.'
      };
    } else if (roundedOne > 3.5 && roundedOne <= 4.0) {
      classification = {
        label: 'Ausreichend',
        en: 'Sufficient / Passing Cutoff',
        description: 'Minimum pass cutoff in Germany. Highly competitive NC programs may be restricted; target universities with open admission.'
      };
    } else if (roundedOne > 4.0) {
      classification = {
        label: 'Nicht Ausreichend',
        en: 'Insufficient / Fail',
        description: 'Below the minimum German academic pass standard. Direct university admission is generally not possible.'
      };
    }

    return {
      valid: true,
      raw: rawScore,
      roundedOne,
      roundedTwo,
      classification
    };
  }, [maxGrade, minPassGrade, yourGrade]);

  const activePreset = PRESETS.find(p => p.id === selectedPresetId);

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
              <Link href="/tools" className="transition-colors hover:text-[#16161a]">
                Free Tools
              </Link>
              <ChevronRight className="h-3 w-3 opacity-60" />
              <span className="font-semibold text-[#16161a]">German Grade Calculator</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#dcd7cb] bg-[#f3efe6] px-3.5 py-1 text-[11.5px] sm:text-[12px] font-medium text-[#4a4740] shadow-2xs mb-3.5">
              <Calculator className="w-3.5 h-3.5 text-[#9e2a2b]" />
              <span className="font-semibold text-[#16161a]">Modified Bavarian Formula</span>
              <span className="text-[#9a958c]">|</span>
              <span>Official Uni-Assist &amp; KMK Standard</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-serif font-normal tracking-tight text-[#16161a] leading-[1.15]">
              German Grade Calculator. <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#9e2a2b]">Convert Your CGPA or Percentage.</span>
            </h1>

            <p className="mt-3.5 max-w-2xl mx-auto text-[14.5px] sm:text-[16px] text-[#5e5b54] leading-relaxed">
              Convert your domestic CGPA, percentage, or GPA onto the German 1.0 to 4.0 grading scale used by Uni-Assist and German public universities. In Germany, <strong>1.0 is the best</strong> and <strong>4.0 is passing</strong>.
            </p>
          </div>
        </section>

        {/* Interactive Tool Grid */}
        <section className="lp-container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form & Presets */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-2xl border border-[#e5e0d3] bg-white p-5 sm:p-7 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#ece7dd] pb-3 mb-5">
                  <h2 className="text-[16px] sm:text-[17px] font-serif font-bold text-[#16161a]">
                    Select Your Home Grading System
                  </h2>
                  <span className="text-[11px] font-medium text-[#787369]">
                    8 Verified Presets
                  </span>
                </div>

                {/* Preset Selector Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                  {PRESETS.map((p) => {
                    const isSelected = selectedPresetId === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handlePresetChange(p.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                          isSelected
                            ? 'bg-[#f4f1ea] border-[#16161a] text-[#16161a] font-bold shadow-2xs'
                            : 'bg-white border-[#e5e0d3] text-[#4a4740] hover:border-[#16161a]'
                        }`}
                      >
                        <span className="text-base shrink-0">{p.flag}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[12.5px] font-semibold truncate">{p.name}</p>
                          <p className="text-[10.5px] text-[#787369]">Pass: {p.minPass} {p.unit} · Max: {p.max}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {activePreset && (
                  <div className="mb-6 rounded-xl border border-[#ece7dd] bg-[#faf8f3] p-3 text-[12px] text-[#5e5b54]">
                    <strong>Note:</strong> {activePreset.notes}
                  </div>
                )}

                {/* Interactive Grade Inputs */}
                <div className="space-y-5 border-t border-[#ece7dd] pt-5">
                  {/* Your Grade Input */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-[12px] font-bold uppercase tracking-wider text-[#4a4740]">
                        Your Score / CGPA ({activePreset?.unit || 'Grade'})
                      </label>
                      <span className="text-[13px] font-bold text-[#9e2a2b]">
                        {yourGrade} {activePreset?.unit}
                      </span>
                    </div>
                    <input
                      type="number"
                      step={activePreset?.step || 0.01}
                      min={0}
                      max={maxGrade}
                      value={yourGrade}
                      onChange={(e) => setYourGrade(parseFloat(e.target.value) || 0)}
                      className="w-full rounded-xl border border-[#dcd7cb] bg-[#faf8f3] p-3 text-[16px] font-bold text-[#16161a] focus:border-[#16161a] focus:bg-white focus:outline-none transition-all"
                    />
                    <input
                      type="range"
                      min={minPassGrade}
                      max={maxGrade}
                      step={activePreset?.step || 0.01}
                      value={Math.min(Math.max(yourGrade, minPassGrade), maxGrade)}
                      onChange={(e) => setYourGrade(parseFloat(e.target.value))}
                      className="w-full mt-2 accent-[#16161a] cursor-pointer"
                    />
                  </div>

                  {/* Max & Pass Reference Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#787369] mb-1.5">
                        Maximum Possible Grade (Nmax)
                      </label>
                      <input
                        type="number"
                        step={activePreset?.step || 0.01}
                        value={maxGrade}
                        onChange={(e) => setMaxGrade(parseFloat(e.target.value) || 0)}
                        className="w-full rounded-xl border border-[#dcd7cb] bg-[#faf8f3] p-2.5 text-[14px] font-bold text-[#16161a] focus:border-[#16161a] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#787369] mb-1.5">
                        Minimum Passing Grade (Nmin)
                      </label>
                      <input
                        type="number"
                        step={activePreset?.step || 0.01}
                        value={minPassGrade}
                        onChange={(e) => setMinPassGrade(parseFloat(e.target.value) || 0)}
                        className="w-full rounded-xl border border-[#dcd7cb] bg-[#faf8f3] p-2.5 text-[14px] font-bold text-[#16161a] focus:border-[#16161a] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Formula & Mathematical Proof Breakdown */}
              <div className="rounded-2xl border border-[#e5e0d3] bg-white p-5 sm:p-6 shadow-sm">
                <h3 className="text-[14px] font-bold text-[#16161a] mb-2 flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-[#16161a]" />
                  Mathematical Calculation Breakdown
                </h3>
                <p className="text-[12px] text-[#5e5b54] mb-3">
                  Applied Formula: <code className="rounded bg-[#f4f1ea] px-1.5 py-0.5 font-bold text-[#16161a]">1 + 3 × ((Nmax - Nd) / (Nmax - Nmin))</code>
                </p>
                {calculation.valid && (
                  <div className="rounded-xl border border-[#ece7dd] bg-[#faf8f3] p-3 text-[12px] text-[#4a4740] font-mono leading-relaxed">
                    Grade = 1 + 3 × (({maxGrade} - {yourGrade}) / ({maxGrade} - {minPassGrade}))<br />
                    Grade = 1 + 3 × ({(maxGrade - yourGrade).toFixed(2)} / {(maxGrade - minPassGrade).toFixed(2)})<br />
                    Grade = <span className="font-bold text-[#16161a]">{calculation.roundedOne} (or {calculation.roundedTwo} unrounded)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Calculated Results */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-[#e5e0d3] bg-[#faf8f3] p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#e5e0d3] pb-3 mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#787369]">
                    Your German Academic Grade
                  </span>
                  <span className="text-[11px] text-[#787369]">German Scale 1.0 – 5.0</span>
                </div>

                {calculation.valid ? (
                  <>
                    <div className="text-center py-2 mb-6">
                      <div className="text-5xl sm:text-6xl font-serif font-bold text-[#16161a] tracking-tight">
                        {calculation.roundedOne.toFixed(1)}
                      </div>
                      <div className="text-[12px] text-[#787369] mt-1 font-mono">
                        Exact: {calculation.roundedTwo.toFixed(2)}
                      </div>

                      <div className="mt-4">
                        <span className="inline-block rounded-full bg-[#16161a] px-3.5 py-1 text-[12px] font-bold text-white shadow-2xs">
                          {calculation.classification.label} ({calculation.classification.en})
                        </span>
                      </div>

                      <p className="mt-4 text-[13px] text-[#5e5b54] leading-relaxed max-w-sm mx-auto">
                        {calculation.classification.description}
                      </p>
                    </div>

                    {/* Quick University Admission Fit */}
                    <div className="rounded-2xl border border-[#e5e0d3] bg-white p-4 text-[12.5px] mb-6 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[#787369]">TU9 Excellence Unis:</span>
                        <span className={`font-bold ${calculation.roundedOne <= 2.2 ? 'text-[#16161a]' : 'text-[#787369]'}`}>
                          {calculation.roundedOne <= 2.0 ? 'Highly Competitive' : calculation.roundedOne <= 2.4 ? 'Eligible' : 'Selective'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#787369]">Public Research Unis:</span>
                        <span className={`font-bold ${calculation.roundedOne <= 2.5 ? 'text-[#16161a]' : 'text-[#787369]'}`}>
                          {calculation.roundedOne <= 2.5 ? 'Eligible (NC & Open)' : 'Eligible (Open Admission)'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#787369]">Applied Sciences (HAW):</span>
                        <span className="font-bold text-[#16161a]">
                          {calculation.roundedOne <= 3.2 ? 'Direct Admission Fit' : 'Review Prerequisites'}
                        </span>
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="space-y-2.5">
                      <Link
                        href={`/courses?maxGpa=${calculation.roundedOne}`}
                        className="w-full rounded-xl bg-[#16161a] py-3 px-4 text-[13px] font-semibold flex items-center justify-center gap-2 text-white transition-all hover:bg-[#2e2e34] shadow-2xs"
                      >
                        <span>Filter Eligible Degrees ({calculation.roundedOne})</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>

                      <Link
                        href="/tools/admission-chance"
                        className="w-full rounded-xl border border-[#dcd7cb] bg-white py-2.5 px-4 text-[12.5px] font-semibold text-center block text-[#16161a] hover:bg-[#f7f5f0] transition-colors"
                      >
                        Calculate Overall 100-Point Profile Fit →
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="p-5 rounded-xl border border-[#e5e0d3] bg-white text-[#b4232f] text-[13px] font-medium">
                    {calculation.error}
                  </div>
                )}
              </div>

              {/* CGPA Reference Table */}
              <div className="rounded-2xl border border-[#e5e0d3] bg-white p-5 shadow-sm">
                <h4 className="text-[11.5px] font-bold uppercase tracking-wider text-[#787369] mb-3">
                  Indian 10-Point CGPA Conversion Table
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-[12px] text-left">
                    <thead>
                      <tr className="border-b border-[#ece7dd] text-[10.5px] text-[#9a958c] uppercase">
                        <th className="py-2 font-bold">Indian CGPA</th>
                        <th className="py-2 font-bold">German Grade</th>
                        <th className="py-2 font-bold">KMK Rating</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#ece7dd] text-[#4a4740]">
                      <tr><td className="py-2 font-semibold">9.5 – 10.0</td><td className="py-2 font-bold text-[#16161a]">1.0 – 1.2</td><td>Sehr Gut</td></tr>
                      <tr><td className="py-2 font-semibold">8.5 – 9.4</td><td className="py-2 font-bold text-[#16161a]">1.3 – 1.7</td><td>Sehr Gut / Gut</td></tr>
                      <tr><td className="py-2 font-semibold">7.5 – 8.4</td><td className="py-2 font-bold text-[#16161a]">1.8 – 2.2</td><td>Gut</td></tr>
                      <tr><td className="py-2 font-semibold">6.5 – 7.4</td><td className="py-2 font-bold text-[#16161a]">2.3 – 2.7</td><td>Gut / Befriedigend</td></tr>
                      <tr><td className="py-2 font-semibold">5.5 – 6.4</td><td className="py-2 font-bold text-[#16161a]">2.8 – 3.2</td><td>Befriedigend</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* FAQ Section */}
        <StudyFAQ
          id="faq"
          badge="Bavarian Formula FAQs"
          title="Frequently Asked Questions"
          subtitle="How the modified Bavarian formula works, grade cutoffs for TU9 programs, and VPD verification."
          faqs={[
            {
              q: "What is the Modified Bavarian Formula (Modifizierte bayerische Formel)?",
              a: "It is the standardized mathematical formula adopted by the Standing Conference of the Ministers of Education and Cultural Affairs (KMK) and Uni-Assist to convert international grades into the German 1.0 to 4.0 academic scale."
            },
            {
              q: "Why is a lower German grade better?",
              a: "In Germany, 1.0 is 'Sehr Gut' (the highest mark with distinction), 2.0 is 'Gut' (Good), 3.0 is 'Befriedigend' (Satisfactory), and 4.0 is 'Ausreichend' (the minimum passing cutoff). Any score higher than 4.0 is a fail."
            },
            {
              q: "What German grade do I need for competitive TU9 universities like TUM or RWTH Aachen?",
              a: "For restricted Master’s programs (NC / Numerus Clausus) such as Computer Science, top universities usually expect a German grade of 2.0 or better (approx 7.8–8.2+ CGPA in India). For non-NC programs, grades up to 2.5 or 3.0 are accepted if your subject credit prerequisites match."
            },
            {
              q: "Does Uni-Assist use this exact calculation?",
              a: "Yes. When Uni-Assist issues your VPD (Vorprüfungsdokumentation), they apply the Modified Bavarian Formula using the minimum passing cutoff officially confirmed on your university transcript."
            }
          ]}
        />

        {/* EuropeBridge Standard Footer */}
        <div className="relative z-[40]">
          <Footer />
        </div>
      </div>
    </main>
  );
}
