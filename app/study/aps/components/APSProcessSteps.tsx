"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ListOrdered, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export const APSProcessSteps = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      step: 1,
      title: "Online Registration",
      subtitle: "Create Account on Portal",
      desc: "Register on the official APS India portal (aps-india.de). Fill in personal details, high school scores, Bachelor's marks, and university roll numbers to receive your registration number."
    },
    {
      step: 2,
      title: "Fee Payment (INR 18,000)",
      subtitle: "CCAvenue / Bank Transfer",
      desc: "Pay the non-refundable APS verification fee of INR 18,000. CCAvenue gateway payments activate your account immediately; NEFT bank transfers require 48 hours for manual matching."
    },
    {
      step: 3,
      title: "Document Courier Submission",
      subtitle: "Dispatch to New Delhi",
      desc: "Print the registered APS application form, attach fee receipt, notarized copies of 10th/12th/degree mark sheets, and dispatch via Speed Post or courier to the APS office in Chanakyapuri, New Delhi."
    },
    {
      step: 4,
      title: "University Verification",
      subtitle: "Authenticity Verification",
      desc: "APS directly contacts your home university registrar / controller of examinations to verify your mark sheets and degree records. This stage takes 4 to 8 weeks."
    },
    {
      step: 5,
      title: "Interview Slot Notification",
      subtitle: "Email Scheduling Notice",
      desc: "Once document verification is confirmed, you receive an official email invitation detailing your assigned date & time for the personal academic interview."
    },
    {
      step: 6,
      title: "Personal Verification Interview",
      subtitle: "15–20 Min Evaluation",
      desc: "Attend the 15–20 minute interview in person at the APS India office in New Delhi (conducted in English or German by two academic evaluators)."
    },
    {
      step: 7,
      title: "Digital Certificate Issuance",
      subtitle: "Digitally-Signed PDF",
      desc: "Upon passing, your official APS certificate is emailed as a digitally-signed PDF (digital-only format since April 2023). It is valid permanently for all German university & visa applications."
    }
  ];

  return (
    <section id="section-process" className="py-12 px-6 lg:px-12 scroll-mt-24 bg-gradient-to-b from-transparent via-amber-50/30 to-transparent">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-germany-black flex items-center justify-center font-bold shrink-0 shadow-sm">
              <ListOrdered className="w-6 h-6 text-germany-black" />
            </div>
            <div>
              <span className="text-xs font-black uppercase text-germany-red tracking-wider">Section #3</span>
              <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">The APS Process Step by Step</h2>
              <p className="text-sm text-gray-600 font-medium mt-1">
                From initial portal registration to receiving your digitally-signed PDF certificate.
              </p>
            </div>
          </div>
          <motion.img 
            src="/doodles/graduation.png" 
            alt="APS Graduation Process Doodle"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-sm shrink-0 hidden md:block"
            whileHover={{ scale: 1.1, rotate: 6 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Process Timeline Accordion */}
        <div className="neu-card p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <h3 className="font-extrabold text-germany-black text-lg">7-Step Verification Workflow</h3>
            <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Total Timeline: 2–3 Months
            </span>
          </div>

          <div className="space-y-3">
            {steps.map((item, idx) => (
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
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                      activeStep === idx ? 'bg-germany-red text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {item.step}
                    </span>
                    <div>
                      <span className="text-[10px] font-black uppercase text-germany-red tracking-wider">{item.subtitle}</span>
                      <h4 className="text-sm font-extrabold text-germany-black">{item.title}</h4>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-transform ${activeStep === idx ? 'rotate-90 text-germany-red' : 'text-gray-400'}`} />
                </div>
                {activeStep === idx && (
                  <p className="text-xs text-gray-600 font-medium mt-3 pl-11 leading-relaxed border-t border-gray-100 pt-2">
                    {item.desc}
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
