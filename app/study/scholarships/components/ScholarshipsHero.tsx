"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, Calendar, CheckCircle2, ArrowRight, ShieldCheck, DollarSign, BookOpen, GraduationCap } from 'lucide-react';

export const ScholarshipsHero = () => {
  const [degreeLevel, setDegreeLevel] = useState<'masters' | 'bachelors' | 'phd'>('masters');
  const [germanGpaTier, setGermanGpaTier] = useState<'top' | 'good' | 'average'>('top');

  // Interactive recommendation generator
  const getRecommendation = () => {
    if (degreeLevel === 'masters') {
      if (germanGpaTier === 'top') {
        return {
          title: "Prime Candidate: DAAD EPOS & Deutschlandstipendium",
          coverage: "€300 - €992 / month + Full Tuition Waiver",
          probability: "High Probability (Top 15%)",
          description: "With a German GPA ≤ 1.9, you qualify for Germany's most competitive fully-funded grants like DAAD EPOS/Helmut-Schmidt and national merit grants.",
          tag: "Full & High Merit Funding"
        };
      } else if (germanGpaTier === 'good') {
        return {
          title: "Strong Contender: Deutschlandstipendium & Foundation Grants",
          coverage: "€300 - €650 / month",
          probability: "Moderate to High",
          description: "German universities co-fund 50% with private partners (Siemens, BMW, Bosch). Pair this with strong SOP/civic engagement for political foundation grants.",
          tag: "Merit & Civic Grants"
        };
      } else {
        return {
          title: "Target Track: STIBET Grants, HiWi Roles & Erasmus+",
          coverage: "€450 - €800 / month (Via On-Campus Research)",
          probability: "Accessible After Enrolling",
          description: "German public university tuition remains €0. Focus on university international office grants (STIBET) and on-campus research assistant (HiWi) contracts.",
          tag: "On-Campus & University Aid"
        };
      }
    } else if (degreeLevel === 'phd') {
      return {
        title: "Doctoral Track: DAAD Research Grants & TV-L E13 Positions",
        coverage: "€1,300 - €2,800 / month (Often Salaried)",
        probability: "High for Qualified Proposals",
        description: "German PhD candidates frequently receive paid research associate positions (Wissenschaftliche Mitarbeiter) or fully-funded DAAD doctoral fellowships.",
        tag: "Salaried / Full Fellowship"
      };
    } else {
      return {
        title: "Undergraduate Track: Deutschlandstipendium & Foundation Grants",
        coverage: "€300 - €650 / month",
        probability: "Selective Merit-Based",
        description: "Public university bachelor's programs are tuition-free. International undergraduates can compete for Deutschlandstipendium starting from their 1st or 2nd semester.",
        tag: "Merit & Semester Aid"
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <section className="pt-28 pb-12 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-red-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-5 left-10 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-500">
          <Link href="/" className="hover:text-germany-red transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#our-process" className="hover:text-germany-red transition-colors">Study</Link>
          <span>/</span>
          <span className="text-germany-black font-extrabold">Scholarships & Funding</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>German Scholarships & Grants Guide 2026</span>
            </div>

            <div className="flex items-start gap-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-germany-black leading-tight tracking-tight font-display flex-1">
                Scholarships & Funding for <span className="text-germany-red">Germany</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
              German public universities already charge <strong>zero tuition fees</strong>. Secure a scholarship or research grant on top, and your European Master’s or degree becomes virtually <strong>100% self-funded</strong>.
            </p>

            {/* At a Glance Box */}
            <div className="neu-card p-6 border-l-4 border-l-germany-red relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-widest text-germany-red flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Funding Landscape At A Glance
                </span>
                <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Updated May 2026
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                Over <strong className="text-germany-black">30,000 international students</strong> in Germany receive monthly financial aid. While the visa office requires proof of <strong className="text-germany-red">€11,904/year (€992/month)</strong>, top scholarships like DAAD provide up to €992/month plus full health insurance, travel subsidies, and study allowances.
              </p>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-gray-200/60">
                <div>
                  <div className="text-xs text-gray-500 font-semibold">DAAD Full Grants</div>
                  <div className="text-base font-black text-germany-black">~€992/mo</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold">Deutschlandstip.</div>
                  <div className="text-base font-black text-germany-black">€300/mo</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold">HiWi Lab Jobs</div>
                  <div className="text-base font-black text-germany-black">€13.5 - €18/hr</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold">Lead Time</div>
                  <div className="text-base font-black text-germany-black">9–15 Months</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Interactive Scholarship Matcher Widget */}
          <div className="lg:col-span-5">
            <motion.div
              className="neu-card p-6 sm:p-8 space-y-5 border border-amber-100 relative"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center text-germany-red shadow-inner">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-germany-black text-lg">Scholarship Matcher</h3>
                  <p className="text-xs text-gray-500 font-medium">Find which funding streams fit your profile</p>
                </div>
              </div>

              {/* Degree Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">
                  Target Degree Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'masters', label: "Master's" },
                    { id: 'bachelors', label: "Bachelor's" },
                    { id: 'phd', label: "PhD / Doc" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setDegreeLevel(item.id as any)}
                      className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                        degreeLevel === item.id
                          ? 'bg-germany-black text-white shadow-md'
                          : 'bg-cream text-gray-700 hover:bg-gray-200/60'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* German GPA / Academic Standing */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">
                  Academic Standing (German Scale)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'top', label: "Top (1.0 - 1.9)", desc: "> 80% / 8.5+ CGPA" },
                    { id: 'good', label: "Good (2.0 - 2.5)", desc: "70% - 79%" },
                    { id: 'average', label: "Average (> 2.5)", desc: "< 70%" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setGermanGpaTier(item.id as any)}
                      className={`p-2 text-left rounded-xl transition-all cursor-pointer ${
                        germanGpaTier === item.id
                          ? 'bg-germany-red text-white shadow-md'
                          : 'bg-cream text-gray-700 hover:bg-gray-200/60'
                      }`}
                    >
                      <div className="text-[11px] font-extrabold">{item.label}</div>
                      <div className={`text-[9px] ${germanGpaTier === item.id ? 'text-red-100' : 'text-gray-400'}`}>
                        {item.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Result Card */}
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 space-y-2 shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded-full">
                    {recommendation.tag}
                  </span>
                  <span className="text-xs font-bold text-germany-red">{recommendation.probability}</span>
                </div>
                <h4 className="text-sm font-black text-germany-black">{recommendation.title}</h4>
                <div className="text-xs font-extrabold text-emerald-700 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>{recommendation.coverage}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  {recommendation.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="#major-scholarships"
                  className="neu-btn-primary py-2.5 px-4 text-xs font-bold w-full text-center flex items-center justify-center gap-1.5"
                >
                  <span>Explore Available Scholarships</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
