"use client";
import React from 'react';
import { FileEdit, MessageSquareText, CheckCircle2, Send, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    step: "01",
    title: "Order & Visa Intake Questionnaire",
    duration: "Day 1 (Instant)",
    icon: FileEdit,
    description: "Submit your basic academic background, admitted German university, degree curriculum, and consular jurisdiction. You'll receive our structured visa intake form to pinpoint your genuine academic intent and career trajectory.",
    deliverable: "Customized Profile Intake Form"
  },
  {
    step: "02",
    title: "Consular Narrative Drafting",
    duration: "1 to 3 Working Days",
    icon: Send,
    description: "Our German visa documentation specialists draft your motivation letter from scratch, structuring it strictly around § 16b AufenthG guidelines: academic progression, curriculum justification, financial defense, and clear post-study return plans.",
    deliverable: "Complete First Draft via Google Doc"
  },
  {
    step: "03",
    title: "Two Rounds of Collaborative Review",
    duration: "Interactive Feedback",
    icon: MessageSquareText,
    description: "Review your draft directly in Google Docs. Add comments, request tone adjustments, or verify specific family/financial nuances. We provide up to two detailed rounds of revisions to ensure you are 100% confident.",
    deliverable: "Iterative Refinements & Fine-Tuning"
  },
  {
    step: "04",
    title: "Final Embassy-Ready Package",
    duration: "Ready for VFS Biometrics",
    icon: CheckCircle2,
    description: "Receive your final, beautifully formatted Letter of Motivation in both high-resolution PDF (ready to print and physically sign) and editable Word (.docx) formats with proper date, recipient embassy address, and layout standards.",
    deliverable: "Printable PDF + Editable DOCX"
  }
];

export const LomProcess = () => {
  return (
    <section id="process" className="py-14 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-black uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Structured 4-Step Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            How Your Visa LOM Is Crafted
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            From initial profile questionnaire to consular-ready submission in as little as 24 hours.
          </p>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                className="neu-card p-6 border-2 border-gray-200 bg-white relative flex flex-col justify-between hover:border-germany-red/50 transition-all shadow-sm"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {/* Step badge */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                  <span className="text-2xl font-black text-germany-red font-display">
                    {item.step}
                  </span>
                  <div className="p-2.5 rounded-xl bg-red-50 text-germany-red">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-600 text-[11px] font-bold">
                    {item.duration}
                  </div>
                  <h3 className="text-base font-black text-germany-black leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <span className="text-[11px] font-bold text-gray-400 block uppercase tracking-wider">
                    Deliverable:
                  </span>
                  <span className="text-xs font-black text-germany-black flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
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
                Have an urgent VFS or Consulate biometrics slot?
              </h4>
              <p className="text-xs text-gray-600 font-medium">
                Choose our Express Plan for guaranteed 24-hour turnaround with prioritized draft reviews.
              </p>
            </div>
          </div>
          <a
            href="#pricing"
            className="neu-btn-primary px-5 py-2.5 text-xs font-extrabold shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span>View Pricing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
