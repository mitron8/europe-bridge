"use client";
import React from 'react';
import { FileEdit, Send, ClipboardList, MessageSquareText, CheckCircle2, Clock, ShieldCheck, ArrowRight, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    step: "01",
    title: "Order & Plan Selection",
    duration: "Instant",
    icon: FileEdit,
    description: "Choose between Standard (3–5 working days) or Express (48 hours) depending on your approaching Uni-Assist or direct university deadlines.",
    deliverable: "Instant Order Confirmation"
  },
  {
    step: "02",
    title: "Submit Three Intake Forms",
    duration: "Day 1",
    icon: Send,
    description: "You'll receive 3 tailored preference forms by email (one for SOP, one for the 2 LORs, and one for your CV). Submit your grades, project links, and recommenders.",
    deliverable: "Structured Intake Profiles"
  },
  {
    step: "03",
    title: "Synchronized Expert Drafting",
    duration: "2 to 4 Days",
    icon: ClipboardList,
    description: "Our German university admissions team drafts all four documents in parallel, ensuring that project titles, dates, ECTS competencies, and tone align seamlessly.",
    deliverable: "Synchronized Google Docs Drafts"
  },
  {
    step: "04",
    title: "Two Review Rounds Per Doc",
    duration: "Interactive Feedback",
    icon: MessageSquareText,
    description: "Collaborate directly on Google Docs. Round 1 addresses core structure and narrative emphasis; Round 2 provides granular word-level and grammar polish.",
    deliverable: "Two Revision Cycles"
  },
  {
    step: "05",
    title: "Final Application-Ready Delivery",
    duration: "Ready for Submission",
    icon: CheckCircle2,
    description: "Receive your final SOP, two LORs, and Europass CV in both high-resolution PDF format and fully editable Microsoft Word (.docx) formats.",
    deliverable: "Printable PDFs + Editable Word DOCX"
  }
];

export const BundleProcess = () => {
  return (
    <section id="process" className="py-14 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-black uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Structured 5-Step Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            How Your Bundle Is Prepared
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            A cohesive process ensuring all 4 documents are drafted in tandem to maximize admissions impact.
          </p>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                className="neu-card p-5 border-2 border-gray-200 bg-white relative flex flex-col justify-between hover:border-germany-red/50 transition-all shadow-sm"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div>
                  {/* Step badge */}
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
                    <span className="text-xl font-black text-germany-red font-display">
                      {item.step}
                    </span>
                    <div className="p-2 rounded-xl bg-red-50 text-germany-red">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="inline-block px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-[10px] font-bold">
                      {item.duration}
                    </div>
                    <h3 className="text-sm font-black text-germany-black leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600 font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">
                    Deliverable:
                  </span>
                  <span className="text-xs font-black text-germany-black flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-green-600 shrink-0" />
                    {item.deliverable}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Workflow Bottom Callout */}
        <div className="neu-card p-6 bg-gradient-to-r from-red-50 via-white to-amber-50 border-2 border-red-200 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-germany-red text-white rounded-2xl shadow-sm shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-germany-black">
                Tight portal deadline in the next 3 to 4 days?
              </h4>
              <p className="text-xs text-gray-600 font-medium">
                Select our Express Bundle for guaranteed 48-hour delivery of all 4 documents.
              </p>
            </div>
          </div>
          <a
            href="#booking"
            className="neu-btn-primary px-5 py-2.5 text-xs font-extrabold shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Order Express Bundle</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
