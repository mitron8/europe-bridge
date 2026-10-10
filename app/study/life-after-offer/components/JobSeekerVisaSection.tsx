"use client";

import React from 'react';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  ShieldCheck, 
  Zap, 
  Briefcase, 
  ArrowRight,
  HelpCircle,
  CalendarCheck
} from 'lucide-react';
import Link from 'next/link';

export const JobSeekerVisaSection = () => {
  const steps = [
    {
      month: 'Month -6',
      title: 'Target Shortlist & German CV Build',
      desc: 'Localize your CV into the German tabellarischer Lebenslauf format with professional portrait. Start networking on LinkedIn and targeting Mittelstand and DAX employers.'
    },
    {
      month: 'Month -3',
      title: 'Active Interviews & Thesis Leverage',
      desc: 'Use your Master’s thesis or Werkstudent project as a direct audition. Most German employers finalize hiring budgets 3–4 months ahead of start dates.'
    },
    {
      month: 'Month -1',
      title: 'Prüfungsamt & Visa Appointment',
      desc: 'Request a provisional graduation confirmation (Vorläufige Bescheinigung) from your examination office. Schedule your Ausländerbehörde appointment early.'
    },
    {
      month: 'Month 0',
      title: 'Transition to §20 AufenthG or Blue Card',
      desc: 'Submit your degree completion proof. If you already have an offer, skip directly to the EU Blue Card (§18g); otherwise activate your 18-month search permit.'
    }
  ];

  const checklist = [
    { text: 'German University Degree Certificate or provisional graduation letter (Vorläufige Bescheinigung)', required: true },
    { text: 'Proof of secure livelihood (blocked account with €1,027/month or income from part-time work)', required: true },
    { text: 'Continuous statutory (TK, Barmer, DAK) or expat health insurance coverage', required: true },
    { text: 'Valid passport with at least 12–18 months remaining validity', required: true },
    { text: 'Proof of registered residential address (Meldebescheinigung)', required: true },
    { text: 'Biometric passport photographs adhering to German consulate guidelines', required: true },
  ];

  return (
    <section id="section-job-seeker" className="py-12 px-6 lg:px-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-[52px] items-center justify-center rounded-2xl bg-white border border-[#EBE7E0] shadow-sm shrink-0">
            <Clock className="w-7 h-7 text-germany-red" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-germany-red mb-1">
              <span>Section 01</span>
              <span>•</span>
              <span>§20 Paragraph 3 No. 1 AufenthG</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-germany-black font-display">
              The 18-Month Post-Study Job Seeker Visa
            </h2>
          </div>
        </div>

        {/* Intro text & summary card */}
        <div className="neu-card p-6 lg:p-8 bg-white space-y-6">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
            After completing your degree at a recognized German university, you are legally entitled to an <strong>18-month residence permit</strong> under <strong>§20 AufenthG</strong> to search for a position corresponding to your degree. Unlike the restrictive 60-day or 90-day grace periods in the US or UK, Germany gives you <strong>a full year and a half</strong> with zero limits on part-time jobs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0] space-y-1.5">
              <span className="text-xs font-black uppercase text-germany-red flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> 100% Work Freedom
              </span>
              <h3 className="text-sm font-black text-germany-black">Any job permitted while searching</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                You can work in hospitality, minijobs, retail, freelancing, or customer support without hourly caps to fund your living expenses.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0] space-y-1.5">
              <span className="text-xs font-black uppercase text-germany-red flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> Instant Conversion
              </span>
              <h3 className="text-sm font-black text-germany-black">Switch anytime to Blue Card</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                As soon as you sign an employment contract matching your academic qualification, you can immediately apply for the EU Blue Card.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0] space-y-1.5">
              <span className="text-xs font-black uppercase text-amber-600 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> Non-Extendable
              </span>
              <h3 className="text-sm font-black text-germany-black">Strict 18-Month Clock</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                The 18-month clock starts the day you receive your official final exam results, not the graduation ceremony date. Plan proactively!
              </p>
            </div>
          </div>
        </div>

        {/* 6-Month Timeline & Checklist Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: 6-Month Timeline */}
          <div className="lg:col-span-7 neu-card p-6 lg:p-8 bg-white space-y-6">
            <div className="flex items-center justify-between border-b border-[#EBE7E0] pb-3">
              <h3 className="text-lg font-black text-germany-black font-display flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-germany-red" />
                <span>Strategic 6-Month Transition Playbook</span>
              </h3>
              <span className="text-xs font-bold text-gray-500">Don&apos;t wait for graduation</span>
            </div>

            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0]/80">
                  <div className="px-3 py-1.5 rounded-xl bg-germany-black text-white text-xs font-black shrink-0 tracking-wider">
                    {step.month}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-germany-black">{step.title}</h4>
                    <p className="text-xs text-gray-600 font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Document Checklist */}
          <div className="lg:col-span-5 neu-card p-6 lg:p-8 bg-white space-y-6">
            <div className="flex items-center justify-between border-b border-[#EBE7E0] pb-3">
              <h3 className="text-lg font-black text-germany-black font-display flex items-center gap-2">
                <FileText className="w-5 h-5 text-germany-red" />
                <span>Required Documents Checklist</span>
              </h3>
              <span className="text-xs font-bold text-emerald-600">Ausländerbehörde</span>
            </div>

            <div className="space-y-3">
              {checklist.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs font-bold text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-red-50/80 border border-red-200/80 text-xs text-germany-red font-bold flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <strong>Crucial Timing Tip:</strong> Submit your application before your student visa expires. Once submitted, you receive a temporary certificate (<em>Fiktionsbescheinigung</em>) that keeps your legal stay active.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
