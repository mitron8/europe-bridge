"use client";
import React from 'react';
import { Target, Search, Link2, Clock, FileText, CheckCircle2, ShieldCheck, Compass, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export const ShortlistingFeatures = () => {
  const features = [
    {
      icon: Target,
      title: "Personalized Academic Matching",
      desc: "We analyze your exact bachelor transcript, syllabus modules, ECTS equivalents, GPA, and language test results to match you only to courses where you legitimately satisfy the admission prerequisites."
    },
    {
      icon: Search,
      title: "Comprehensive Search Coverage",
      desc: "Our research counselors search across DAAD, Uni-Assist databases, federal university registries, and hidden gem public universities across all 16 German states."
    },
    {
      icon: Link2,
      title: "Direct Application Links & Portals",
      desc: "Every single entry includes direct, live links to the official course description, module handbook, Uni-Assist portal, or direct university application form."
    },
    {
      icon: Clock,
      title: "Save 100+ Hours of Research",
      desc: "Avoid the overwhelming fatigue of sifting through thousands of German-language portals. Receive a structured, ready-to-apply dossier in 3 working days (or 24 hours Express)."
    },
    {
      icon: FileText,
      title: "ECTS Credit & Module Audit",
      desc: "German universities reject up to 68% of international applicants over missing bachelor credits. We cross-reference your transcript against each university's specific examination regulations (Prüfungsordnung)."
    },
    {
      icon: Layers,
      title: "Focus on Your Application Strategy",
      desc: "With a vetted, balanced list of 10 universities, you can invest all your energy into tailoring your Statement of Purpose (SOP) and CV rather than worrying about eligibility."
    }
  ];

  return (
    <section id="features" className="py-12 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-black uppercase tracking-widest text-germany-red">
            Verified University Matching
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            What You Get With EuropeBridge Shortlisting
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            A bespoke, eligibility-audited roadmap of 10 German universities tailored for maximum admission success.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div 
                key={idx}
                className="p-6 rounded-2xl bg-white border border-gray-200 shadow-2xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-germany-red flex items-center justify-center font-bold border border-red-100">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-germany-black text-lg">{feat.title}</h3>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-bold text-green-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span>100% Public &amp; Tuition-Free Programs</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
