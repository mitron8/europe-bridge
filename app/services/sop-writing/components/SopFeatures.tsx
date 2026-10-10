"use client";
import React from 'react';
import { Award, Clock, ClipboardList, FileText, CheckCircle2, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';

export const SopFeatures = () => {
  const features = [
    {
      icon: PenTool,
      title: "100% Personalized Content",
      desc: "Each SOP is crafted from scratch based on your unique academic transcript, capstone projects, work experience, and specific German university goals. Zero templates."
    },
    {
      icon: Award,
      title: "German Admissions Specialists",
      desc: "Written by editors with firsthand experience in German higher education admissions (TU9, Excellence Universities, and Applied Sciences UAS)."
    },
    {
      icon: Clock,
      title: "Quick Turnaround (3 Days or 24h)",
      desc: "First draft delivered within 3 working days on Standard orders, or within 1 working day (24 hours) on Express orders for tight deadlines."
    },
    {
      icon: ClipboardList,
      title: "Comprehensive Academic Alignment",
      desc: "We cover every essential dimension: prerequisite module connections, research interests, faculty laboratories, and long-term career trajectory in Germany."
    },
    {
      icon: FileText,
      title: "Plagiarism-Free & Turnitin-Checked",
      desc: "100% authentic, human-written content guaranteed to pass university Turnitin, Uni-Assist, and AI detection filters without generic clichés."
    },
    {
      icon: CheckCircle2,
      title: "Two Full Student Review Rounds",
      desc: "Delivered as a live, collaborative Google Doc. Add line-by-line comments, ask questions, and request revisions until you are completely satisfied."
    }
  ];

  return (
    <section id="features" className="py-12 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-black uppercase tracking-widest text-germany-red">
            Engineered For German Admits
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            What You Get With EuropeBridge SOP Writing
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Everything you need for an authentic, academically rigorous Statement of Purpose that stands out to German faculty.
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
                  <span>University-Specific &amp; Plagiarism-Free</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
