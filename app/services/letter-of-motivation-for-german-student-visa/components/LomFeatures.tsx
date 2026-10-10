"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, PenTool, Award, Clock, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';

const FEATURES = [
  {
    icon: FileText,
    title: 'Consulate-Ready Format',
    description: 'Addressed directly to your designated German Embassy or Consulate General, following the precise formal structure, tone, and legal declarations expected by German visa officers.',
    badge: 'Consular Standard'
  },
  {
    icon: PenTool,
    title: 'Personalized Profile Narrative',
    description: 'Crafted completely from scratch based on your unique academic records, target university curriculum, blocked account details, and realistic career progression.',
    badge: '100% Custom'
  },
  {
    icon: Award,
    title: 'German Visa Specialists',
    description: 'Drafted by senior editors with years of experience navigating German consular requirements and foreigners’ authority (Ausländerbehörde) assessment criteria.',
    badge: 'Expert Caliber'
  },
  {
    icon: Clock,
    title: 'Quick Turnaround (3 Days or 24h)',
    description: 'Receive your initial draft within 3 working days on our Standard plan. In a rush before your VFS biometrics slot? Choose 24-hour Express delivery.',
    badge: '3 Days or 24h'
  },
  {
    icon: MessageSquare,
    title: 'Two Student Review Rounds',
    description: 'Collaborate live on Google Docs. Major adjustments accommodated in round one, fine-tuning and polish in round two until you are 100% satisfied.',
    badge: '2 Rounds Included'
  },
  {
    icon: ShieldCheck,
    title: '100% Plagiarism-Free & Turnitin Verified',
    description: 'Zero AI clichés, templates, or recycled phrases. Every single letter passes Turnitin checks to protect your application and ensure absolute authenticity.',
    badge: 'Turnitin Verified'
  }
];

export const LomFeatures = () => {
  return (
    <section id="features" className="py-20 px-6 lg:px-12 bg-amber-50/20 relative">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Why EuropeBridge Visa LOMs Succeed</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-germany-black font-display tracking-tight">
            Designed for What German <span className="text-germany-red">Consulates Expect</span>
          </h2>
          <p className="text-base text-gray-600 font-medium leading-relaxed">
            German visa officers review hundreds of applications weekly. We craft a compelling, legally aligned Letter of Motivation that immediately satisfies their statutory checklist.
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
                  <span>Consulate compliance guarantee</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
