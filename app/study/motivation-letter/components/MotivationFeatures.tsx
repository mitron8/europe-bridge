"use client";

import React from 'react';
import { FileText, UserCheck, Award, Clock, MessageSquare, CheckCircle2, ShieldCheck } from 'lucide-react';

export const MotivationFeatures = () => {
  const features = [
    {
      icon: FileText,
      badge: "Embassy Format",
      title: "Consulate-Ready Format",
      description:
        "A mandatory LOM addressed directly to the German consulate or embassy, structured exactly to consular standards under Section 16b AufenthG.",
      details: "Proper mission salutation, formal German administrative structure, and consular tone."
    },
    {
      icon: UserCheck,
      badge: "Tailored to You",
      title: "Personalized Content",
      description:
        "Each LOM is crafted from scratch based on your academic background, chosen program, university curriculum, and authentic career trajectory.",
      details: "Bridges your undergraduate thesis, research, and internships directly with the German modules."
    },
    {
      icon: Award,
      badge: "German Specialists",
      title: "Expert Visa Writers",
      description:
        "Drafted by senior writers thoroughly versed in German student visa jurisprudence, consular guidelines, and common rejection triggers.",
      details: "Knows how to frame gaps, course switches, and intent to return to satisfy visa officers."
    },
    {
      icon: Clock,
      badge: "Guaranteed SLA",
      title: "Quick Turnaround",
      description:
        "First draft delivered in 3 working days on the Standard plan, or accelerated to 24 hours on the Express plan.",
      details: "Perfect for students with approaching VFS Global appointment slots or CSP deadlines."
    },
    {
      icon: MessageSquare,
      badge: "Google Docs",
      title: "Two Student Review Rounds",
      description:
        "Collaborative feedback loop. Round 1 incorporates major structural modifications; Round 2 provides fine-tuning and linguistic polish.",
      details: "Delivered via live Google Doc with direct comment-driven iterations and tracked changes."
    },
    {
      icon: CheckCircle2,
      badge: "100% Original",
      title: "Plagiarism-Free Guarantee",
      description:
        "100% original human writing. Zero copy-pasting, zero generic templates, and zero detectable AI boilerplate.",
      details: "Strict originality standards with Turnitin/Copyscape verified uniqueness for your peace of mind."
    }
  ];

  return (
    <section id="section-features" className="py-16 px-6 lg:px-12 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Consulate Quality Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            What You Get with <span className="text-germany-red">EuropeBridge</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-700 font-medium">
            Unlike general SOPs written for university admissions, a Consular Visa Letter of Motivation has one single audience: the German consular officer determining your entry permission.
          </p>
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="neu-card p-6 flex flex-col justify-between hover:shadow-md transition-all duration-200 border border-gray-200/80 bg-white/90 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200/60 flex items-center justify-center text-germany-red group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                      {item.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-extrabold text-germany-black group-hover:text-germany-red transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-start gap-2 text-[11px] font-semibold text-gray-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item.details}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
