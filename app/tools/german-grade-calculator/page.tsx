"use client";

import React, { useState, useMemo } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
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
  ChevronDown
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
        color: string;
        description: string;
        badgeClass: string;
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

  // Switch preset
  const handlePresetChange = (presetId: string) => {
    setSelectedPresetId(presetId);
    const p = PRESETS.find(x => x.id === presetId);
    if (p) {
      setMaxGrade(p.max);
      setMinPassGrade(p.minPass);
      setYourGrade(p.defaultScore);
    }
  };

  // Modified Bavarian Formula calculation
  // Formula: 1 + 3 * ((Nmax - Nd) / (Nmax - Nmin))
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

    // Mathematical formula
    let rawScore = 1 + 3 * ((maxGrade - yourGrade) / (maxGrade - minPassGrade));
    
    // Bounds: Best possible is 1.0, worst passing is 4.0, failing is 5.0
    if (yourGrade > maxGrade) rawScore = 1.0;
    if (yourGrade < minPassGrade) rawScore = 5.0;

    const roundedOne = Math.round(rawScore * 10) / 10;
    const roundedTwo = Math.round(rawScore * 100) / 100;

    // Classification
    let classification = {
      label: 'Sehr Gut',
      en: 'Very Good / Excellent',
      color: 'emerald',
      description: 'Outstanding performance. Guaranteed eligibility for top-tier TU9 universities (TUM, RWTH, Heidelberg, etc.).',
      badgeClass: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
    };

    if (roundedOne > 1.5 && roundedOne <= 2.5) {
      classification = {
        label: 'Gut',
        en: 'Good',
        color: 'blue',
        description: 'Above-average performance. Highly competitive across most public German university programs.',
        badgeClass: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30'
      };
    } else if (roundedOne > 2.5 && roundedOne <= 3.5) {
      classification = {
        label: 'Befriedigend',
        en: 'Satisfactory',
        color: 'amber',
        description: 'Average performance. Eligible for non-restricted (NC-free) Master’s and Universities of Applied Sciences.',
        badgeClass: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
      };
    } else if (roundedOne > 3.5 && roundedOne <= 4.0) {
      classification = {
        label: 'Ausreichend',
        en: 'Sufficient / Pass',
        color: 'orange',
        description: 'Minimum passing standard in Germany. Selective Master’s admissions will be difficult; consider private or pathway programs.',
        badgeClass: 'bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30'
      };
    } else if (roundedOne > 4.0) {
      classification = {
        label: 'Nicht Ausreichend',
        en: 'Insufficient / Fail',
        color: 'red',
        description: 'Below the minimum German academic standard. Not eligible for admission.',
        badgeClass: 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30'
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
    <div className="min-h-screen neu-bg text-germany-black dark:text-white transition-colors duration-200">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 pb-10 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-germany-red/10 border border-germany-red/20 text-germany-red dark:text-[#FF6B7A] text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            Official Modified Bavarian Formula
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-germany-black dark:text-white">
            German Grade Calculator
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
            Accurately convert your CGPA, percentage, or GPA to the German 1.0–5.0 academic grading scale used by uni-assist and all German universities. (In Germany, <strong>1.0 is the best</strong> and <strong>4.0 is the pass cutoff</strong>).
          </p>
        </div>
      </section>

      {/* Main Interactive Tool Grid */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Inputs Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="neu-card p-6 sm:p-8 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800/80 shadow-md">
              <h2 className="text-lg font-bold font-display text-germany-black dark:text-white mb-5 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-germany-red"></span>
                Select Your Home Grading System
              </h2>

              {/* Preset Selector */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                  Country / Grading Standard
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PRESETS.map((p) => {
                    const isSelected = selectedPresetId === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handlePresetChange(p.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                          isSelected
                            ? 'bg-germany-red/5 dark:bg-germany-red/15 border-germany-red text-germany-black dark:text-white font-bold ring-1 ring-germany-red/30'
                            : 'bg-gray-50/70 dark:bg-[#0A0D14] border-gray-200/70 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700'
                        }`}
                      >
                        <span className="text-base shrink-0">{p.flag}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold truncate">{p.name}</p>
                          <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate">{p.country}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input Fields */}
              <div className="space-y-5 pt-2 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Your Obtained Score / Grade (N<sub>d</sub>) *
                    </label>
                    <span className="text-xs font-bold text-germany-red dark:text-[#FF6B7A]">
                      Scale: {minPassGrade} – {maxGrade}
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={isNaN(yourGrade) ? '' : yourGrade}
                      onChange={(e) => setYourGrade(parseFloat(e.target.value))}
                      step={activePreset?.step || 0.01}
                      min={0}
                      max={maxGrade * 1.2}
                      className="w-full px-4 py-3 neu-input text-base font-black rounded-xl bg-gray-50 dark:bg-[#0A0D14] border border-gray-200 dark:border-gray-800 focus:border-germany-red transition-all"
                      placeholder={`e.g. ${activePreset?.defaultScore}`}
                    />
                    <span className="absolute right-4 top-3.5 text-xs font-bold text-gray-400 uppercase">
                      {activePreset?.unit || 'Score'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                      Maximum Possible Grade (N<sub>max</sub>)
                    </label>
                    <input
                      type="number"
                      value={isNaN(maxGrade) ? '' : maxGrade}
                      onChange={(e) => setMaxGrade(parseFloat(e.target.value))}
                      step={0.1}
                      className="w-full px-3.5 py-2.5 neu-input text-xs font-bold rounded-xl bg-gray-50 dark:bg-[#0A0D14] border border-gray-200 dark:border-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                      Minimum Passing Grade (N<sub>min</sub>)
                    </label>
                    <input
                      type="number"
                      value={isNaN(minPassGrade) ? '' : minPassGrade}
                      onChange={(e) => setMinPassGrade(parseFloat(e.target.value))}
                      step={0.1}
                      className="w-full px-3.5 py-2.5 neu-input text-xs font-bold rounded-xl bg-gray-50 dark:bg-[#0A0D14] border border-gray-200 dark:border-gray-800"
                    />
                  </div>
                </div>

                {activePreset?.notes && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-2">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{activePreset.notes}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Formula Explanation Card */}
            <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800/80 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                Mathematical Formula Used by German Universities
              </h3>
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#0A0D14] font-mono text-xs sm:text-sm text-germany-black dark:text-white border border-gray-200/80 dark:border-gray-800 text-center font-bold">
                German Grade = 1 + 3 × [(N<sub>max</sub> - N<sub>d</sub>) / (N<sub>max</sub> - N<sub>min</sub>)]
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
                Where <strong>N<sub>max</sub></strong> is the highest possible grade, <strong>N<sub>min</sub></strong> is the lowest passing grade, and <strong>N<sub>d</sub></strong> is your obtained score. German scores range between 1.0 (highest honor) and 4.0 (lowest passing score). Grades above 4.0 represent a failing mark.
              </p>
            </div>
          </div>

          {/* Right Column: Output Card */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="neu-card p-6 sm:p-8 bg-white dark:bg-[#111622] border-2 border-germany-red/30 dark:border-germany-red/40 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-germany-black via-germany-red to-germany-gold" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Your German Equivalent Grade
                </span>
                <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400">
                  Lower is Better
                </span>
              </div>

              {calculation.valid ? (
                <>
                  {/* Big Grade Number */}
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-5xl sm:text-6xl font-black font-display text-germany-black dark:text-white tracking-tight">
                      {calculation.roundedOne.toFixed(1)}
                    </span>
                    <span className="text-xs font-bold text-gray-400">
                      (Exact: {calculation.roundedTwo.toFixed(2)})
                    </span>
                  </div>

                  {/* Classification Pill */}
                  <div className="mb-6">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-black uppercase tracking-wider ${calculation.classification?.badgeClass}`}>
                      <Award className="w-3.5 h-3.5" />
                      <span>{calculation.classification?.label}</span>
                      <span className="font-medium normal-case">({calculation.classification?.en})</span>
                    </div>
                  </div>

                  {/* Visual Grade Meter */}
                  <div className="mb-6 space-y-2">
                    <div className="flex justify-between text-[11px] font-bold text-gray-400">
                      <span className="text-emerald-500">1.0 (Best)</span>
                      <span>2.5 (Good)</span>
                      <span className="text-red-500">4.0 (Pass Cutoff)</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-rose-500 relative overflow-hidden p-0.5">
                      {/* Marker */}
                      <div 
                        className="h-full bg-white dark:bg-black rounded-full shadow-md w-2 -ml-1 transition-all duration-300"
                        style={{
                          marginLeft: `${Math.min(Math.max(((calculation.roundedOne - 1.0) / 3.0) * 100, 0), 100)}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* University Fit Guidance */}
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0A0D14] border border-gray-200/80 dark:border-gray-800 space-y-2 mb-6">
                    <h4 className="text-xs font-black uppercase tracking-wider text-germany-black dark:text-white flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-germany-red" />
                      Admission Outlook
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                      {calculation.classification?.description}
                    </p>
                  </div>

                  {/* Fast Action Buttons */}
                  <div className="space-y-2.5">
                    <Link
                      href="/tools/admission-chance"
                      className="w-full neu-btn-primary py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-transform text-white"
                    >
                      <TrendingUp className="w-4 h-4 text-germany-gold" />
                      Calculate Master&apos;s Admission Chances
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href="/study/requirements"
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center block text-gray-600 dark:text-gray-300 hover:text-germany-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                    >
                      View German Degree Requirements Guide →
                    </Link>
                  </div>
                </>
              ) : (
                <div className="p-6 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-bold">
                  {calculation.error}
                </div>
              )}
            </div>

            {/* Quick Conversion Reference Table */}
            <div className="neu-card p-5 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                Quick 10-Point CGPA Reference
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800 text-[10px] text-gray-400 uppercase">
                      <th className="py-1.5 font-bold">Indian CGPA</th>
                      <th className="py-1.5 font-bold">German Grade</th>
                      <th className="py-1.5 font-bold">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 font-medium">
                    <tr><td className="py-1.5 font-bold">9.5 – 10.0</td><td className="py-1.5 font-bold text-emerald-500">1.0 – 1.2</td><td>Sehr Gut</td></tr>
                    <tr><td className="py-1.5 font-bold">8.5 – 9.4</td><td className="py-1.5 font-bold text-emerald-500">1.3 – 1.7</td><td>Sehr Gut / Gut</td></tr>
                    <tr><td className="py-1.5 font-bold">7.5 – 8.4</td><td className="py-1.5 font-bold text-blue-500">1.8 – 2.2</td><td>Gut</td></tr>
                    <tr><td className="py-1.5 font-bold">6.5 – 7.4</td><td className="py-1.5 font-bold text-amber-500">2.3 – 2.7</td><td>Gut / Befriedigend</td></tr>
                    <tr><td className="py-1.5 font-bold">5.5 – 6.4</td><td className="py-1.5 font-bold text-amber-500">2.8 – 3.2</td><td>Befriedigend</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto pb-20">
        <h2 className="text-2xl font-black font-display text-germany-black dark:text-white mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {[
            {
              q: "What is the Modified Bavarian Formula (Modifizierte bayerische Formel)?",
              a: "It is the standardized mathematical formula adopted by the Standing Conference of the Ministers of Education and Cultural Affairs (KMK) and uni-assist to convert foreign grades into the German 1.0 to 4.0 academic scale."
            },
            {
              q: "Why is a lower German grade better?",
              a: "In the German university grading system, 1.0 is 'Sehr Gut' (the highest mark with distinction), 2.0 is 'Gut' (Good), 3.0 is 'Befriedigend' (Satisfactory), and 4.0 is 'Ausreichend' (the minimum passing cutoff). Any score worse than 4.0 is considered failing."
            },
            {
              q: "What German grade do I need for competitive TU9 universities like TUM or RWTH Aachen?",
              a: "For restricted Master’s programs (NC / Numerus Clausus) like Computer Science or Data Science, top universities usually require a German grade of 2.0 or better (equivalent to approximately 7.8–8.2+ CGPA in India). For non-NC programs, grades up to 2.5 or 3.0 are often accepted if you meet course credit prerequisites."
            },
            {
              q: "Does uni-assist use this exact calculation?",
              a: "Yes. When uni-assist issues your VPD (Vorprüfungsdokumentation), they apply the Modified Bavarian Formula using the minimum passing cutoff officially indicated on your university transcript or grading scale sheet."
            }
          ].map((faq, i) => (
            <div 
              key={i} 
              className="neu-card bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800/80 rounded-2xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-germany-black dark:text-white flex items-center justify-between cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-gray-600 dark:text-gray-300 font-medium leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
