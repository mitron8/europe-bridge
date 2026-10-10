"use client";
import React from 'react';
import { 
  FileText, 
  Languages, 
  Users, 
  Clock, 
  FolderCheck, 
  CheckCircle2, 
  Award 
} from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: FileText,
    title: "Targeted Official Formatting",
    description: "Strictly aligned with German DIN 5008 business standards, official consulate headers, and VIDEX application reference placement."
  },
  {
    icon: Languages,
    title: "Professional Consular Phrasing",
    description: "Written in crisp, authoritative, and respectful consular terminology in formal English (or German for German-taught / Ausbildung paths)."
  },
  {
    icon: Users,
    title: "Application-Focused Synopsis",
    description: "Succinctly outlines your admitted degree, previous Bachelor's credentials, and exact academic objectives without unnecessary fluff."
  },
  {
    icon: Clock,
    title: "Guaranteed Quick Turnaround",
    description: "Standard delivery in 3 working days, or Express turnaround in 24 hours (1 working day) for upcoming VFS appointments."
  },
  {
    icon: FolderCheck,
    title: "Complete Appended Dossier Index",
    description: "Includes an itemized table of contents for all certificates, APS, Sperrkonto proof, and photos matching regional consulate rules."
  },
  {
    icon: CheckCircle2,
    title: "Two Student Review Rounds",
    description: "Collaborative draft review via Google Docs. Request adjustments and verify personal details across two complete revision cycles."
  }
];

export const CoverLetterFeatures = () => {
  return (
    <section id="features" className="py-14 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-black uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Consular Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            What You Get With EuropeBridge
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Everything you need for an authoritative, error-free Cover Letter that organizes your visa dossier and accelerates consular processing.
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
                  <span>EuropeBridge Standard</span>
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
