"use client";

import React from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  Globe, 
  Award, 
  ArrowRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';

export const EUBlueCardSection = () => {
  const benefits = [
    {
      title: 'Permanent Residence in 21 Months',
      desc: 'With B1-level German, qualify for an unlimited settlement permit (Niederlassungserlaubnis) in just 21 months of Blue Card employment (or 27 months with A1 German).',
      icon: Award,
      badge: 'Fastest in Europe'
    },
    {
      title: 'Job Change Freedom After 12 Months',
      desc: 'After 12 months with your initial sponsoring employer, you can freely switch companies anywhere in Germany without seeking prior consent from the foreigners’ authority.',
      icon: TrendingUp,
      badge: 'Maximum Mobility'
    },
    {
      title: 'Unrestricted Spousal Work Rights',
      desc: 'Your spouse is granted an immediate residence permit with 100% unrestricted employment authorization in Germany. No prior German language exam is required for the spouse visa.',
      icon: Users,
      badge: 'Family Friendly'
    },
    {
      title: 'EU-Wide Mobility',
      desc: 'After holding the Blue Card in Germany for 12 months, you can move to another EU member state for qualified employment under simplified transfer procedures.',
      icon: Globe,
      badge: 'Schengen Advantage'
    },
  ];

  const applicationSteps = [
    {
      step: '01',
      title: 'Qualifying Employment Contract',
      desc: 'Secure a job offer with an annual gross salary meeting the minimum threshold (€45,934.20 for recent grads) in a field corresponding to your university degree.'
    },
    {
      step: '02',
      title: 'Erklärung zum Beschäftigungsverhältnis',
      desc: 'Have your employer fill out the official Federal Employment Agency form declaring job duties, working hours, and salary terms.'
    },
    {
      step: '03',
      title: 'Ausländerbehörde Application',
      desc: 'Submit your degree certificate, employment contract, job description, health insurance certificate, and passport to your municipal immigration office.'
    },
    {
      step: '04',
      title: 'Electronic Residence Title (eAT)',
      desc: 'Following review (typically 2–4 weeks), provide biometric fingerprints and receive your EU Blue Card valid for the contract duration + 3 months (up to 4 years).'
    }
  ];

  return (
    <section id="section-blue-card" className="py-12 px-6 lg:px-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-[52px] items-center justify-center rounded-2xl bg-white border border-[#EBE7E0] shadow-sm shrink-0">
            <CreditCard className="w-7 h-7 text-germany-red" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-germany-red mb-1">
              <span>Section 02</span>
              <span>•</span>
              <span>§18g AufenthG</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-germany-black font-display">
              The EU Blue Card (Blaue Karte EU) 2026
            </h2>
          </div>
        </div>

        {/* 2026 Thresholds Table Card */}
        <div className="neu-card p-6 lg:p-8 bg-white space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EBE7E0] pb-4">
            <div>
              <h3 className="text-lg font-black text-germany-black font-display flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-germany-red" />
                <span>Official 2026 Gross Annual Salary Thresholds</span>
              </h3>
              <p className="text-xs text-gray-500 font-semibold mt-1">
                Updated in accordance with the German Federal Ministry of the Interior and Community
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black self-start md:self-auto">
              ✓ Lower Barrier for Recent Graduates
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-[#EBE7E0] text-xs font-black uppercase tracking-wider text-gray-500">
                  <th className="py-3 px-4">Applicant Category</th>
                  <th className="py-3 px-4">Minimum Gross Annual Salary</th>
                  <th className="py-3 px-4">Monthly Equivalent</th>
                  <th className="py-3 px-4">Who Qualifies?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE7E0] text-xs font-bold text-gray-700">
                <tr className="bg-amber-50/40 hover:bg-amber-50/80 transition-colors">
                  <td className="py-4 px-4 font-black text-germany-black">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                      Recent University Graduates
                    </span>
                  </td>
                  <td className="py-4 px-4 font-black text-germany-red text-sm">
                    €45,934.20
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    approx. €3,827.85/mo
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    Graduated within the last 3 years from a recognized university (any field)
                  </td>
                </tr>

                <tr className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-4 font-black text-germany-black">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                      Shortage Occupations (MINT / STEM)
                    </span>
                  </td>
                  <td className="py-4 px-4 font-black text-germany-black text-sm">
                    €45,934.20
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    approx. €3,827.85/mo
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    Software engineers, data scientists, mechanical/electrical engineers, doctors
                  </td>
                </tr>

                <tr className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-4 font-black text-germany-black">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-400 shrink-0" />
                      Standard Occupations
                    </span>
                  </td>
                  <td className="py-4 px-4 font-black text-germany-black text-sm">
                    €50,700.00
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    approx. €4,225.00/mo
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    Experienced professionals with degrees older than 3 years in non-shortage fields
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-500 font-medium leading-relaxed">
            * <em>Note:</em> The reduced threshold of <strong>€45,934.20</strong> applies to almost all international graduates from German universities because your degree was awarded within the preceding 36 months!
          </p>
        </div>

        {/* 4 Core Blue Card Perks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div key={idx} className="neu-card p-6 bg-white space-y-3 hover:translate-y-[-2px] transition-transform shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-germany-red" />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                    {b.badge}
                  </span>
                </div>
                <h4 className="text-sm font-black text-germany-black font-display">{b.title}</h4>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Application Steps */}
        <div className="neu-card p-6 lg:p-8 bg-white space-y-6">
          <div className="flex items-center justify-between border-b border-[#EBE7E0] pb-3">
            <h3 className="text-lg font-black text-germany-black font-display flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-germany-red" />
              <span>4 Steps to Convert Your Student Permit to an EU Blue Card</span>
            </h3>
            <span className="text-xs font-bold text-gray-400">Processing: 2–4 weeks</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {applicationSteps.map((s, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0] space-y-2 relative">
                <span className="text-2xl font-black text-germany-red/30 font-display block">
                  {s.step}
                </span>
                <h4 className="text-xs font-black text-germany-black">{s.title}</h4>
                <p className="text-[11px] text-gray-600 font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
