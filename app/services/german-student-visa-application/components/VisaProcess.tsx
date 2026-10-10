"use client";
import React from 'react';
import { FileText, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const VisaProcess = () => {
  const steps = [
    {
      step: 1,
      icon: FileText,
      title: "Place Your Order",
      desc: "Pick Premium (₹14,999) or Complete (₹19,999) plan, enter your contact information, and initiate your visa dossier."
    },
    {
      step: 2,
      icon: CheckCircle2,
      title: "Submit Documents & Admission",
      desc: "Receive our structured intake form to upload your German university admission letter, APS certificate, and passport copy."
    },
    {
      step: 3,
      icon: ShieldCheck,
      title: "CSP Registration & VIDEX Filing",
      desc: "We set up your profile on the German Consular Services Portal, complete your National Visa VIDEX, and audit all uploaded PDFs."
    },
    {
      step: 4,
      icon: Clock,
      title: "VFS Booking & Mock Interview",
      desc: "We secure your VFS biometrics appointment slot, audit your physical document sets, and conduct a 1:1 consular mock interview."
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
            How The Visa Application Service Works
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            From initial university offer letter to passport dispatch with your approved German National Visa.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <motion.div 
                key={idx}
                className="p-6 rounded-2xl bg-white border border-gray-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="w-8 h-8 rounded-full bg-germany-red text-white flex items-center justify-center text-xs font-black">
                      {st.step}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                      Step 0{st.step}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-red-50 text-germany-red flex items-center justify-center font-bold border border-red-100">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-extrabold text-germany-black text-lg">{st.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 text-[11px] font-bold text-gray-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  <span>Phase {st.step} of 4</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
