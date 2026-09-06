"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Landmark, Users, Building, CheckCircle2, Award, ArrowRight, ShieldCheck, HeartHandshake, Briefcase, FileText } from 'lucide-react';

export const DeutschlandstipendiumDeepDive = () => {
  const steps = [
    {
      step: '01',
      title: 'Secure Admission / Enrolment',
      desc: 'You can apply as an incoming 1st-semester student with your official admission letter or as a continuing student with your transcript of records.'
    },
    {
      step: '02',
      title: 'Check University-Specific Deadlines',
      desc: 'Each German university runs its own call for applications. Most portals open between June 1 and July 31 for the upcoming Winter semester.'
    },
    {
      step: '03',
      title: 'Prepare Compelling Evidence of Engagement',
      desc: 'Gather your transcript, CV, and tangible certificates of volunteering, clubs, tutoring, hackathons, or personal obstacles overcome.'
    },
    {
      step: '04',
      title: 'Draft a Targeted Motivation Letter',
      desc: 'Explain how the €300/month stipend and corporate mentor network will help you advance your academic goals and contribute to the university community.'
    }
  ];

  return (
    <section id="deutschlandstipendium" className="py-12 px-6 lg:px-12 bg-cream/50 relative">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-xs font-black uppercase tracking-wider">
            <Landmark className="w-4 h-4 text-amber-700" />
            <span>Germany’s National Merit Program</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            The Deutschlandstipendium Deep Dive
          </h2>
          <p className="text-base text-gray-700 font-medium leading-relaxed">
            Over 30,000 students across Germany receive €300 per month through this public-private partnership. Here is how international students can successfully win it.
          </p>
        </div>

        {/* 50/50 Concept Visual Card */}
        <div className="neu-card p-6 sm:p-8 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-germany-red flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4" /> The 50 / 50 Funding Formula
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-germany-black">
                Half from the Federal Government. Half from Industry Giants.
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                The German Federal Ministry of Education and Research (BMBF) provides €150/month, which is matched 1:1 by private donors, alumni, and major corporate sponsors such as <strong>Siemens, BMW, Bosch, BASF, and Deutsche Bank</strong>.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-white/80 p-3.5 rounded-xl border border-gray-100 shadow-sm">
                  <div className="text-xs font-extrabold text-germany-red">€300 / Month</div>
                  <div className="text-xs text-gray-600 font-medium mt-1">Paid directly to your German bank account, 100% tax-free.</div>
                </div>
                <div className="bg-white/80 p-3.5 rounded-xl border border-gray-100 shadow-sm">
                  <div className="text-xs font-extrabold text-germany-black">No Nationality Quota</div>
                  <div className="text-xs text-gray-600 font-medium mt-1">Open equally to domestic and international students.</div>
                </div>
                <div className="bg-white/80 p-3.5 rounded-xl border border-gray-100 shadow-sm">
                  <div className="text-xs font-extrabold text-amber-700">Non-Monetary Network</div>
                  <div className="text-xs text-gray-600 font-medium mt-1">Direct access to corporate mentors and exclusive internships.</div>
                </div>
              </div>
            </div>

            {/* Visual Formula Block */}
            <div className="lg:col-span-5 bg-gradient-to-br from-red-50 to-amber-50 p-6 rounded-2xl border border-red-100 text-center space-y-4 shadow-inner">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500">Monthly Grant Structure</div>
              <div className="flex items-center justify-center gap-3">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex-1">
                  <div className="text-lg font-black text-germany-red">€150</div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase">Federal State</div>
                </div>
                <span className="text-xl font-black text-gray-400">+</span>
                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex-1">
                  <div className="text-lg font-black text-amber-600">€150</div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase">Private Industry</div>
                </div>
                <span className="text-xl font-black text-gray-400">=</span>
                <div className="bg-germany-black text-white p-3 rounded-xl shadow-md flex-1">
                  <div className="text-lg font-black text-amber-400">€300</div>
                  <div className="text-[10px] text-gray-300 font-bold uppercase">To You / Mo</div>
                </div>
              </div>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Awarded for at least <strong>two consecutive semesters (1 full year)</strong>. Most universities allow renewal throughout your standard study period.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Evaluation */}
        <div className="space-y-4">
          <h3 className="text-xl font-black text-germany-black text-center sm:text-left">
            How Selection Committees Score Your Application
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="neu-card p-6 space-y-3 border-t-4 border-t-germany-red">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-germany-red">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-base font-black text-germany-black">1. Academic Performance</h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Your previous bachelor’s grade, high school marks, or first semester university credits. A German GPA of 1.0 to 1.9 positions you in the top candidate bracket.
              </p>
            </div>

            <div className="neu-card p-6 space-y-3 border-t-4 border-t-amber-500">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-base font-black text-germany-black">2. Social & Civic Engagement</h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Volunteering in NGOs, student council participation, teaching underprivileged children, environmental work, or athletic leadership.
              </p>
            </div>

            <div className="neu-card p-6 space-y-3 border-t-4 border-t-germany-black">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-germany-black">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-black text-germany-black">3. Overcoming Personal Adversity</h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                First-generation university student (First-Gen), refugee background, caring for family dependents, or overcoming financial and physical challenges.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Steps to Apply */}
        <div className="neu-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-germany-black">
              4-Step Application Checklist
            </h3>
            <span className="text-xs font-extrabold text-germany-red">Apply Directly at Your University</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((item, idx) => (
              <div key={idx} className="bg-white/80 p-4 rounded-2xl border border-gray-200/60 space-y-2 relative">
                <span className="text-2xl font-black text-germany-red/30 block">{item.step}</span>
                <h4 className="text-sm font-bold text-germany-black">{item.title}</h4>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
