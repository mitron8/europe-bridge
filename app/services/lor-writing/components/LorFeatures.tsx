"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileEdit, Award, Zap, CheckCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';

const FEATURES = [
  {
    icon: Users,
    title: 'Two Complete LORs Included',
    description: 'Get two fully customized recommendations in one package. Choose 2 Academic LORs or 1 Academic + 1 Professional LOR to cover all your university prerequisites.',
    badge: 'Standard Bundle'
  },
  {
    icon: FileEdit,
    title: 'Personalized & Evidence-Based',
    description: 'Our questionnaire captures specific courses, project titles, lab experiments, deliverables, and metrics so your recommenders sound genuinely familiar with your work.',
    badge: 'Tailored Content'
  },
  {
    icon: Award,
    title: 'German Academic Caliber',
    description: 'Calibrated to the objective, fact-focused tone expected by German university Prüfungsausschuss (admissions boards) without hollow American-style hyperbole.',
    badge: 'German Standards'
  },
  {
    icon: Zap,
    title: 'Fast Turnaround Guarantee',
    description: 'Receive both drafted LORs in your inbox within 3 working days. In a crunch before the uni-assist deadline? Opt for 24-hour Express delivery.',
    badge: '3 Days or 24h Express'
  },
  {
    icon: CheckCheck,
    title: 'Two Full Review Rounds',
    description: 'Collaborate directly via Google Docs. Add inline comments, suggest tweaks to wording, and our writers refine both drafts through two complete review cycles.',
    badge: '2 Rounds Included'
  },
  {
    icon: ShieldCheck,
    title: '100% Original & Plagiarism-Free',
    description: 'Zero generic templates or copy-pasted phrases. Every letter is crafted from scratch to pass Turnitin checks and preserve your academic integrity.',
    badge: 'Authentic Tone'
  }
];

export const LorFeatures = () => {
  return (
    <section id="features" className="py-20 px-6 lg:px-12 bg-amber-50/20 relative">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Why EuropeBridge LORs Stand Out</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-germany-black font-display tracking-tight">
            Designed for What German <span className="text-germany-red">Professors Value</span>
          </h2>
          <p className="text-base text-gray-600 font-medium leading-relaxed">
            Most generic recommendation letters get ignored because they lack concrete academic evidence. We craft specific, persuasive letters that professors are proud to sign and committees respect.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                className="neu-card p-8 bg-white border border-gray-100 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-germany-red flex items-center justify-center group-hover:bg-germany-red group-hover:text-white transition-colors duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-extrabold px-3 py-1 bg-gray-100 text-gray-600 rounded-full uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-germany-black pt-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center gap-2 text-xs font-bold text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Guaranteed quality for both letters</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
