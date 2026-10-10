"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ClipboardList, Clock, Award, CheckCircle2, ShieldCheck, Zap, Layers } from 'lucide-react';

const FEATURES = [
  {
    icon: FileText,
    title: 'Targeted German Formatting',
    description: 'Formatted strictly according to German Tabellarischer Lebenslauf conventions, Europass guidelines, and modern ATS-compliant layouts favored by uni-assist and TU9 universities.',
    badge: 'German Standard'
  },
  {
    icon: ClipboardList,
    title: 'Application-Focused Content',
    description: 'Tailored to highlight your core engineering coursework, laboratory projects, and prerequisite ECTS modules matching your specific target Master’s or job role.',
    badge: 'Curriculum Aligned'
  },
  {
    icon: Award,
    title: 'Professional Terminology',
    description: 'Written in crisp, professional English or German with authoritative phrasing (e.g., Abschlussarbeit, Werkstudenten-Tätigkeit) that reflects academic and engineering maturity.',
    badge: 'Expert Phrasing'
  },
  {
    icon: Clock,
    title: 'Quick Turnaround (2-3 Days)',
    description: 'Receive your initial CV draft within 2 to 3 working days after completing the background intake. In a hurry before a deadline? Choose our 24-hour Express delivery.',
    badge: 'Standard or 24h Express'
  },
  {
    icon: ShieldCheck,
    title: 'Lückenlos (Zero Unexplained Gaps)',
    description: 'We proactively structure and document all educational and career transition periods so admissions officers and visa consulates have zero questions about inactive time.',
    badge: 'Gap Analysis'
  },
  {
    icon: Layers,
    title: 'PDF & Editable Word Formats',
    description: 'Delivered in high-resolution, vector-formatted PDF ready for uni-assist upload, plus fully editable Word/DOCX source files for future career updates.',
    badge: 'Dual Formats'
  }
];

export const CvFeatures = () => {
  return (
    <section id="features" className="py-20 px-6 lg:px-12 bg-amber-50/20 relative">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Why EuropeBridge CVs Stand Out</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-germany-black font-display tracking-tight">
            Everything You Need for a <span className="text-germany-red">Winning Lebenslauf</span>
          </h2>
          <p className="text-base text-gray-600 font-medium leading-relaxed">
            A generic resume can cost you your dream German university admission or student job. We engineer your CV to meet the exact standards expected by German faculty and recruiters.
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
                  <span>Guaranteed German standard compliance</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
