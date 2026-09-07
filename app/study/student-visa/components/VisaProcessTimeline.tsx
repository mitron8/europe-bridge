"use client";

import React from 'react';
import { Clock, Calendar, CheckCircle2, ArrowRight, AlertCircle, Building, Plane } from 'lucide-react';
import Link from 'next/link';

export const VisaProcessTimeline = () => {
  const steps = [
    {
      step: 1,
      duration: "1–2 Days",
      title: "Intake & Profile Assessment",
      desc: "Audit university admission letter, verify APS certificate authenticity, and review financial proof readiness (€11,904 blocked account).",
      status: "Start"
    },
    {
      step: 2,
      duration: "3–5 Days",
      title: "CSP Portal & VIDEX Generation",
      desc: "Complete CSP entry form, generate machine-readable VIDEX barcode document, format PDFs, and perform digital upload to the consular server.",
      status: "Digital filing"
    },
    {
      step: 3,
      duration: "1–2 Weeks",
      title: "VFS Appointment & Biometrics",
      desc: "Slot booking at VFS Global, document submission, digital fingerprint scan, and physical passport handover at the visa centre.",
      status: "In-person"
    },
    {
      step: 4,
      duration: "4–6 Weeks",
      title: "Embassy Processing & Ausländerbehörde",
      desc: "German Consulate evaluates dossier and transmits data electronically to the local immigration authority (Ausländerbehörde) in your study city.",
      status: "Decision period"
    },
    {
      step: 5,
      duration: "2–4 Days",
      title: "Passport Stamping & Delivery",
      desc: "Receive your National Visa (Type D) sticker valid for 3 to 6 months, allowing official entry into Germany and flight booking.",
      status: "Final approval"
    }
  ];

  return (
    <section id="section-timeline" className="scroll-mt-36 py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>Process Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display leading-tight">
            How the Visa Timeline <span className="text-germany-red">Really Works</span>
          </h2>
          <p className="text-base text-gray-700 font-medium leading-relaxed">
            Understanding embassy turnarounds prevents missed course orientation dates. Here is the realistic timeline from offer letter to landing in Germany.
          </p>
        </div>

        {/* Timeline Horizontal / Vertical Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {steps.map((item, idx) => (
            <div 
              key={idx}
              className="neu-card p-5 bg-white space-y-3 relative flex flex-col justify-between shadow-xs border border-[#EBE7E0]/80 hover:border-germany-red/30 transition-all"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-germany-black text-white font-display text-sm font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-red-100/70 text-germany-red">
                    {item.duration}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-germany-black font-display leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-[#EBE7E0]/60 flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase">
                <span>Phase {idx + 1}</span>
                <span className="text-germany-black">{item.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Banner */}
        <div className="neu-card p-6 sm:p-8 bg-white shadow-[12px_12px_30px_rgba(210,205,195,0.6)] border border-[#EBE7E0]/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h4 className="font-display text-lg sm:text-xl text-germany-black font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-germany-red" />
              <span>When Should You Apply?</span>
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
              Consulates accept visa filings up to <strong>3 to 6 months before</strong> course commencement. For Winter Semester (starting October), begin your CSP registration by <strong>June 1–15</strong> to comfortably beat peak seasonal delays.
            </p>
          </div>

          <Link 
            href="/signup"
            className="neu-btn-primary px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md shrink-0 flex items-center gap-2"
          >
            <span>Book Timeline Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
