"use client";
import React from 'react';
import { CreditCard, Send, Search, ClipboardList, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const ShortlistingProcess = () => {
  const steps = [
    {
      step: 1,
      icon: CreditCard,
      title: "Order & Payment",
      desc: "Choose between Standard (3-day) or Express (24-hour) turnaround and complete the brief order form."
    },
    {
      step: 2,
      icon: Send,
      title: "Submit Profile & Transcripts",
      desc: "Upload your undergraduate marksheet, degree certificate, IELTS/TOEFL scores, and preferred fields/cities in our secure intake form."
    },
    {
      step: 3,
      icon: Search,
      title: "Expert Research & ECTS Audit",
      desc: "Our advisors cross-reference your completed modules with official German exam regulations (Prüfungsordnung) to verify prerequisite ECTS credits."
    },
    {
      step: 4,
      icon: ClipboardList,
      title: "Draft Delivery & Student Review",
      desc: "Receive your comprehensive 10-course shortlist via email. Request adjustments or course substitutions across 2 included review rounds."
    },
    {
      step: 5,
      icon: CheckCircle2,
      title: "Direct Application & Filing",
      desc: "Apply with certainty using our verified direct Uni-Assist or university portal links, deadlines, and tailored application checklists."
    }
  ];

  return (
    <section id="how-it-works" className="py-12 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-black uppercase tracking-widest text-germany-red">
            Step-by-Step Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            How Shortlisting Works
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            From initial transcript submission to verified portal links in as fast as 24 hours.
          </p>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-4">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <motion.div 
                key={idx}
                className="p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="w-7 h-7 rounded-full bg-germany-red text-white flex items-center justify-center text-xs font-black">
                      {st.step}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                      Step 0{st.step}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-red-50 text-germany-red flex items-center justify-center font-bold border border-red-100">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-extrabold text-germany-black text-base">{st.title}</h3>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100 text-[10px] font-bold text-gray-400">
                  Phase {st.step} of 5
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
