"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, AlertCircle, CheckCircle } from 'lucide-react';

export const DeadlinesTimeline = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const timelineSteps = [
    { month: "12–14 Months Before", title: "Research & Language Prep", desc: "Select target courses, check prerequisite ECTS credits, register & begin preparation for IELTS/TOEFL or German B2/C1 exams." },
    { month: "10–12 Months Before", title: "Standardized Exams & APS", desc: "Appear for IELTS/TOEFL. Initiate APS document submission (India/China) immediately as APS verification takes 2–3 months." },
    { month: "8–10 Months Before", title: "Shortlisting & LORs", desc: "Finalize your shortlist of 8–10 German universities. Request recommendation letters from professors or workplace supervisors." },
    { month: "6–8 Months Before", title: "SOP & Document Legalization", desc: "Draft tailored Statement of Purpose (SOP) letters. Notarize, translate, and obtain MEA Apostille on degree certificates." },
    { month: "4–6 Months Before", title: "Application Submission", desc: "Submit applications via uni-assist or direct university portals before target deadlines (July 15 for Winter, Jan 15 for Summer)." },
    { month: "2–3 Months Before", title: "Offer Letter & Blocked Account", desc: "Receive admission offers. Deposit €11,904 into an official German Blocked Account (Expatrio, Fintiba, Coracle)." },
    { month: "6–8 Weeks Before", title: "Visa Application & Travel", desc: "Book appointment and submit national student visa application via the German embassy digital portal. Secure flight & housing." },
  ];

  return (
    <section id="section-deadlines" className="py-12 px-6 lg:px-12 scroll-mt-24 bg-gradient-to-b from-transparent via-amber-50/30 to-transparent">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold shrink-0 shadow-sm">
              <Calendar className="w-6 h-6 text-indigo-700" />
            </div>
            <div>
              <span className="text-xs font-black uppercase text-germany-red tracking-wider">Requirement #4</span>
              <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">Application Deadlines &amp; Timeline</h2>
              <p className="text-sm text-gray-600 font-medium mt-1">
                German university admissions run on strict biannual intake cycles. Missing a deadline by 1 day means waiting 6 months.
              </p>
            </div>
          </div>
          <motion.img 
            src="/doodles/travel.png" 
            alt="Travel Deadline Doodle"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-sm shrink-0 hidden md:block"
            whileHover={{ scale: 1.1, rotate: -6 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Standard Deadlines Box */}
        <div className="neu-card p-6 sm:p-8 space-y-6">
          <h3 className="font-extrabold text-germany-black text-lg">Standard Biannual Intake Cutoffs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-red-50/60 border border-red-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-germany-red tracking-wider">Major Intake</span>
                <span className="text-xs font-extrabold text-red-700 bg-red-100 px-2 py-0.5 rounded">~85% Courses</span>
              </div>
              <h4 className="text-xl font-black text-germany-black font-display">Winter Semester (Wintersemester)</h4>
              <div className="space-y-1.5 text-xs text-gray-700 font-semibold">
                <div className="flex justify-between">
                  <span className="text-gray-500">Application Deadline:</span>
                  <span className="font-extrabold text-germany-red">July 15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Semester Start Date:</span>
                  <span className="font-bold text-germany-black">October 1</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-amber-900 tracking-wider">Secondary Intake</span>
                <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">~15% Courses</span>
              </div>
              <h4 className="text-xl font-black text-germany-black font-display">Summer Semester (Sommersemester)</h4>
              <div className="space-y-1.5 text-xs text-gray-700 font-semibold">
                <div className="flex justify-between">
                  <span className="text-gray-500">Application Deadline:</span>
                  <span className="font-extrabold text-germany-red">January 15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Semester Start Date:</span>
                  <span className="font-bold text-germany-black">April 1</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-100 text-xs text-gray-700 font-medium">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Crucial Exception:</strong> Top research universities like TU Munich (TUM), RWTH Aachen, and Heidelberg often close winter applications earlier between <strong>May 15 and May 31</strong>. Always verify exact portal dates!
            </span>
          </div>
        </div>

        {/* Interactive 12-Month Timeline */}
        <div className="neu-card p-6 sm:p-8 space-y-6">
          <h3 className="font-extrabold text-germany-black text-lg">Recommended 12-Month Preparation Roadmap</h3>
          <div className="space-y-3">
            {timelineSteps.map((step, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  activeStep === idx 
                    ? 'bg-white border-germany-red shadow-md ring-2 ring-red-100' 
                    : 'bg-gray-50/70 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                      activeStep === idx ? 'bg-germany-red text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {idx + 1}
                    </span>
                    <div>
                      <span className="text-[10px] font-black uppercase text-germany-red tracking-wider">{step.month}</span>
                      <h4 className="text-sm font-extrabold text-germany-black">{step.title}</h4>
                    </div>
                  </div>
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
                {activeStep === idx && (
                  <p className="text-xs text-gray-600 font-medium mt-3 pl-10 leading-relaxed border-t border-gray-100 pt-2">
                    {step.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
