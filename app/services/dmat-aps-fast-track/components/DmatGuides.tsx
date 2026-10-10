"use client";
import React from 'react';
import { FileText, Download, ExternalLink, BookOpen, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const DmatGuides = () => {
  return (
    <section id="dmat-guides" className="py-8 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 space-y-6 bg-gradient-to-b from-white to-amber-50/20 border border-amber-200">
        <div className="space-y-2 max-w-3xl">
          <div className="text-xs font-black uppercase tracking-widest text-amber-800">
            Free Official Resources
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">
            Prefer to Do It Yourself?
          </h2>
          <p className="text-sm text-gray-600 font-medium leading-relaxed">
            Both preparation resources are completely free to read and download without signing up. One walks through the official portal screens, while the other is the exam maker&apos;s own preparation curriculum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {/* Guide 1 */}
          <motion.a 
            href="https://www.d-mat.de/en/dmat-in-india/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs hover:shadow-md transition-all flex items-start gap-4 group"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-germany-red flex items-center justify-center font-bold border border-red-100 shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-germany-black text-base group-hover:text-germany-red transition-colors flex items-center gap-1.5">
                  <span>dMAT Registration Walkthrough</span>
                  <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                </h3>
              </div>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Step-by-step guidance on every screen of the booking flow, from picking your Indian test centre to paying the 150 EUR exam fee to g.a.s.t.
              </p>
              <span className="inline-block text-[11px] font-bold text-gray-400 uppercase tracking-wider pt-1">
                Official g.a.s.t. Portal Guide
              </span>
            </div>
          </motion.a>

          {/* Guide 2 */}
          <motion.a 
            href="https://www.d-mat.de/wp-content/uploads/2026/08/260804_dMAT_General-Academic-Module_Preparatoy-Materials_EN.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs hover:shadow-md transition-all flex items-start gap-4 group"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold border border-amber-100 shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-germany-black text-base group-hover:text-amber-800 transition-colors flex items-center gap-1.5">
                  <span>Official dMAT Preparation Booklet</span>
                  <Download className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                </h3>
              </div>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                The exam maker&apos;s own prep material for the General Academic Module (for Indian applicants). Sample logic questions with worked solutions.
              </p>
              <span className="inline-block text-[11px] font-bold text-gray-400 uppercase tracking-wider pt-1">
                PDF · g.a.s.t. / TestDaF Institute
              </span>
            </div>
          </motion.a>
        </div>

        <div className="pt-2 text-xs text-gray-500 font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-gray-400 shrink-0" />
          <span>The dMAT is operated by g.a.s.t. / TestDaF Institute. Always confirm live seat availability directly on d-mat.de.</span>
        </div>
      </div>
    </section>
  );
};
