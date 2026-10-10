"use client";
import React from 'react';
import { 
  FileText, 
  MessageSquare, 
  ClipboardList, 
  Layers, 
  Clock, 
  CheckCircle2, 
  Award 
} from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: FileText,
    title: "Standard 2-Page Course SOP",
    description: "Tailored to your specific target German university curriculum, detailing your motivation, coursework prerequisites, and career goals."
  },
  {
    icon: MessageSquare,
    title: "Two Distinct LORs",
    description: "Academic, professional, or balanced (1 academic + 1 professional), endorsing your technical competence and individual contributions."
  },
  {
    icon: ClipboardList,
    title: "Europass Tabellarischer CV",
    description: "Formatted in the clean reverse-chronological tabular style demanded by German admissions committees, limited strictly to 2 pages."
  },
  {
    icon: Layers,
    title: "Drafted Together for Consistency",
    description: "All three documents are created in sync so your projects, dates, tools, and technical milestones align seamlessly without contradictory claims."
  },
  {
    icon: Clock,
    title: "Quick Turnaround (3–5 Days or 48h)",
    description: "First draft delivery in 3 to 5 working days for Standard orders, or 1 to 2 working days (48 hours) for Express deadlines."
  },
  {
    icon: CheckCircle2,
    title: "Two Review Rounds Per Document",
    description: "Round 1 handles structural and narrative enhancements; Round 2 handles final precision polish via collaborative Google Docs."
  }
];

export const BundleFeatures = () => {
  return (
    <section id="features" className="py-14 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-black uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Complete Application Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            What You Get in the Bundle
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Everything you need for a competitive, synchronized application package submitted to German public universities.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="neu-card p-6 border-2 border-gray-200 bg-white relative flex flex-col justify-between hover:border-gray-300 transition-all shadow-sm"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-germany-red flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-germany-black font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-500">
                  <span>EuropeBridge Bundle</span>
                  <span className="text-green-600">✓ Included</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
