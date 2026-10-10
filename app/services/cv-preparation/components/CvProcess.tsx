"use client";
import React from 'react';
import { CreditCard, Send, FileEdit, MessageSquare, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const CvProcess = () => {
  const steps = [
    {
      step: 1,
      icon: CreditCard,
      title: "Order & Plan Selection",
      desc: "Choose Standard (2-3 days) or Express (24 hours) and specify your target application type (Master’s, Bachelor’s, Ausbildung, or Job)."
    },
    {
      step: 2,
      icon: Send,
      title: "Intake Questionnaire",
      desc: "Share your academic history, graduation dates, coursework, internships, technical competencies, and any transition/gap periods."
    },
    {
      step: 3,
      icon: FileEdit,
      title: "Expert Lebenslauf Drafting",
      desc: "Our German admissions editors structure your two-column Tabellarischer Lebenslauf, calibrate ECTS modules, and format for ATS parsers."
    },
    {
      step: 4,
      icon: MessageSquare,
      title: "Review & Refinement",
      desc: "Receive your initial draft as a Google Doc or marked-up PDF. Leave comments and request adjustments across included review rounds."
    },
    {
      step: 5,
      icon: CheckCircle2,
      title: "Final Submission-Ready Delivery",
      desc: "Get your finalized vector PDF ready for immediate uni-assist/portal upload, plus editable Word (.docx) source file for your records."
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
            How The CV Preparation Process Works
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            From raw marksheet data and project notes to a polished, German-standard Tabellarischer Lebenslauf.
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
